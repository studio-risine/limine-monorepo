import { randomUUID } from 'node:crypto'
import type { DeadlinesRepository } from '@/interfaces/deadlines-repository'
import type { Deadline, Prisma } from 'generated/prisma'

export class InMemoryDeadlinesRepository implements DeadlinesRepository {
	private deadlines: Deadline[] = []

	async create(data: Prisma.DeadlineUncheckedCreateInput): Promise<Deadline> {
		const deadline: Deadline = {
			id: data.id ?? randomUUID(),
			name: data.name,
			processId: data.processId,
		}

		this.deadlines.push(deadline)

		return deadline
	}

	async findById(id: string): Promise<Deadline | null> {
		const deadline = this.deadlines.find((deadline) => deadline.id === id)

		if (!deadline) {
			return null
		}

		return deadline
	}
}
