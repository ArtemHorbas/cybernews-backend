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
import { User } from '../../decorators/user.decorator'
import { UserTable } from './models/user.model'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	getAll(): Promise<UserTable[]> {
		return this.userService.getAllUsers()
	}

	@Get('profile')
	@Auth()
	getProfile(@User('id') id: number): Promise<UserTable> {
		return this.userService.getUserById(id)
	}

	@Get('by-id/:id')
	getUser(@Param('id') id: string): Promise<UserTable> {
		return this.userService.getUserById(+id)
	}

	@HttpCode(200)
	@Patch()
	@Auth()
	updateUser(
		@Body() dto: UpdateUserDto,
		@User('id') id: number
	): Promise<UpdateUserDto> {
		return this.userService.updateUser(dto, id)
	}

	@HttpCode(200)
	@Delete()
	@Auth()
	deleteUser(@User('id') id: number): Promise<number> {
		return this.userService.deleteUser(id)
	}
}
