import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch
} from '@nestjs/common'
import { UserService } from './user.service'
import { Auth } from '../../decorators/auth.decorator'
import { UpdateUserDto } from './dto/update-user.dto'
import { JwtUser } from '../../decorators/user.decorator'
import { User } from './models/user.model'
import { Roles } from '../../decorators/roles.decorator'
import { AppRoles } from '../../utils/enums/roles'
import { RoleDto } from './dto/role.dto'
import { UserRolesService } from './user-roles.service'

@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly userRolesService: UserRolesService
	) {}

	@Get()
	getAll(): Promise<User[]> {
		return this.userService.getAllUsers()
	}

	@Get('profile')
	@Auth()
	getProfile(@JwtUser('id') id: number): Promise<User> {
		return this.userService.getUserById(id)
	}

	@Get('by-id/:id')
	getUser(@Param('id') id: string): Promise<User> {
		return this.userService.getUserById(+id)
	}

	@HttpCode(200)
	@Patch()
	@Auth()
	updateUser(
		@Body() dto: UpdateUserDto,
		@JwtUser('id') id: number
	): Promise<UpdateUserDto> {
		return this.userService.updateUser(dto, id)
	}

	@HttpCode(200)
	@Delete()
	@Auth()
	deleteUser(@JwtUser('id') id: number): Promise<number> {
		return this.userService.deleteUser(id)
	}

	@Patch('role')
	@Roles(AppRoles.ADMIN)
	addRole(@Body() dto: RoleDto) {
		return this.userRolesService.addRole(dto)
	}

	@Delete('role')
	@Roles(AppRoles.ADMIN)
	deleteRole(@Body() dto: RoleDto) {
		return this.userRolesService.deleteRole(dto)
	}
}
