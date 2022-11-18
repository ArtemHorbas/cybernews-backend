import {
	Body,
	Controller,
	Delete,
	Get,
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

	@Post()
	@Roles(AppRoles.ADMIN, AppRoles.MODER)
	createPost(
		@Body() dto: CreatePostDto,
		@CurrentUser('id') userId: number
	): Promise<PostModel> {
		return this.postService.create(dto, userId)
	}

	@Get()
	getAllPosts(): Promise<PostModel[]> {
		return this.postService.findAll()
	}

	@Get(':id')
	getPost(@Param('id') id: string): Promise<PostModel> {
		return this.postService.findOne(+id)
	}

	@Patch(':id')
	updatePost(
		@Param('id') id: string,
		@Body() dto: UpdatePostDto
	): Promise<PostModel> {
		return this.postService.update(dto, +id)
	}

	@Delete(':id')
	deletePost(@Param('id') id: string): Promise<number> {
		return this.postService.remove(+id)
	}
}
