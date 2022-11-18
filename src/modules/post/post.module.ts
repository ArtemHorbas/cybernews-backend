import { Module } from '@nestjs/common'
import { PostService } from './post.service'
import { PostController } from './post.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from '../user/models/user.model'
import { Post } from './models/post.model'

@Module({
	imports: [SequelizeModule.forFeature([User, Post])],
	controllers: [PostController],
	providers: [PostService]
})
export class PostModule {}
