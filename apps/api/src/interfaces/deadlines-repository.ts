import type { Deadline, Prisma } from 'generated/prisma'

export interface DeadlinesRepository {
	create(data: Prisma.DeadlineUncheckedCreateInput): Promise<Deadline>
	findById(id: string): Promise<Deadline | null>
}
