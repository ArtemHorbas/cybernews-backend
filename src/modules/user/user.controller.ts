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
import { CurrentUser } from '../../decorators/user.decorator'
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
	findAll(): Promise<User[]> {
		return this.userService.findAll()
	}

	@Get('profile')
	@Auth()
	getProfile(@CurrentUser('id') id: number): Promise<User> {
		return this.userService.findById(id)
	}

	@Get('by-id/:id')
	findOne(@Param('id') id: string): Promise<User> {
		return this.userService.findById(+id)
	}

	@HttpCode(200)
	@Patch()
	@Auth()
	update(
		@Body() dto: UpdateUserDto,
		@CurrentUser('id') id: number
	): Promise<UpdateUserDto> {
		return this.userService.update(dto, id)
	}

	@HttpCode(200)
	@Delete()
	@Auth()
	remove(@CurrentUser('id') id: number): Promise<number> {
		return this.userService.remove(id)
	}

	@HttpCode(200)
	@Patch('role')
	@Roles(AppRoles.ADMIN)
	addRole(@Body() dto: RoleDto): Promise<User> {
		return this.userRolesService.giveRole(dto)
	}

	@HttpCode(200)
	@Delete('role')
	@Roles(AppRoles.ADMIN)
	removeRole(@Body() dto: RoleDto): Promise<User> {
		return this.userRolesService.removeRole(dto)
	}
}
