import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table
} from 'sequelize-typescript'
import { Role } from '../../roles/models/roles.model'
import { UserRoles } from '../../roles/models/user-roles.model'

@Table({ tableName: 'users' })
export class User extends Model {
	@Column({ type: DataType.STRING, allowNull: false })
	userName: string

	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	email: string

	@Column({ type: DataType.STRING, allowNull: false })
	password: string

	@Column({ type: DataType.STRING, defaultValue: '' })
	steam?: string

	@Column({ type: DataType.STRING, defaultValue: '' })
	discord?: string

	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[]
}
