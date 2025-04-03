import { z } from 'zod'

export const holidaysModelSchema = z.object({
	__typename: z.literal('Holidays').default('Holidays'),
	id: z.string().uuid(),
	ownerId: z.string().uuid(),
})

export type HolidaysModel = z.infer<typeof holidaysModelSchema>
