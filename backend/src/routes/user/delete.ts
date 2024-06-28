import { ElysiaApp } from '@/app'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { meetings, sessions, users } from '@/db/schema'
import { validateRequest } from '@/utils/validateRequest'
import { clearAuthCookies } from '@/utils/clearAuthCookies'

export default (app: ElysiaApp) =>
	app.get('/', async ({ set, cookie: { github_oauth_state, auth_session } }) => {
		const userSession = await db.query.sessions.findFirst({ where: eq(sessions.id, auth_session.value) })
		const { user, session } = await validateRequest(auth_session)

		if (user && session && userSession) {
			clearAuthCookies(github_oauth_state, auth_session)
			await db.delete(meetings).where(eq(meetings.userId, user.id)).returning()
			await db.delete(sessions).where(eq(sessions.userId, user.id)).returning()
			await db.delete(users).where(eq(users.id, user.id)).returning()

			set.status = 200
			return { status: 200, message: 'account deleted' }
		} else {
			set.status = 401
			return { message: 'unauthorized' }
		}
	})
