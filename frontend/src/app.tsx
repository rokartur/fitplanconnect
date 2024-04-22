import '@/styles/global.scss'
import { Suspense } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useScrollTop } from './hooks/useScrollTop.ts'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function App() {
	useScrollTop()

	return (
		<HelmetProvider>
			<Suspense fallback={<p>loading...</p>}>
				<BrowserRouter>
					<Routes>
						<Route path={'/'} element={<h1>siema</h1>} />
					</Routes>
				</BrowserRouter>
			</Suspense>
		</HelmetProvider>
	)
}
