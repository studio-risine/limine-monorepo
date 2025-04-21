import type { TokenRepository } from '@/interfaces/tokens-repository'
import { prisma } from '@/lib/prisma'
import type { Prisma, Token } from 'generated/prisma'

export class PrismaTokensRepository implements TokenRepository {
	async create(data: Prisma.TokenUncheckedCreateInput): Promise<Token> {
		const token = await prisma.token.create({
			data: {
				type: data.type,
				userId: data.userId,
			},
		})

		return token
	}
	async findById(id: string): Promise<Token | null> {
		const token = await prisma.token.findUnique({
			where: {
				id,
			},
		})

		return token
	}
}
