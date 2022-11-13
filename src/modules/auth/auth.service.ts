import { BadRequestException, Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { CreateUserDto } from '../user/dto/create-user.dto'
import * as bcrypt from 'bcrypt'
import { AuthResponse } from './response/auth.response'
import { AppError } from '../../utils/error'
import { UserLoginDto } from './dto/user-login.dto'

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async registerUser(dto: CreateUserDto): Promise<AuthResponse> {
		const existUser = await this.userService.findUserByEmail(dto.email)
		if (existUser) throw new BadRequestException(AppError.USER_EXIST)

		dto.password = await this.hashPassword(dto.password)

		await this.userService.createUser(dto)

		const user = await this.userService.publicUserByEmail(dto.email)

		return { user }
	}

	async loginUser(dto: UserLoginDto): Promise<AuthResponse> {
		const existUser = await this.userService.findUserByEmail(dto.email)
		if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST)

		const validatePassword = await bcrypt.compare(
			dto.password,
			existUser.password
		)
		if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA)

		return {
			user: await this.userService.publicUserById(existUser.id)
		}
	}

	//HELPERS
	async hashPassword(password: string) {
		return bcrypt.hash(password, 10)
	}
}
