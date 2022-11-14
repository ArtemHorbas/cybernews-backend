import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { AuthResponse } from './response/auth.response'
import { UserLoginDto } from './dto/user-login.dto'
import { Auth } from '../../decorators/auth.decorator'
import { User } from '../../decorators/user.decorator'
import { UserTable } from '../user/models/user.model'

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
	@Auth()
	test(@User() user: UserTable) {
		return user
	}
}
