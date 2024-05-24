export const clearAuthCookies = (github_oauth_state: any, auth_session: any) => {
	github_oauth_state.set({
		value: '',
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		path: '/',
		maxAge: 0,
	})
	auth_session.set({
		value: '',
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		path: '/',
		maxAge: 0,
	})
}
