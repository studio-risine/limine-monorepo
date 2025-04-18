import type { UserRepository } from '@/interfaces/users-repository'
import { prisma } from '@/lib/prisma'
import type { Prisma, User } from 'generated/prisma'

export class PrismaUsersRespository implements UserRepository {
	async create(data: Prisma.UserCreateInput): Promise<User> {
		const user = await prisma.user.create({
			data,
		})

		return user
	}
	async findById(id: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		})

		return user
	}
	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		})

		return user
	}
}
