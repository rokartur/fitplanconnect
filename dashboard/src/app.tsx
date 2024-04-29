import '@/styles/globals.scss'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/components/ui/theme-provider.tsx'
import { store } from '@/utils/store.ts'
import { Header } from '@/components/header.tsx'
import { lazy, Suspense } from 'react'
import { useScrollToTop } from '@/hooks/useScrollToTop.ts'

const Overview = lazy(() => import('@/pages/overview.tsx'))
const NotFound = lazy(() => import('@/pages/notFound.tsx'))

export default function App() {
	useScrollToTop()

	return (
		<ThemeProvider defaultTheme={'system'}>
			<Provider store={store}>
				<HelmetProvider>
					<Suspense fallback={<p>loading...</p>}>
						<BrowserRouter>
							<Header />

							<Routes>
								<Route path={'/'} element={<Overview/>} />
								<Route path={'*'} element={<NotFound/>} />
							</Routes>
						</BrowserRouter>
					</Suspense>
				</HelmetProvider>
			</Provider>
		</ThemeProvider>
	)
}
