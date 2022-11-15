import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UserTable } from './models/user.model'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

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

	async getAllUsers() {
		return this.userRepository.findAll({
			attributes: { exclude: ['password'] }
		})
	}

	async getUserById(id: number): Promise<UserTable> {
		return this.userRepository.findOne({
			where: { id },
			attributes: {
				exclude: ['password']
			}
		})
	}

	async updateUser(dto: UpdateUserDto, id: number): Promise<UpdateUserDto> {
		await this.userRepository.update(dto, { where: { id } })
		return dto
	}

	async deleteUser(id: number): Promise<number> {
		return this.userRepository.destroy({ where: { id } })
	}

	//HELPERS
	async getFullUser(email: string): Promise<UserTable> {
		return this.userRepository.findOne({ where: { email } })
	}

	async getUserByEmail(email: string): Promise<UserTable> {
		return this.userRepository.findOne({
			where: { email },
			attributes: {
				exclude: ['password']
			}
		})
	}
}
