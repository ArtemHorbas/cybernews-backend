import {
	BelongsToMany,
	Column,
	DataType,
	HasMany,
	Model,
	Table
} from 'sequelize-typescript'
import { Role } from '../../roles/models/roles.model'
import { UserRoles } from './user-roles.model'
import { Post } from '../../post/models/post.model'

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

	@HasMany(() => Post, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	posts: Post[]

	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[]
}
