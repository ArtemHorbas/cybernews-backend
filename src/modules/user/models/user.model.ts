import { Column, Model, Table } from 'sequelize-typescript'

@Table
export class UserTable extends Model {
	@Column
	userName: string

	@Column({ unique: true })
	email: string

	@Column
	password: string

	@Column({ defaultValue: '' })
	steam?: string

	@Column({ defaultValue: '' })
	discord?: string
}
