import {
	BelongsTo,
	Column,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { User } from '../../user/models/user.model'

@Table({ tableName: 'posts' })
export class Post extends Model {
	@Column({ type: DataTypes.STRING, allowNull: false })
	title: string

	@Column({ type: DataTypes.STRING, allowNull: false })
	image: string

	@Column({ type: DataTypes.STRING, defaultValue: '' })
	description: string

	@Column({ type: DataTypes.STRING, allowNull: false })
	content: string

	@Column({ type: DataTypes.INTEGER, defaultValue: 0 })
	views: number

	@ForeignKey(() => User)
	@Column({ type: DataTypes.INTEGER })
	userId: number

	@BelongsTo(() => User)
	author: User
}
