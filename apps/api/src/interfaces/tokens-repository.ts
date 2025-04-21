import type { Prisma, Token } from 'generated/prisma'

export interface TokenRepository {
	create(data: Prisma.TokenUncheckedCreateInput): Promise<Token>
	findById(id: string): Promise<Token | null>
}
