import { Injectable } from '@nestjs/common'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'
import { InjectModel } from '@nestjs/sequelize'
import { Post } from './models/post.model'

@Injectable()
export class PostService {
	constructor(
		@InjectModel(Post) private readonly postRepository: typeof Post
	) {}

	async create(dto: CreatePostDto, userId: number): Promise<Post> {
		const newPost = await this.postRepository.create({
			title: dto.title,
			image: dto.image,
			description: dto.description,
			content: dto.content,
			userId
		})

		return await this.findOne(newPost.id)
	}

	async findAll(): Promise<Post[]> {
		return await this.postRepository.findAll({
			include: { all: true }
		})
	}

	async findOne(id: number): Promise<Post> {
		return await this.postRepository.findByPk(id, {
			include: { all: true }
		})
	}

	async update(dto: UpdatePostDto, id: number): Promise<Post> {
		await this.postRepository.update(dto, { where: { id } })

		return await this.findOne(id)
	}

	async remove(id: number): Promise<number> {
		return await this.postRepository.destroy({ where: { id } })
	}
}
