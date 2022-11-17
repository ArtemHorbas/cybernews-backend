import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './models/user.model'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserRolesService } from './user-roles.service'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User) private readonly userRepository: typeof User,
		private readonly userRolesService: UserRolesService
	) {}

	async createUser(dto: CreateUserDto) {
		const user = await this.userRepository.create({
			userName: dto.userName,
			email: dto.email,
			password: dto.password,
			steam: dto.steam,
			discord: dto.discord
		})

		await this.userRolesService.setDefaultRole(user)
	}

	async getAllUsers() {
		return this.userRepository.findAll({
			attributes: { exclude: ['password'] },
			include: { all: true }
		})
	}

	async getUserById(id: number): Promise<User> {
		return this.userRepository.findByPk(id, {
			attributes: {
				exclude: ['password']
			},
			include: { all: true }
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
	async getFullUser(email: string): Promise<User> {
		return this.userRepository.findOne({ where: { email } })
	}

	async getUserByEmail(email: string): Promise<User> {
		return this.userRepository.findOne({
			where: { email },
			attributes: {
				exclude: ['password']
			},
			include: { all: true }
		})
	}
}
