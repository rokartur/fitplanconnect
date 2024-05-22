import '@/styles/global.scss'
import { lazy, Suspense } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from '@/components/header/header.tsx'
import { useScrollTop } from '@/hooks/useScrollTop.ts'
import { store } from '@/utils/store.ts'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Settings = lazy(() => import('@/pages/app/settings.tsx'))
const Calendar = lazy(() => import('@/pages/app/calendar.tsx'))
const NotFound = lazy(() => import('@/pages/notFound'))

export default function App() {
	useScrollTop()

	return (
		<Provider store={store}>
			<HelmetProvider>
				<BrowserRouter>
					<Header />
					<Suspense fallback={<p>loading</p>}>
						<Routes>
							<Route path={'/'} element={<h1>landing</h1>} />
							<Route path={'/app/calendar'} element={<Calendar/>} />
							<Route path={'/app/trainers'} element={<h1>trainers</h1>} />
							<Route path={'/app/billing'} element={<h1>billing</h1>} />
							<Route path={'/app/settings'} element={<Settings />} />
							<Route path={'*'} element={<NotFound />} />
						</Routes>
					</Suspense>
				</BrowserRouter>
			</HelmetProvider>
		</Provider>
	)
}
