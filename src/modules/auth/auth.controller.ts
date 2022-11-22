import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { IAuthResponse } from './response/auth.response'
import { UserLoginDto } from './dto/user-login.dto'
import { JwtUser } from '../../decorators/user.decorator'
import { User } from '../user/models/user.model'
import { Roles } from '../../decorators/roles.decorator'
import { AppRoles } from '../../utils/enums/roles'


@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(200)
	@Post('register')
	register(@Body() dto: CreateUserDto): Promise<IAuthResponse> {
		return this.authService.register(dto)
	}

	@HttpCode(200)
	@Post('login')
	login(@Body() dto: UserLoginDto): Promise<IAuthResponse> {
		return this.authService.login(dto)
	}
}
