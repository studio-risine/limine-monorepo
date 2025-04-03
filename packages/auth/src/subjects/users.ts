import { z } from 'zod'

const userSubjectSchema = z.tuple([
	z.union([
		z.literal('create'),
		z.literal('delete'),
		z.literal('update'),
		z.literal('invite'),
		z.literal('manage'),
	]),
	z.literal('User'),
])

export type UserSubject = z.infer<typeof userSubjectSchema>
