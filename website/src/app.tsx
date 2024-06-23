import '@stripe/stripe-js'
import '@/styles/global.scss'
import { lazy, memo, Suspense } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useScrollTop } from '@/hooks/useScrollTop.ts'
import { store } from '@/utils/store.ts'
import Header from '@/components/header/header'
import SuspenseComponent from '@/pages/suspense'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Settings = lazy(() => import('@/pages/app/settings'))
const Calendar = lazy(() => import('@/pages/app/calendar'))
const Trainers = lazy(() => import('@/pages/app/trainers'))
const Billing = lazy(() => import('@/pages/app/billing'))
const BillingComplete = lazy(() => import('@/pages/app/billing.complete'))
const BillingCancel = lazy(() => import('@/pages/app/billing.cancel'))
const NotFound = lazy(() => import('@/pages/notFound'))

const MemoizedRoutes = memo(() => (
	<BrowserRouter>
		<Header />
		<Suspense fallback={<SuspenseComponent />}>
			<Routes>
				<Route path={'/'} element={<h1>landing</h1>} />
				<Route path={'/app/calendar'} element={<Calendar />} />
				<Route path={'/app/trainers'} element={<Trainers/>} />
				<Route path={'/app/billing'} element={<Billing/>} />
				<Route path={'/app/billing/complete'} element={<BillingComplete/>} />
				<Route path={'/app/billing/cancel'} element={<BillingCancel/>} />
				<Route path={'/app/settings'} element={<Settings />} />
				<Route path={'*'} element={<NotFound />} />
			</Routes>
		</Suspense>
	</BrowserRouter>
))

export default function App() {
	useScrollTop()

	return (
		<Provider store={store}>
			<HelmetProvider>
				<MemoizedRoutes />
			</HelmetProvider>
		</Provider>
	)
}
