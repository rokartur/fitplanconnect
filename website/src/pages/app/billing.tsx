import styles from '@/styles/billing.module.scss'
import { AnimateWrapper } from '@/components/animateWrapper/animateWrapper.tsx'
import { Container } from '@/components/container/container.tsx'
import { Overlay } from '@/components/overlay/overlay.tsx'
import { SEO } from '@/components/seo.tsx'
import { useAppSelector } from '@/utils/store.ts'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import wretch from 'wretch'
import { Tooltip } from '@/components/tooltip/tooltip.tsx'

const metaData = {
	title: 'Billing',
	path: '/app/billing',
}

export default function Billing() {
	const [stripePromise, setStripePromise] = useState<any>(null)
	const [isLoading, setLoading] = useState(false)
	const [stripeError, setStripeError] = useState(null)
	const user = useAppSelector(state => state.user.data)

	const item = {
		price: 'price_1PU9ogRqT1nSwrjBMcNAw2qm',
		quantity: 1,
	}

	const redirectToCheckout = async () => {
		setLoading(true)
		const stripe = await stripePromise
		const { error } = await stripe.redirectToCheckout({
			lineItems: [item],
			mode: 'payment',
			successUrl: `${window.location.origin}/api/billing/success/${item.price}`,
			cancelUrl: `${window.location.origin}/app/billing/cancel`,
		})

		if (error) setStripeError(error)
		setLoading(false)
	}

	if (stripeError) alert(stripeError)

	useEffect(() => {
		const fetchData = async () => {
			await wretch('/api/billing/config').get().json(async json => {
				const stripe = await loadStripe(json.publishableKey)
				setStripePromise(stripe)
			})
		}

		fetchData().then()
	}, [])

	return (
		<>
			<SEO title={metaData.title} path={metaData.path} />

			<Overlay>
				<AnimateWrapper>
					<Container>
						<div className={styles.content}>
							<div className={styles.billingCard}>
								<h1>FP Connect+</h1>

								<div className={styles.cardFooter}>
									<div className={styles.cardFooterLeft}>
										<p>Expired date</p>
										<p>
											{moment(user?.subscription_expiration_date).isBefore(moment())
												? 'Invalid'
												: moment(user?.subscription_expiration_date).format('DD / MM / YYYY')}
										</p>
									</div>

									<div className={styles.cardFooterRight}>
										<Tooltip title={moment(user?.subscription_expiration_date).isBefore(moment()) ? '' : 'You have valid license'} place={'left'}>
											<button
												disabled={isLoading || moment(user?.subscription_expiration_date).isAfter(moment())}
												className={styles.buyButton}
												onClick={redirectToCheckout}
											>
												{isLoading ? 'Processing...' : 'Buy plan'}
											</button>
										</Tooltip>
									</div>
								</div>
							</div>
						</div>
					</Container>
				</AnimateWrapper>
			</Overlay>
		</>
	)
}
