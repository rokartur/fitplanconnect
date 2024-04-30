import 'dotenv/config'
import { ElysiaApp } from '@/app'

export default (app: ElysiaApp) => app
	.get('/', async ({ set, cookie: { github_oauth_state, auth_session } }) => {
		try {
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

			set.status = 200
			set.headers.location = '/'
		} catch (error: any) {
			return { status: 500, error: error.message }
		}
	})
