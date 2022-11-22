import { ConfigService } from '@nestjs/config'
import { SequelizeModuleOptions } from '@nestjs/sequelize'
import { User } from '../modules/user/models/user.model'
import { Role } from '../modules/roles/models/roles.model'
import { UserRoles } from '../modules/user/models/user-roles.model'
import { Post } from '../modules/post/models/post.model'


export const getSequelizeConfig = async (
	configService: ConfigService
): Promise<SequelizeModuleOptions> => ({
	dialect: 'postgres',
	host: configService.get('DB_HOST'),
	port: configService.get('DB_PORT'),
	username: configService.get('DB_USER'),
	password: configService.get('DB_PASSWORD'),
	database: configService.get('DB_NAME'),
	synchronize: true,
	autoLoadModels: true,
	models: [User, Role, Post, UserRoles]
})
