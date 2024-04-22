import { ElysiaApp } from '@/app'

export default (app: ElysiaApp) => app.get('/', async ({ set }) => {
	set.status = 200
	return { hello: 'world' }
})
