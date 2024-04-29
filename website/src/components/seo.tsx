import { Helmet } from 'react-helmet-async'

type SEOProps = {
	url?: string
	title: string
	description?: string
	path: string
}

export const SEO = ({ url = 'https://fitplanconnect.site', title = 'Home', description, path }: SEOProps) => (
	<Helmet>
		<title>{title} | GETOCLOUD - Agency specializing in designing outstanding websites for new businesses</title>
		<meta property='title' content={`${title} | `} />
		<meta property='og:title' content={`${title} | `} />
		<meta property='description' content={description} />
		<meta property='og:description' content={description} />
		<meta property='og:url' content={url + path} />
		<link rel='canonical' href={url + path} />
	</Helmet>
)
