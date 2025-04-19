import { randomUUID } from 'node:crypto'
import type { ProcessesRepository } from '@/interfaces/processes-repository'
import type { Prisma, Process } from 'generated/prisma'

export class InMemoryProcessesRepository implements ProcessesRepository {
	private processes: Process[] = []

	async create(data: Prisma.ProcessUncheckedCreateInput): Promise<Process> {
		const process: Process = {
			id: data.id ?? randomUUID(),
			name: data.name,
			userId: data.userId,
			createdAt: new Date(),
			startedOn: data.startedOn ? new Date(data.startedOn) : null,
		}

		this.processes.push(process)

		return process
	}

	async findById(id: string): Promise<Process | null> {
		const process = this.processes.find((process) => process.id === id)

		if (!process) {
			return null
		}

		return process
	}
}
