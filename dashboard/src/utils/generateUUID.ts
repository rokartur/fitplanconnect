export const generateUUID = (n = 0) => {
	let uid = ''

	for (let i = 0; i <= n; i++) {
		uid += self.crypto.randomUUID().split('-').join('')
	}

	return uid
}
