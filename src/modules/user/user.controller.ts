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

	@HttpCode(200)
	@Get('get-public/:id')
	getPublicUser(@Param('id') id: string): Promise<UserTable> {
		return this.userService.publicUserById(+id)
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
