import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { PostService } from './post.service'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { CurrentUser } from '../../decorators/user.decorator'
import { Roles } from '../../decorators/roles.decorator'
import { AppRoles } from '../../utils/enums/roles'
import { Post as PostModel } from './models/post.model'

@Controller('post')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@HttpCode(200)
	@Post()
	@Roles(AppRoles.ADMIN, AppRoles.MODER)
	create(
		@Body() dto: CreatePostDto,
		@CurrentUser('id') userId: number
	): Promise<PostModel> {
		return this.postService.create(dto, userId)
	}

	@Get()
	findAll(): Promise<PostModel[]> {
		return this.postService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string): Promise<PostModel> {
		return this.postService.findOne(+id)
	}

	@HttpCode(200)
	@Patch(':id')
	@Roles(AppRoles.ADMIN, AppRoles.MODER)
	update(
		@Param('id') id: string,
		@Body() dto: UpdatePostDto
	): Promise<PostModel> {
		return this.postService.update(dto, +id)
	}

	@HttpCode(200)
	@Delete(':id')
	@Roles(AppRoles.ADMIN, AppRoles.MODER)
	remove(@Param('id') id: string): Promise<number> {
		return this.postService.remove(+id)
	}
}
