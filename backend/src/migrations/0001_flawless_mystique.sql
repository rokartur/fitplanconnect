CREATE TABLE IF NOT EXISTS "fitplanconnect"."meetings" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"trainer_id" text NOT NULL,
	"start_time" timestamp with time zone NOT NULL,
	"end_time" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fitplanconnect"."trainers" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"username" text NOT NULL,
	"email" text NOT NULL,
	"profile_picture_url" text DEFAULT '' NOT NULL,
	"access_token" text DEFAULT '' NOT NULL,
	"refresh_token" text DEFAULT '',
	CONSTRAINT "trainers_username_unique" UNIQUE("username"),
	CONSTRAINT "trainers_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "fitplanconnect"."users" ALTER COLUMN "selected_trainer_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "fitplanconnect"."users" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fitplanconnect"."users" ADD CONSTRAINT "users_selected_trainer_id_trainers_id_fk" FOREIGN KEY ("selected_trainer_id") REFERENCES "fitplanconnect"."trainers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fitplanconnect"."meetings" ADD CONSTRAINT "meetings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "fitplanconnect"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fitplanconnect"."meetings" ADD CONSTRAINT "meetings_trainer_id_trainers_id_fk" FOREIGN KEY ("trainer_id") REFERENCES "fitplanconnect"."trainers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "fitplanconnect"."users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");