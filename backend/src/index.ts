import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
// import { db } from './utils/db'
import { admin } from './routes/admin'
import { Logestic } from 'logestic'

// db.connect(error => {
// 	if (error) {
// 		console.error('dbError', error)
// 	}
// })

const app = new Elysia()
	.use(Logestic.preset('fancy'))
	.use(cors())
	.group('/api', app => app.use(admin))
	.listen({
		port: 7702,
		hostname: '0.0.0.0'
	})

console.log(`http://${app.server?.hostname}:${app.server?.port}`)
