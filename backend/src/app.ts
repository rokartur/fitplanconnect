import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { Logestic } from 'logestic'
import { swagger } from '@elysiajs/swagger'
import { compression } from 'elysia-compression'
import { autoload } from 'elysia-autoload'
import { rateLimit } from 'elysia-rate-limit'

const app = new Elysia()
	.use(Logestic.preset('common'))
	.use(cors())
	.use(swagger())
	.use(compression())
	// .use(
	// 	rateLimit({
	// 		max: 20,
	// 		duration: 300000,
	// 		responseMessage: 'Too many requests, please try again later.',
	// 	}),
	// )
	.use(
		autoload({
			prefix: '/api',
			dir: __dirname + '/routes',
		}),
	)
	.listen({ port: 7702, hostname: '0.0.0.0' })

console.log(`http://${app.server?.hostname}:${app.server?.port}`)

export type ElysiaApp = typeof app
