import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './models/user.model'
import { Role } from '../roles/models/roles.model'
import { UserRoles } from './models/user-roles.model'
import { RolesModule } from '../roles/roles.module'
import { UserRolesService } from './user-roles.service'
import { Post } from '../post/models/post.model'

@Module({
	imports: [
		SequelizeModule.forFeature([User, Role, Post, UserRoles]),
		RolesModule
	],
	controllers: [UserController],
	providers: [UserService, UserRolesService],
	exports: [UserService]
})
export class UserModule {}
