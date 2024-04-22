import { ElysiaApp } from '@/app'

export default (app: ElysiaApp) => app.get('/', async ({ set, params }) => {
	set.status = 200
	return { params }
})
