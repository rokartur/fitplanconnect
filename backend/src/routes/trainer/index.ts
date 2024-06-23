import { ElysiaApp } from '@/app'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { sessions, trainers, users } from '@/db/schema'
import { validateRequest } from '@/utils/validateRequest'
import { t } from 'elysia'

export default (app: ElysiaApp) =>
	app.patch('/:trainerID', async ({ set, params: { trainerID }, cookie: { auth_session } }) => {
		const userSession = await db.query.sessions.findFirst({ where: eq(sessions.id, auth_session.value) })
		const { user, session } = await validateRequest(auth_session)

		if (user && session && userSession) {
			const userData = await db.query.users.findFirst({ where: eq(users.id, userSession.userId) })

			if (userData?.accessToken) {
				const trainer = await db.query.trainers.findFirst({ where: eq(trainers.id, trainerID) })

				if (!trainer) {
					set.status = 404
					return { message: 'trainer not found' }
				}

				const user = await db
					.update(users)
					.set({ selectedTrainerId: trainer.id })
					.where(eq(users.accessToken, userData.accessToken))
					.returning({ id: users.id })

				if (user.length === 0) {
					set.status = 403
					return { message: 'forbidden' }
				}

				set.status = 200
			}

			if (!userData) {
				set.status = 401
				return { message: 'unauthorized' }
			}
		} else {
			set.status = 401
			return { message: 'unauthorized' }
		}
	}, {
		params: t.Object({
			trainerID: t.String()
		})
	})
