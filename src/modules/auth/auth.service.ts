import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { CreateUserDto } from '../user/dto/create-user.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async registerUser(dto: CreateUserDto) {
		dto.password = await this.hashPassword(dto.password)

		await this.userService.createUser(dto)

		const user = await this.userService.publicUserByEmail(dto.email)

		return user
	}

	//HELPERS
	async hashPassword(password: string) {
		return bcrypt.hash(password, 10)
	}
}
