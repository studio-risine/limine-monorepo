import type { Prisma, User } from 'generated/prisma'

export interface UserRepository {
	create(data: Prisma.UserCreateInput): Promise<User>
	findById(id: string): Promise<User | null>
	findByEmail(email: string): Promise<User | null>
}
