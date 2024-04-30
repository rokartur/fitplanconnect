import { ElysiaApp } from '@/app'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { sessions, users } from '@/db/schema'
import { lucia } from '@/utils/lucia'

export default (app: ElysiaApp) =>
	app.get('/', async ({ set, cookie: { auth_session } }) => {
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
			const accessToken = await db.query.users.findFirst({ where: eq(users.id, userSession.userId) })
			set.status = 200
			return {
				username: accessToken?.username,
				email: accessToken?.email,
				profile_picture_url: accessToken?.profilePictureUrl || '',
				selected_trainer_id: accessToken?.selectedTrainerId || '',
				subscription_expiration_date: accessToken?.subscriptionExpirationDate || '',
			}
		} else {
			set.status = 401
			return { message: 'unauthorized' }
		}
	})
