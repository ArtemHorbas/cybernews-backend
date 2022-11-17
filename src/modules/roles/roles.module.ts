import { Module } from '@nestjs/common'
import { RolesController } from './roles.controller'
import { RolesService } from './roles.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { Role } from './models/roles.model'
import { User } from '../user/models/user.model'
import { UserRoles } from '../user/models/user-roles.model'

@Module({
	imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
	controllers: [RolesController],
	providers: [RolesService],
	exports: [RolesService]
})
export class RolesModule {}
