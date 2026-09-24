CREATE TABLE IF NOT EXISTS "waitlist_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"source" text,
	"user_agent" text,
	"referrer" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "waitlist_entries_email_unique" UNIQUE("email")
);
