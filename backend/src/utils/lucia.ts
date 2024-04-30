import { Lucia } from 'lucia'
import adapter from '@/utils/adapter'

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === 'production',
		},
	},
})

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia
	}
}
