import 'dotenv/config'
import { ElysiaApp } from '@/app'
import { db } from '@/utils/db'
import { meetings, sessions, users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import user from '@/routes/user'
import { lucia } from '@/utils/lucia'

export default (app: ElysiaApp) => app
	.get('/', async ({ set, cookie: { github_oauth_state, auth_session } }) => {
		try {
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
				github_oauth_state.set({
					value: '',
					httpOnly: true,
					secure: true,
					sameSite: 'strict',
					path: '/',
					maxAge: 0,
				})

				auth_session.set({
					value: '',
					httpOnly: true,
					secure: true,
					sameSite: 'strict',
					path: '/',
					maxAge: 0,
				})

				await db.delete(sessions).where(eq(sessions.userId, user.id)).returning()
				set.status = 200
				set.headers.location = '/'
			} else {
				set.status = 401
				return { message: 'unauthorized' }
			}
		} catch (error: any) {
			return { status: 500, error: error.message }
		}
	})
