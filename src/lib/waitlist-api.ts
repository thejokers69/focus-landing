const DEFAULT_LOCAL_API = "http://localhost:8787";

export function getWaitlistApiBaseUrl(): string {
  const configured = import.meta.env.VITE_NEON_API_URL?.trim();
  if (configured) {
    return configured.replace(/\/$/, "");
  }
  if (import.meta.env.DEV) {
    return DEFAULT_LOCAL_API;
  }
  return "";
}

export type WaitlistResult =
  | { ok: true }
  | { ok: false; message: string };

export async function submitWaitlist(
  email: string,
  source: string,
): Promise<WaitlistResult> {
  const base = getWaitlistApiBaseUrl();
  if (!base) {
    return {
      ok: false,
      message: "Waitlist is not configured yet. Set VITE_NEON_API_URL on Vercel.",
    };
  }

  const response = await fetch(`${base}/waitlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, source }),
  });

  if (response.status === 201) {
    return { ok: true };
  }

  let message = "Something went wrong. Please try again.";
  try {
    const data = (await response.json()) as { error?: string };
    if (typeof data.error === "string" && data.error) {
      message = data.error;
    }
  } catch {
    // ignore parse errors
  }

  return { ok: false, message };
}
