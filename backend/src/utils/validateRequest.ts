import { lucia } from '@/utils/lucia'

export const validateRequest = async (auth_session: any) => {
	const sessionId = auth_session?.value ?? null

	if (!sessionId) return { user: null, session: null }

	const { user, session } = await lucia.validateSession(sessionId)
	try {
		if (session && session.fresh) {
			const sessionCookie = lucia.createSessionCookie(session.id)
			auth_session.set({
				value: sessionCookie.value,
				httpOnly: sessionCookie.attributes.httpOnly,
				secure: sessionCookie.attributes.secure,
				sameSite: sessionCookie.attributes.sameSite,
				path: sessionCookie.attributes.path,
				maxAge: sessionCookie.attributes.maxAge,
			})
		}
		if (!session) {
			const sessionCookie = lucia.createBlankSessionCookie()
			auth_session.set({
				value: sessionCookie.value,
				httpOnly: sessionCookie.attributes.httpOnly,
				secure: sessionCookie.attributes.secure,
				sameSite: sessionCookie.attributes.sameSite,
				path: sessionCookie.attributes.path,
				maxAge: sessionCookie.attributes.maxAge,
			})
		}
	} catch (error: any) {
		console.log(error)
	}

	return { user, session }
}
