import '@/styles/global.scss'
import { lazy, Suspense } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useScrollTop } from '@/hooks/useScrollTop.ts'
import { store } from '@/utils/store.ts'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Login = lazy(() => import('@/pages/login.tsx'))

export default function App() {
	useScrollTop()

	return (
		<Suspense fallback={<p>loading...</p>}>
			<Provider store={store}>
				<HelmetProvider>
					<BrowserRouter>
						<Routes>
							<Route path={'/'} element={<h1>siema</h1>} />
							<Route path={'/login'} element={<Login />} />
							<Route path={'/app'} element={<h1>app</h1>} />
						</Routes>
					</BrowserRouter>
				</HelmetProvider>
			</Provider>
		</Suspense>
	)
}
