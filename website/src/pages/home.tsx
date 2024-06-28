import { SEO } from '@/components/seo'
import { useScrollTop } from '@/hooks/useScrollTop'
import Hero from '@/components/hero/hero'
import Blog from '@/components/blog/blog'
import Features from '@/components/features/features'
import Footer from '@/components/footer/footer'

const metaData = {
	title: 'Welcome to FitPlan Connect!',
	path: '/',
}

export default function Home() {
	useScrollTop()

	return (
		<>
			<SEO title={metaData.title} path={metaData.path} />
			<Hero/>
			<Features	/>
			<Blog/>
			<Footer/>
    </>
	)
}
