import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
	schema: './src/db/schema.ts',
	out: './src/migrations',
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.DB_URL as string,
	},
	// verbose: true,
	strict: true,
} satisfies Config;
