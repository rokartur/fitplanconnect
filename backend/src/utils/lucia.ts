import { Lucia } from 'lucia'
import adapter from '@/utils/adapter'

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: false,
		},
	},
})

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia
	}
}
