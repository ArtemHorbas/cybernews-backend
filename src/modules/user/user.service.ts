import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from './models/user.model'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AppRoles } from '../../utils/enums/roles'
import { RolesService } from '../roles/roles.service'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User) private readonly userRepository: typeof User,
		private readonly roleService: RolesService
	) {}

	async create(dto: CreateUserDto): Promise<User> {
		const user = await this.userRepository.create({
			userName: dto.userName,
			email: dto.email,
			password: dto.password,
			steam: dto.steam,
			discord: dto.discord
		})

		const role = await this.roleService.getRoleByValue(AppRoles.ADMIN)

		await user.$set('roles', [role.id])

		return user
	}

	async findAll(): Promise<User[]> {
		return await this.userRepository.findAll({
			attributes: { exclude: ['password'] },
			include: { all: true }
		})
	}

	async findById(id: number): Promise<User> {
		return await this.userRepository.findByPk(id, {
			attributes: {
				exclude: ['password']
			},
			include: { all: true }
		})
	}

	async update(dto: UpdateUserDto, id: number): Promise<UpdateUserDto> {
		await this.userRepository.update(dto, { where: { id } })
		return dto
	}

	async remove(id: number): Promise<number> {
		return this.userRepository.destroy({ where: { id } })
	}

	//HELPERS
	async findFullUser(email: string): Promise<User> {
		return this.userRepository.findOne({ where: { email } })
	}
}
