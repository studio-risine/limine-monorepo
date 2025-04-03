import {
	AbilityBuilder,
	type CreateAbility,
	type MongoAbility,
	createMongoAbility,
} from '@casl/ability'
import type { User } from './models/user'
import { permissions } from './permissions'
import type { DeadlinesSubject } from './subjects/deadlines'
import type { HolidaysSubject } from './subjects/holidays'
import type { UserSubject } from './subjects/users'

type AppAbilities =
	| UserSubject
	| DeadlinesSubject
	| HolidaysSubject
	| ['manage', 'all']

export type AppAbility = MongoAbility<AppAbilities>
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>

export function defineAbilityFor(user: User): AppAbility {
	const builder = new AbilityBuilder(createAppAbility)

	if (typeof permissions[user.role] !== 'function') {
		throw new Error(`Permissions for role "${user.role} not found."`)
	}

	permissions[user.role](user, builder)

	const ability = builder.build({
		detectSubjectType(subject) {
			return subject.__typename
		},
	})

	return ability
}
