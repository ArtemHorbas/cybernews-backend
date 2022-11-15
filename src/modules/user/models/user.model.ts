import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({ tableName: 'users' })
export class UserTable extends Model {
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
}
