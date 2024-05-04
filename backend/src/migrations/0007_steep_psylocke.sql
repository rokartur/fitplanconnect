ALTER TABLE "fitplanconnect"."trainers" DROP CONSTRAINT "trainers_username_unique";--> statement-breakpoint
ALTER TABLE "fitplanconnect"."users" DROP CONSTRAINT "users_username_unique";--> statement-breakpoint
ALTER TABLE "fitplanconnect"."users" DROP CONSTRAINT "users_selected_trainer_id_trainers_id_fk";
--> statement-breakpoint
ALTER TABLE "fitplanconnect"."trainers" ALTER COLUMN "profile_picture_url" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "fitplanconnect"."users" ALTER COLUMN "profile_picture_url" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "fitplanconnect"."trainers" DROP COLUMN IF EXISTS "name";--> statement-breakpoint
ALTER TABLE "fitplanconnect"."users" DROP COLUMN IF EXISTS "name";