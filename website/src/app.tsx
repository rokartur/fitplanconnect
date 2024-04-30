import '@/styles/global.scss';
import { lazy, Suspense } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from '@/components/header/header.tsx'
import { useScrollTop } from '@/hooks/useScrollTop.ts';
import { store } from '@/utils/store.ts';


gsap.registerPlugin(useGSAP, ScrollTrigger)

const AppSettings = lazy(() => import('@/pages/app.settings.tsx'))

export default function App() {
	useScrollTop()

	return (
		<Provider store={store}>
			<HelmetProvider>
				<Suspense fallback={<p>loading...</p>}>
					<BrowserRouter>
						<Header />

						<Routes>
							<Route path={'/'} element={<h1>siema</h1>} />
							<Route path={'/app'} element={<AppSettings />} />
						</Routes>
					</BrowserRouter>
				</Suspense>
			</HelmetProvider>
		</Provider>
	)
}
