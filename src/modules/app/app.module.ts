import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from '../user/user.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { getSequelizeConfig } from '../../config/sequelize.config'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		SequelizeModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getSequelizeConfig
		}),
		UserModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
