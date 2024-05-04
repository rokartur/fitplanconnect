import { Helmet } from 'react-helmet-async'

type SEOProps = {
	url?: string
	title: string
	description?: string
	path: string
}

export const SEO = ({ url = 'https://fitplanconnect.site', title = 'Home', description, path }: SEOProps) => (
	<Helmet>
		<title>{title} | FitPlan Connect</title>
		<meta property='title' content={`${title} | FitPlan Connect`} />
		<meta property='og:title' content={`${title} | FitPlan Connect`} />
		<meta property='description' content={description} />
		<meta property='og:description' content={description} />
		<meta property='og:url' content={url + path} />
		<link rel='canonical' href={url + path} />
	</Helmet>
)
