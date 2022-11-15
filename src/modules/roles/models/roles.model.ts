import { Column, DataType, Model, Table } from 'sequelize-typescript'

@Table({ tableName: 'roles' })
export class RolesTable extends Model {
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	value: string

	@Column({ type: DataType.STRING, allowNull: false })
	description: string
}
