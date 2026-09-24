import { attachDatabasePool } from "@neon/functions";
import { drizzle } from "drizzle-orm/node-postgres";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { Pool } from "pg";

import { waitlistEntries } from "../db/schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
});
attachDatabasePool(pool);

const db = drizzle(pool);

function parseAllowedOrigins(): string[] {
  const raw = process.env.ALLOWED_ORIGINS ?? "http://localhost:5174,http://127.0.0.1:5174";
  return raw
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeEmail(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const email = value.trim().toLowerCase();
  if (!email || email.length > 320 || !EMAIL_PATTERN.test(email)) return null;
  return email;
}

function isWaitlistEmailUniqueViolation(error: unknown): boolean {
  const seen = new Set<unknown>();
  let current: unknown = error;

  while (current && typeof current === "object" && !seen.has(current)) {
    seen.add(current);
    const record = current as Record<string, unknown>;

    if (record.code === "23505" || record.code === 23505) {
      return true;
    }

    const constraint = typeof record.constraint === "string" ? record.constraint : "";
    if (constraint.includes("waitlist_entries_email_unique")) {
      return true;
    }

    const message = typeof record.message === "string" ? record.message : "";
    if (
      message.includes("23505") ||
      message.includes("waitlist_entries_email_unique") ||
      /duplicate key value violates unique constraint/i.test(message)
    ) {
      return true;
    }

    current = record.cause;
  }

  return false;
}

const app = new Hono();

app.use(
  "*",
  cors({
    origin: (origin) => {
      const allowed = parseAllowedOrigins();
      if (!origin) return allowed[0] ?? null;
      return allowed.includes(origin) ? origin : null;
    },
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type"],
    maxAge: 86400,
  }),
);

app.get("/", (c) =>
  c.json({
    ok: true,
    service: "focus-landing-api",
  }),
);

app.get("/health", async (c) => {
  try {
    await pool.query("SELECT 1");
    return c.json({ ok: true, database: "connected" });
  } catch {
    return c.json({ ok: false, database: "error" }, 503);
  }
});

app.post("/waitlist", async (c) => {
  let body: unknown;
  try {
    body = await c.req.json();
  } catch {
    return c.json({ error: "Invalid JSON body" }, 400);
  }

  if (!body || typeof body !== "object") {
    return c.json({ error: "Invalid request body" }, 400);
  }

  const record = body as Record<string, unknown>;
  const email = normalizeEmail(record.email);
  if (!email) {
    return c.json({ error: "A valid email address is required" }, 400);
  }

  const source =
    typeof record.source === "string" && record.source.trim()
      ? record.source.trim().slice(0, 64)
      : null;

  const userAgent = c.req.header("user-agent")?.slice(0, 512) ?? null;
  const referrer = c.req.header("referer")?.slice(0, 512) ?? null;

  try {
    const [entry] = await db
      .insert(waitlistEntries)
      .values({ email, source, userAgent, referrer })
      .returning({ id: waitlistEntries.id, email: waitlistEntries.email });

    return c.json({ id: entry.id, email: entry.email }, 201);
  } catch (error) {
    if (isWaitlistEmailUniqueViolation(error)) {
      return c.json({ error: "This email is already on the waitlist" }, 409);
    }

    console.error("waitlist insert failed", error);
    return c.json({ error: "Could not join the waitlist. Please try again." }, 500);
  }
});

export default app;
