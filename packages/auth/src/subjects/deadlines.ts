import { deadlinesModelSchema } from '@/models/deadlines'
import { z } from 'zod'

const deadlinesSubjectSchema = z.tuple([
	z.union([
		z.literal('create'),
		z.literal('delete'),
		z.literal('update'),
		z.literal('create'),
	]),
	z.union([z.literal('Deadline'), deadlinesModelSchema]),
])

export type DeadlinesSubject = z.infer<typeof deadlinesSubjectSchema>
