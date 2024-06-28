import { ElysiaApp } from '@/app'
import { generateState } from 'arctic'
import { github } from '@/utils/oauth'

export default (app: ElysiaApp) => app
	.get('/', async ({ set, cookie: { github_oauth_state } }) => {
		try {
			const state = generateState()

			const authURL = await github.createAuthorizationURL(state, { scopes: ['user:email'] })

			github_oauth_state.set({
				value: state,
				path: '/',
				httpOnly: true,
				secure: false,
				maxAge: 12 * 60 * 60 * 1000,
			})

			set.status = 200
			return { url: authURL.href }
		} catch (error: any) {
			return { error: error?.message }
		}
	})
