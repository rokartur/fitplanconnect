import { FC } from 'react'
import { Helmet } from 'react-helmet-async'

type SEOProps = {
	title: string
	path: string
}

export const SEO: FC<SEOProps> = ({ title = 'Home', path }) => (
	<Helmet>
		<title>{title} | FitPlan Connect</title>
		<meta property='title' content={`${title} | FitPlan Connect`} />
		<meta property='og:title' content={`${title} | FitPlan Connect`} />
		<meta property='og:url' content={'https://fitplanconnect.site' + path} />
	</Helmet>
)
