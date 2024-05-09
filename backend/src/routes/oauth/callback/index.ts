import 'dotenv/config'
import { ElysiaApp } from '@/app'
import { github } from '@/utils/oauth'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { users } from '@/db/schema'
import { lucia } from '@/utils/lucia'

export default (app: ElysiaApp) => app
	.get('/', async ({ set, query, cookie: { github_oauth_state, auth_session, state: state_cookie } }) => {
		try {
			console.log('query', query)
			const code = query.code
			const state = query.state
			const savedState = github_oauth_state?.value

			if (!code || !state) {
				console.log('query', query)
				set.status = 400
				return { status: 400, error: 'Invalid request' }
			}

			if (!savedState) {
				set.status = 400
				return { status: 400, error: `saved state doesn't exist` }
			}

			if (savedState !== state) {
				set.status = 400
				return { status: 400, error: 'State does not match' }
			}

			const { accessToken } = await github.validateAuthorizationCode(code)

			const githubRes = await fetch('https://api.github.com/user', {
				headers: { Authorization: `Bearer ${accessToken}` }, method: 'GET',
			})

			const githubData = (await githubRes.json()) as any

			await db.transaction(async (trx) => {
				const user = await trx.query.users.findFirst({ where: eq(users.id, githubData.id) })

				if (!user) {
					const createdUserRes = await trx
						.insert(users)
						.values({
							id: githubData.id.toString(),
							name: githubData.name || '',
							username: githubData.login,
							email: githubData.email,
							profilePictureUrl: githubData.avatar_url,
						})
						.returning({ id: users.id })

					if (createdUserRes.length === 0) {
						trx.rollback()
						return { status: 500, error: "Failed to create user" }
					}

					const createdOAuthAccountRes = await trx
						.update(users)
						.set({ accessToken })
						.where(eq(users.id, githubData.id))

					if (createdOAuthAccountRes.count === 0) {
						trx.rollback()
						return { status: 500, error: "Failed to create OAuthAccountRes" }
					}
				} else {
					const updatedOAuthAccountRes = await trx
						.update(users)
						.set({ accessToken })
						.where(eq(users.id, githubData.id))

					if (updatedOAuthAccountRes.count === 0) {
						trx.rollback()
						return { status: 500, error: "Failed to update OAuthAccountRes" }
					}
				}

				set.status = 302
				set.headers.location = '/app'
			})

			const session = await lucia.createSession(githubData.id, { expiresIn: 60 * 60 * 24 * 30 })
			const sessionCookie = lucia.createSessionCookie(session.id)

			auth_session.set({
				value: sessionCookie.value,
				httpOnly: sessionCookie.attributes.httpOnly,
				secure: sessionCookie.attributes.secure,
				sameSite: sessionCookie.attributes.sameSite,
				path: sessionCookie.attributes.path,
				maxAge: sessionCookie.attributes.maxAge,
			})

			state_cookie.set({
				value: '',
				expires: new Date(0),
			})

			set.status = 302
			set.headers.location = '/app/calendar'
		} catch (error: any) {
			set.status = 500
			return { status: 500, error: error.message }
		}
	})
