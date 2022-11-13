import { Column, Model, Table } from 'sequelize-typescript'

@Table
export class UserTable extends Model {
	@Column
	userName: string

	@Column({ unique: true })
	email: string

	@Column
	password: string

	@Column
	steam?: string

	@Column
	discord?: string
}
