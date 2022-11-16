import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Role } from './models/roles.model'
import { CreateRoleDto } from './dto/create-role.dto'

@Injectable()
export class RolesService {
	constructor(
		@InjectModel(Role) private readonly roleRepository: typeof Role
	) {}

	async createRole(dto: CreateRoleDto): Promise<Role> {
		return await this.roleRepository.create({
			value: dto.value,
			description: dto.description
		})
	}

	async getRoleByValue(value: string): Promise<Role> {
		return this.roleRepository.findOne({ where: { value } })
	}
}
