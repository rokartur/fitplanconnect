import { SEO } from '@/components/seo.tsx'
import { Overlay } from '@/components/overlay/overlay.tsx'
import { AnimateWrapper } from '@/components/animateWrapper/animateWrapper.tsx'
import { Container } from '@/components/container/container.tsx'
import styles from '@/styles/notFound.module.scss'
import { Link } from 'react-router-dom'

const metaData = {
	title: 'Thank you',
	path: '/app/billing/complete',
}

export default function BillingCancel() {
	return (
		<>
			<SEO title={metaData.title} path={metaData.path} />

			<Overlay>
				<AnimateWrapper>
					<Container>
						<div className={styles.notFoundMainContainer}>
							<h2>Your transaction has been cancelled</h2>
							<i>Please try again</i>
							<Link to={'/app/billing'}>
								Go to billing
							</Link>
						</div>
					</Container>
				</AnimateWrapper>
			</Overlay>
		</>
	)
}
