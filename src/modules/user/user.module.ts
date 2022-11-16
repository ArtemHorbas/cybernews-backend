import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './models/user.model'
import { Role } from '../roles/models/roles.model'
import { UserRoles } from '../roles/models/user-roles.model'
import { RolesModule } from '../roles/roles.module'

@Module({
	imports: [SequelizeModule.forFeature([User, Role, UserRoles]), RolesModule],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService]
})
export class UserModule {}
