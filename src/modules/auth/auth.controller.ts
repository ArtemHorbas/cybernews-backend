import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { AuthResponse } from './response/auth.response'
import { UserLoginDto } from './dto/user-login.dto'
import { JwtUser } from '../../decorators/user.decorator'
import { User } from '../user/models/user.model'
import { Roles } from '../../decorators/roles.decorator'
import { AppRoles } from '../../utils/enums/roles'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	register(@Body() dto: CreateUserDto): Promise<AuthResponse> {
		return this.authService.registerUser(dto)
	}

	@Post('login')
	login(@Body() dto: UserLoginDto): Promise<AuthResponse> {
		return this.authService.loginUser(dto)
	}

	@Post('test')
	@Roles(AppRoles.ADMIN)
	test(@JwtUser() user: User) {
		return user
	}
}
