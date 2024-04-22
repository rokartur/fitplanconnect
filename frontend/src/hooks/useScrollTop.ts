import { useEffect } from 'react'

export const useScrollTop = () => {
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
		document.body.scrollTo({ top: 0, behavior: 'smooth' })
		document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
	}, [])
}
