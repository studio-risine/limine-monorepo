import type { Prisma, Process } from 'generated/prisma'

export interface ProcessesRepository {
	create(data: Prisma.ProcessUncheckedCreateInput): Promise<Process>
	findById(id: string): Promise<Process | null>
}
