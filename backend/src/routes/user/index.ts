import { ElysiaApp } from '@/app'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { sessions, users } from '@/db/schema'
import { lucia } from '@/utils/lucia'
import { validateRequest } from '@/utils/validateRequest'

export default (app: ElysiaApp) =>
	app.get('/', async ({ set, cookie: { auth_session } }) => {
		const userSession = await db.query.sessions.findFirst({ where: eq(sessions.id, auth_session.value) })
		const { user, session } = await validateRequest(auth_session)

		if (user && session && userSession) {
			const userData = await db.query.users.findFirst({ where: eq(users.id, userSession.userId) })

			if (userData?.accessToken) {
				const githubRes = await fetch('https://api.github.com/user', {
					headers: { Authorization: `Bearer ${userData?.accessToken}` },
					method: 'GET',
				})

				const githubData = (await githubRes.json()) as any

				await db
					.update(users)
					.set({
						name: githubData.name ? githubData.name : '',
						username: githubData.username,
						email: githubData.email || '',
						profilePictureUrl: githubData.profilePictureUrl,
					})
					.where(eq(users.accessToken, userData?.accessToken))

				const userNewData = await db.query.users.findFirst({ where: eq(users.id, userSession.userId) })
				const userMeetings = await db.query.meetings.findMany({ where: eq(users.id, userSession.userId) })

				set.status = 200
				return {
					id: userNewData?.id,
					name: userNewData?.name,
					username: userNewData?.username,
					email: userNewData?.email,
					profile_picture_url: userNewData?.profilePictureUrl,
					selected_trainer_id: userNewData?.selectedTrainerId || '',
					subscription_expiration_date: userNewData?.subscriptionExpirationDate || '',
					meetings: userMeetings,
				}
			} else {
				set.status = 401
				return { message: 'unauthorized' }
			}
		} else {
			set.status = 401
			return { message: 'unauthorized' }
		}
	})
