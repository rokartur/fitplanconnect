import { ElysiaApp } from '@/app'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { sessions, trainers, users } from '@/db/schema'
import { validateRequest } from '@/utils/validateRequest'

export default (app: ElysiaApp) =>
	app.get('/', async ({ set, cookie: { auth_session } }) => {
		const userSession = await db.query.sessions.findFirst({ where: eq(sessions.id, auth_session.value) })
		const { user, session } = await validateRequest(auth_session)

		if (user && session && userSession) {
			const userData = await db.query.users.findFirst({ where: eq(users.id, userSession.userId) })

			if (userData?.accessToken) {
				const data = await db.select({
					id: trainers.id,
					name: trainers.name,
					username: trainers.username,
					email: trainers.email,
					profile_picture_url: trainers.profilePictureUrl,
				}).from(trainers)
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
