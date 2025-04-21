import { randomUUID } from 'node:crypto'
import type { UserRepository } from '@/interfaces/users-repository'
import type { Prisma, User } from 'generated/prisma'

export class InMemoryUsersRepository implements UserRepository {
	private users: User[] = []

	async findById(id: string): Promise<User | null> {
		const user = this.users.find((user) => user.id === id)

		if (!user) {
			return null
		}

		return user
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = this.users.find((user) => user.email === email)

		if (!user) {
			return null
		}

		return user
	}
	async create(data: Prisma.UserCreateInput): Promise<User> {
		const user: User = {
			id: data.id ?? randomUUID(),
			name: data.name,
			email: data.email,
			password: data.password,
			createdAt: new Date(),
		}

		this.users.push(user)

		return user
	}
}
