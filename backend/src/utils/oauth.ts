import 'dotenv/config'
import { GitHub } from 'arctic'

export const github = new GitHub(
	process.env.GITHUB_CLIENT_ID as string,
	process.env.GITHUB_CLIENT_SECRET as string,
	{
		redirectURI: process.env.GITHUB_REDIRECT_URI as string,
	},
)
