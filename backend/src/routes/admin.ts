import { Elysia, t } from 'elysia'

export const admin = new Elysia().group('/admin', app =>
	app
		.get('/users', async ({ set }) => {
			set.status = 200
			return 'users[]'
		})
)
