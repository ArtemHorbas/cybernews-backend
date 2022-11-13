import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UserTable } from './models/user.model'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserTable) private readonly userRepository: typeof UserTable
	) {}

	async createUser(dto: CreateUserDto) {
		await this.userRepository.create({
			userName: dto.userName,
			email: dto.email,
			password: dto.password,
			steam: dto.steam,
			discord: dto.discord
		})
	}

	async publicUserById(id: number) {
		return this.userRepository.findOne({
			where: { id },
			attributes: {
				exclude: ['password']
			}
		})
	}

	async publicUserByEmail(email: string) {
		return this.userRepository.findOne({
			where: { email },
			attributes: {
				exclude: ['password']
			}
		})
	}
}
