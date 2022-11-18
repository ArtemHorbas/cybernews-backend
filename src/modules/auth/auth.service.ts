import { BadRequestException, Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { CreateUserDto } from '../user/dto/create-user.dto'
import * as bcrypt from 'bcrypt'
import { IAuthResponse } from './response/auth.response'
import { AppError } from '../../utils/enums/error'
import { UserLoginDto } from './dto/user-login.dto'
import { TokenService } from '../token/token.service'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly tokenService: TokenService
	) {}

	async register(dto: CreateUserDto): Promise<IAuthResponse> {
		const existUser = await this.userService.findFullUser(dto.email)
		if (existUser) throw new BadRequestException(AppError.USER_EXIST)

		dto.password = await this.hashPassword(dto.password)

		const newUser = await this.userService.create(dto)

		return {
			user: await this.userService.findById(newUser.id),
			token: await this.tokenService.generateJwtToken(newUser.id)
		}
	}

	async login(dto: UserLoginDto): Promise<IAuthResponse> {
		const existUser = await this.userService.findFullUser(dto.email)
		if (!existUser) throw new BadRequestException(AppError.USER_NOT_EXIST)

		const validatePassword = await bcrypt.compare(
			dto.password,
			existUser.password
		)
		if (!validatePassword) throw new BadRequestException(AppError.WRONG_DATA)

		return {
			user: await this.userService.findById(existUser.id),
			token: await this.tokenService.generateJwtToken(existUser.id)
		}
	}

	//HELPERS
	async hashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(10)

		return bcrypt.hash(password, salt)
	}
}
