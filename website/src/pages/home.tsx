import { SEO } from '@/components/seo'
import { useScrollTop } from '@/hooks/useScrollTop'
import Hero from '@/components/hero/hero'
import Blog from '@/components/blog/blog'
import Features from '@/components/features/features'

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
			<Features	/>
			<Blog/>
    </>
	)
}
