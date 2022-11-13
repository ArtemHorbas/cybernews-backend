import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserTable } from './models/user.model'

@Module({
	imports: [SequelizeModule.forFeature([UserTable])],
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule {}
