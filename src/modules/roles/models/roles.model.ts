import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table
} from 'sequelize-typescript'
import { User } from '../../user/models/user.model'
import { UserRoles } from '../../user/models/user-roles.model'

@Table({ tableName: 'roles', createdAt: false, updatedAt: false })
export class Role extends Model {
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	value: string

	@Column({ type: DataType.STRING, allowNull: false })
	description: string

	@BelongsToMany(() => User, () => UserRoles)
	users: User[]
}
