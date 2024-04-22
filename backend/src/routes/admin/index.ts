import type { ElysiaApp } from '@/app'

export default (app: ElysiaApp) => app.get('/tak', { hello: 'world' })
