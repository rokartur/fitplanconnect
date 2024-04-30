import { pgSchema, text, timestamp } from 'drizzle-orm/pg-core'

export const dbSchema = pgSchema('fitplanconnect')

export const users = dbSchema.table('users', {
	id: text('id').primaryKey(),
	username: text('username').notNull(),
	email: text('email').unique().notNull(),
	profilePictureUrl: text('profile_picture_url').notNull().default(''),
	selectedTrainerId: text('selected_trainer_id').notNull().default(''),
	subscriptionExpirationDate: text('subscription_expiration_date').notNull().default(''),
	// meetings: json('meetings').$type<[]>(),
	accessToken: text('access_token').notNull().default(''),
	refreshToken: text('refresh_token').default(''),
})

export const sessions = dbSchema.table('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id').notNull().references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull(),
})
