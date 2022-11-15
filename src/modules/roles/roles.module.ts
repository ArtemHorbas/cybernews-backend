import { Module } from '@nestjs/common'
import { RolesController } from './roles.controller'
import { RolesService } from './roles.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { RolesTable } from './models/roles.model'

@Module({
	imports: [SequelizeModule.forFeature([RolesTable])],
	controllers: [RolesController],
	providers: [RolesService]
})
export class RolesModule {}
