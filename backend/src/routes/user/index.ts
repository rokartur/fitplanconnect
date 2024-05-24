import { ElysiaApp } from '@/app'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { sessions, users } from '@/db/schema'
import { lucia } from '@/utils/lucia'

type UserResponse = {
	name: string
	username: string
	email: string
	profile_picture_url: string
	selected_trainer_id: string
	subscription_expiration_date: string
}

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

				set.status = 200
				return {
					id: userNewData?.id,
					name: userNewData?.name,
					username: userNewData?.username,
					email: userNewData?.email,
					profile_picture_url: userNewData?.profilePictureUrl,
					selected_trainer_id: userNewData?.selectedTrainerId || '',
					subscription_expiration_date: userNewData?.subscriptionExpirationDate || '',
				}
			}

			if (!userData) {
				set.status = 401
				return { message: 'unauthorized' }
			}

			set.status = 200
			return {
				id: userData.id,
				name: userData.name,
				username: userData.username,
				email: userData.email,
				profile_picture_url: userData.profilePictureUrl,
				selected_trainer_id: userData.selectedTrainerId || '',
				subscription_expiration_date: userData.subscriptionExpirationDate || '',
			}
		} else {
			set.status = 401
			return { message: 'unauthorized' }
		}
	})
