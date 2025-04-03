import { holidaysModelSchema } from '@/models/holidays'
import { z } from 'zod'

const holidaysSubjectShema = z.tuple([
	z.union([
		z.literal('create'),
		z.literal('get'),
		z.literal('update'),
		z.literal('delite'),
		z.literal('manage'),
	]),
	z.union([z.literal('Holidays'), holidaysModelSchema]),
])

export type HolidaysSubject = z.infer<typeof holidaysSubjectShema>
