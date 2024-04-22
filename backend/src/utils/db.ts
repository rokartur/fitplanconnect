import { Client } from 'pg'

export const db = new Client({
	host: process.env.SERVER_IP,
	user: process.env.DB_USER,
	port: Number(process.env.DB_PORT),
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
})
