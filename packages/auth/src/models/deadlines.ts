import { z } from 'zod'

export const deadlinesModelSchema = z.object({
	__typename: z.literal('Deadline').default('Deadline'),
	id: z.string().uuid(),
	owerId: z.string().uuid(),
})

export type Deadlines = z.infer<typeof deadlinesModelSchema>
