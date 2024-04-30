CREATE SCHEMA "fitplanconnect";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fitplanconnect"."sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fitplanconnect"."users" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"profile_picture_url" text DEFAULT '' NOT NULL,
	"selected_trainer_id" text DEFAULT '' NOT NULL,
	"subscription_expiration_date" text DEFAULT '' NOT NULL,
	"access_token" text DEFAULT '' NOT NULL,
	"refresh_token" text DEFAULT '',
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fitplanconnect"."sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "fitplanconnect"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
