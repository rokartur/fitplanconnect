import { ElysiaApp } from '@/app'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { meetings, sessions, users } from '@/db/schema'
import { lucia } from '@/utils/lucia'
import { t } from 'elysia'
import { v4 as uuid } from 'uuid'

export default (app: ElysiaApp) =>
	app
		.get('/', async ({ set, cookie: { auth_session } }) => {
			const validateRequest = async () => {
				const sessionId = auth_session?.value ?? null

				if (!sessionId)
					return {
						user: null,
						session: null,
					}

				const { user, session } = await lucia.validateSession(sessionId)
				try {
					if (session && session.fresh) {
						const sessionCookie = lucia.createSessionCookie(session.id)
						auth_session.set({
							value: sessionCookie.value,
							httpOnly: sessionCookie.attributes.httpOnly,
							secure: sessionCookie.attributes.secure,
							sameSite: sessionCookie.attributes.sameSite,
							path: sessionCookie.attributes.path,
							maxAge: sessionCookie.attributes.maxAge,
						})
					}
					if (!session) {
						const sessionCookie = lucia.createBlankSessionCookie()
						auth_session.set({
							value: sessionCookie.value,
							httpOnly: sessionCookie.attributes.httpOnly,
							secure: sessionCookie.attributes.secure,
							sameSite: sessionCookie.attributes.sameSite,
							path: sessionCookie.attributes.path,
							maxAge: sessionCookie.attributes.maxAge,
						})
					}
				} catch (error: any) {
					console.log(error)
				}

				return {
					user,
					session,
				}
			}

			const userSession = await db.query.sessions.findFirst({ where: eq(sessions.id, auth_session.value) })

			const { user, session } = await validateRequest()

			if (user && session && userSession) {
				const userData = await db.query.users.findFirst({ where: eq(users.id, userSession.userId) })

				if (userData?.accessToken) {
					const data = await db.select().from(meetings)
					console.log(data)
					set.status = 200
					return data
				}

				if (!userData) {
					set.status = 401
					return { message: 'unauthorized' }
				}
			} else {
				set.status = 401
				return { message: 'unauthorized' }
			}
		})
		.post(
			'/',
			async ({ set, body: { userId, trainerID, startTime, endTime }, cookie: { auth_session } }) => {
				const userSession = await db.query.sessions.findFirst({ where: eq(sessions.id, auth_session.value) })

				if (userSession) {
					const userData = await db.query.users.findFirst({ where: eq(users.id, userSession.userId) })

					if (userData?.accessToken) {
						const id = uuid()
						type NewMeeting = typeof meetings.$inferInsert
						const newMeeting: NewMeeting = { id, userId, trainerID, startTime, endTime }
						console.log(newMeeting)
						const meetingID = await db.insert(meetings).values(newMeeting).returning({ id: meetings.id })

						set.status = 200
						return meetingID
					}

					if (!userData) {
						set.status = 401
						return { message: 'unauthorized' }
					}
				} else {
					set.status = 401
					return { message: 'unauthorized' }
				}
			},
			{
				body: t.Object({
					userId: t.String(),
					trainerID: t.String(),
					startTime: t.Date(),
					endTime: t.Date(),
				}),
			},
		)
