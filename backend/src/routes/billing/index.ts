import { ElysiaApp } from '@/app'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { sessions, users } from '@/db/schema'
import { validateRequest } from '@/utils/validateRequest'
import Stripe from 'stripe'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { t } from 'elysia'

dayjs.extend(utc)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export default (app: ElysiaApp) =>
	app
		.get('/config', async ({ set, cookie: { auth_session } }) => {
			const userSession = await db.query.sessions.findFirst({ where: eq(sessions.id, auth_session.value) })
			const { user, session } = await validateRequest(auth_session)

			if (user && session && userSession) {
				const userData = await db.query.users.findFirst({ where: eq(users.id, userSession.userId) })

				if (userData?.accessToken) {
					set.status = 200
					return {
						publishableKey: process.env.STRIPE_PUBLISHABLE_KEY as string,
					}
				}

				if (!userData) {
					set.status = 401
					return { message: 'unauthorized' }
				}
			} else {
				set.status = 401
				return { message: 'unauthorized' }
			}
		})
		.post('/', async ({ set, cookie: { auth_session } }) => {
			const userSession = await db.query.sessions.findFirst({ where: eq(sessions.id, auth_session.value) })
			const { user, session } = await validateRequest(auth_session)

			if (user && session && userSession) {
				const userData = await db.query.users.findFirst({ where: eq(users.id, userSession.userId) })

				if (userData?.accessToken) {
					try {
						const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create({
							currency: 'usd',
							amount: 199,
						})
						set.status = 200
						return { clientSecret: paymentIntent.client_secret }
					} catch (error) {
						set.status = 403
						return error
					}
				}

				if (!userData) {
					set.status = 401
					return { message: 'unauthorized' }
				}
			} else {
				set.status = 401
				return { message: 'unauthorized' }
			}
		})
		.get('/success/:key', async ({ set, params: { key }, cookie: { auth_session } }) => {
			const userSession = await db.query.sessions.findFirst({ where: eq(sessions.id, auth_session.value) })
			const { user, session } = await validateRequest(auth_session)

			if (user && session && userSession) {
				const userData = await db.query.users.findFirst({ where: eq(users.id, userSession.userId) })

				if (userData?.accessToken) {
					if (key !== process.env.STRIPE_SUCCESS_KEY) {
						set.status = 403
						return { message: 'forbidden' }
					}

					const subscriptionExpirationDate = dayjs()
						.utc()
						.add(1, 'year')
						.set('hours', 0)
						.set('minutes', 0)
						.set('seconds', 0)
						.set('milliseconds', 0)
						.toISOString()

					const updatedUser = await db
						.update(users)
						.set({ subscriptionExpirationDate })
						.where(eq(users.accessToken, userData.accessToken))
						.returning({ id: users.id })

					if (updatedUser.length === 0) {
						set.status = 403
						return { message: 'forbidden' }
					} else {
						set.status = 301
						set.redirect = '/app/billing/complete'
					}
				}
			} else {
				set.status = 401
				return { message: 'unauthorized' }
			}
		}, {
			params: t.Object({
				key: t.String(),
			}),
		})
