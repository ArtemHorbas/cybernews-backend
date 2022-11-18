import { IsString } from 'class-validator'

export class CreatePostDto {
	@IsString()
	title: string

	@IsString()
	image: string

	description?: string

	@IsString()
	content: string
}
