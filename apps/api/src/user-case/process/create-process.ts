import type { ProcessesRepository } from '@/interfaces/processes-repository'

interface CreateProcessInput {
	name: string
	userId: string
}

export class CreateProcessUseCase {
	constructor(private repositoryProcess: ProcessesRepository) {}

	async execute({ name, userId }: CreateProcessInput) {
		const process = await this.repositoryProcess.create({
			name,
			userId,
		})

		return {
			process,
		}
	}
}
