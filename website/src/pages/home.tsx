import styles from '@/styles/home.module.scss'
import { AnimateWrapper } from '@/components/animateWrapper/animateWrapper'
import { Container } from '@/components/container/container'
import { Overlay } from '@/components/overlay/overlay'
import { SEO } from '@/components/seo'
import { useScrollTop } from '@/hooks/useScrollTop'
import { Link } from 'react-router-dom'
import Hero from '@/components/hero/hero'

const metaData = {
	title: 'Welcome to FitPlan Connect!',
	description: 'Landing page',
	path: '/',
}

export default function Home() {
	useScrollTop()

	return (
		<>
			<SEO title={metaData.title} description={metaData.description} path={metaData.path} />

			<Hero/>
    </>
	)
}
