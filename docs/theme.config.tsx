import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
	useNextSeoProps() {
		return {
			titleTemplate: '%s – FitPlan Connect',
		}
	},
	logo: <svg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 44 44' fill='none'>
		<path fillRule='evenodd' clipRule='evenodd'
					d='M6.52007 18.4314C4.54923 18.4314 2.9469 20.0356 2.9469 22.0046C2.9469 23.9681 4.54923 25.5649 6.52007 25.5649H8.94216C9.16734 25.5649 9.33913 25.3638 9.30809 25.1407C9.16712 24.1276 9.08673 23.0795 9.08673 21.9991C9.08673 20.9183 9.16714 19.87 9.30818 18.8553C9.33918 18.6323 9.16742 18.4314 8.94227 18.4314H6.52007Z'
					fill='url(#paint0_linear_37_2)' />
		<path fillRule='evenodd' clipRule='evenodd'
					d='M32.0692 28.756C30.9343 31.2292 29.2128 32.694 27.5097 32.6977C27.5097 32.6977 27.5042 32.6959 27.4987 32.6959H27.484C25.2547 32.6794 23.1005 30.2484 22.1142 26.611C21.7108 25.1627 21.5092 23.6227 21.5092 21.991C21.5092 20.3594 21.7108 18.8194 22.1142 17.3709C23.1042 13.7409 25.2675 11.3026 27.5042 11.3026C29.2458 11.3026 30.9692 12.7693 32.0875 15.2076C32.533 16.2911 32.8648 17.3673 33.0977 18.4417H29.651C27.6893 18.4417 26.0925 20.0385 26.0925 22.0002C26.0925 23.9619 27.6893 25.5587 29.651 25.5587H33.0775C32.8428 26.6184 32.5128 27.6835 32.0692 28.756ZM37.4848 18.4417H35.877C35.6093 16.9951 35.195 15.5504 34.5992 14.1076C32.9858 10.5711 30.3862 8.55445 27.5078 8.55261L27.4987 8.55078H20.1268C15.2208 8.55078 11.3782 14.4578 11.3782 22.0002C11.3782 29.5389 15.2208 35.4459 20.1268 35.4459H27.4712C27.4822 35.4459 27.4932 35.4477 27.5042 35.4477C30.3642 35.4477 32.9492 33.431 34.5808 29.8927C34.5992 29.8744 34.5992 29.856 34.5992 29.8377C35.1895 28.415 35.6038 26.9887 35.8715 25.5587H37.4848C39.452 25.5587 41.0525 23.9582 41.0525 21.991C41.0525 20.0349 39.452 18.4417 37.4848 18.4417Z'
					fill='url(#paint1_linear_37_2)' />
		<defs>
			<linearGradient id='paint0_linear_37_2' x1='4.50147' y1='23.8229' x2='8.12711' y2='20.5879'
											gradientUnits='userSpaceOnUse'>
				<stop stopColor='#CD66FF' />
				<stop offset='1' stopColor='#FFB3FF' />
			</linearGradient>
			<linearGradient id='paint1_linear_37_2' x1='18.6259' y1='28.8795' x2='32.3191' y2='13.7723'
											gradientUnits='userSpaceOnUse'>
				<stop stopColor='#CD66FF' />
				<stop offset='1' stopColor='#FFB3FF' />
			</linearGradient>
		</defs>
	</svg>,
	project: {
		link: 'https://github.com/rokartur/fitplanconnect',
	},
	editLink: {
		component: null,
	},
	docsRepositoryBase: 'https://github.com/rokartur/fitplanconnect/tree/main/docs',
	footer: {
		component: null,
	},
	primaryHue: 305,
	primarySaturation: 100,
	faviconGlyph: '🏋️‍♂️',
}

export default config
