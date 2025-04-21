import { randomUUID } from 'node:crypto'
import type { TokenRepository } from '@/interfaces/tokens-repository'
import type { Prisma, Token } from 'generated/prisma'

export class InMemoryTokensRepository implements TokenRepository {
	private tokens: Token[] = []

	async create(data: Prisma.TokenUncheckedCreateInput): Promise<Token> {
		const token: Token = {
			id: data.id ?? randomUUID(),
			type: data.type,
			createdAt: new Date(),
			userId: data.userId,
		}

		this.tokens.push(token)

		return token
	}

	async findById(id: string): Promise<Token | null> {
		const token = this.tokens.find((token) => token.id === id)

		return token ? token : null
	}
}
