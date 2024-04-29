import '@/styles/global.scss'
import { lazy, Suspense } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useScrollTop } from './hooks/useScrollTop.ts'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const SignIn = lazy(() => import('@/pages/signIn.tsx'))
const SignUp = lazy(() => import('@/pages/signUp.tsx'))

export default function App() {
	useScrollTop()

	return (
		<HelmetProvider>
			<Suspense fallback={<p>loading...</p>}>
				<BrowserRouter>
					<Routes>
						<Route path={'/'} element={<h1>siema</h1>} />
						<Route path={'/sign-in'} element={<SignIn/>} />
						<Route path={'/sign-up'} element={<SignUp/>} />
					</Routes>
				</BrowserRouter>
			</Suspense>
		</HelmetProvider>
	)
}
