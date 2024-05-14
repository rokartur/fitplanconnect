import 'dotenv/config'
import { GitHub } from 'arctic'

export const github = new GitHub(
	process.env.OAUTH_CLIENT_ID as string,
	process.env.OAUTH_CLIENT_SECRET as string,
	{
		redirectURI: process.env.OAUTH_REDIRECT_URI as string,
	},
)
