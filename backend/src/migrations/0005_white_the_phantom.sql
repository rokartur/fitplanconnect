ALTER TABLE "fitplanconnect"."trainers" ALTER COLUMN "name" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "fitplanconnect"."trainers" ALTER COLUMN "profile_picture_url" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "fitplanconnect"."trainers" ALTER COLUMN "access_token" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "fitplanconnect"."users" ALTER COLUMN "profile_picture_url" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "fitplanconnect"."users" ALTER COLUMN "selected_trainer_id" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "fitplanconnect"."users" ALTER COLUMN "access_token" DROP DEFAULT;