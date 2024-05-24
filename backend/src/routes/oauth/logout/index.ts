import 'dotenv/config'
import { ElysiaApp } from '@/app'
import { db } from '@/utils/db'
import { sessions } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { validateRequest } from '@/utils/validateRequest'
import { clearAuthCookies } from '@/utils/clearAuthCookies'

export default (app: ElysiaApp) => app
	.get('/', async ({ set, cookie: { github_oauth_state, auth_session } }) => {
		try {
			const userSession = await db.query.sessions.findFirst({ where: eq(sessions.id, auth_session.value) })
			const { user, session } = await validateRequest(auth_session)

			if (user && session && userSession) {
				clearAuthCookies(github_oauth_state, auth_session)
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
