import { pgSchema, text, timestamp } from 'drizzle-orm/pg-core'

export const dbSchema = pgSchema('fitplanconnect')

export const users = dbSchema.table('users', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	username: text('username').notNull(),
	email: text('email').unique().notNull(),
	profilePictureUrl: text('profile_picture_url').notNull().default(''),
	selectedTrainerId: text('selected_trainer_id').notNull().default(''),
	subscriptionExpirationDate: text('subscription_expiration_date').notNull().default(''),
	accessToken: text('access_token').notNull().default(''),
})

export const sessions = dbSchema.table('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull(),
})

export const trainers = dbSchema.table('trainers', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	username: text('username').notNull(),
	email: text('email').unique().notNull(),
	profilePictureUrl: text('profile_picture_url').notNull().default(''),
	accessToken: text('access_token').notNull().default(''),
})

export const meetings = dbSchema.table('meetings', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().references(() => users.id),
	trainerID: text('trainer_id').notNull().references(() => trainers.id),
	startTime: timestamp('start_time', { withTimezone: true, mode: 'date' }).notNull(),
	endTime: timestamp('end_time', { withTimezone: true, mode: 'date' }).notNull(),
})
