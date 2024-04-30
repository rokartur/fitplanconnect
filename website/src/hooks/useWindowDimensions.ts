import { useEffect, useState } from 'react'

export const useWindowDimensions = () => {
	const [dimensions, setDimensions] = useState(getWindowSize())

	useEffect(() => {
		function handleWindowResize() {
			setDimensions(getWindowSize())
		}

		window.addEventListener('resize', handleWindowResize)

		return () => window.removeEventListener('resize', handleWindowResize)
	}, [])

	return dimensions
}

const getWindowSize = () => {
	if (typeof window === 'undefined') return { width: 0, height: 0 }
	const { innerWidth, innerHeight } = window
	return { width: innerWidth, height: innerHeight }
}
