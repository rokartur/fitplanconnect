import { ElysiaApp } from '@/app'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { sessions, trainers, users } from '@/db/schema'
import { validateRequest } from '@/utils/validateRequest'
import { t } from 'elysia'

export default (app: ElysiaApp) =>
	app
