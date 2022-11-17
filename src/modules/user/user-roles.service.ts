import { Injectable, NotFoundException } from '@nestjs/common'
import { RolesService } from '../roles/roles.service'
import { UserService } from './user.service'
import { RoleDto } from './dto/role.dto'
import { AppError } from '../../utils/enums/error'
import { AppRoles } from '../../utils/enums/roles'

@Injectable()
export class UserRolesService {
	constructor(
		private readonly roleService: RolesService,
		private readonly userService: UserService
	) {}

	async addRole(dto: RoleDto) {
		const user = await this.userService.getUserById(dto.userId)
		const role = await this.roleService.getRoleByValue(dto.value)

		if (role && user) {
			await user.$add('role', role.id)

			return await this.userService.getUserById(dto.userId)
		}

		throw new NotFoundException(AppError.USER_ROLE_NOTE_EXIST)
	}

	async deleteRole(dto: RoleDto) {
		const user = await this.userService.getUserById(dto.userId)
		const role = await this.roleService.getRoleByValue(dto.value)

		if (role && user) {
			await user.$remove('role', role.id)

			return await this.userService.getUserById(dto.userId)
		}

		throw new NotFoundException(AppError.USER_ROLE_NOTE_EXIST)
	}

	async setDefaultRole(user) {
		const role = await this.roleService.getRoleByValue(AppRoles.USER)

		await user.$set('roles', [role.id])
	}
}
