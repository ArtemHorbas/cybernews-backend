import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from '../user/user.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { getSequelizeConfig } from '../../config/sequelize.config'
import { AuthModule } from '../auth/auth.module'
import { TokenModule } from '../token/token.module'
import { RolesModule } from '../roles/roles.module'
import { PostModule } from '../post/post.module'
import { MediaModule } from '../media/media.module'


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
		UserModule,
		AuthModule,
		TokenModule,
		RolesModule,
		PostModule,
		MediaModule

	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
