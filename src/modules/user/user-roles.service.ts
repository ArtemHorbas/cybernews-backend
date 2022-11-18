import { Injectable, NotFoundException } from '@nestjs/common'
import { RolesService } from '../roles/roles.service'
import { UserService } from './user.service'
import { RoleDto } from './dto/role.dto'
import { AppError } from '../../utils/enums/error'
import { User } from './models/user.model'

@Injectable()
export class UserRolesService {
	constructor(
		private readonly userService: UserService,
		private readonly roleService: RolesService
	) {}

	async giveRole(dto: RoleDto): Promise<User> {
		const user = await this.userService.findById(dto.userId)
		const role = await this.roleService.getRoleByValue(dto.value)

		if (role && user) {
			await user.$add('role', role.id)

			return await this.userService.findById(dto.userId)
		}

		throw new NotFoundException(AppError.USER_ROLE_NOTE_EXIST)
	}

	async removeRole(dto: RoleDto): Promise<User> {
		const user = await this.userService.findById(dto.userId)
		const role = await this.roleService.getRoleByValue(dto.value)

		if (role && user) {
			await user.$remove('role', role.id)

			return await this.userService.findById(dto.userId)
		}

		throw new NotFoundException(AppError.USER_ROLE_NOTE_EXIST)
	}
}
