import type { AbilityBuilder } from '@casl/ability'

import type { AppAbility } from '.'
import type { User } from './models/user'
import type { Role } from './roles'

type Permissions = (user: User, builder: AbilityBuilder<AppAbility>) => void

export const permissions: Record<Role, Permissions> = {
	ADMIN(_, builder) {
		builder.can('manage', 'all')
	},
	MEMBER(user, builder) {
		builder.can('invite', 'User')

		builder.can('create', 'Deadline')
		builder.can('delete', 'Deadline', { owerId: { $eq: user.id } })

		builder.can('get', 'Holidays')
	},
}
