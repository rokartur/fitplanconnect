export const useLocalStorage = (key: string) => {
	const setItem = (value: string) => {
		try {
			window.localStorage.setItem(key, JSON.stringify(value))
		} catch (error) {
			console.error(error)
		}
	}

	const getItem = () => {
		try {
			const item = window.localStorage.getItem(key)
			return item ? JSON.parse(item) : undefined
		} catch (error) {
			console.error(error)
			return null
		}
	}

	const removeItem = () => {
		try {
			window.localStorage.removeItem(key)
		} catch (error) {
			console.error(error)
		}
	}

	return { setItem, getItem, removeItem }
}
