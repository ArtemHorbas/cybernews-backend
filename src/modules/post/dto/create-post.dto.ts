import { IsString } from 'class-validator'

export class CreatePostDto {
	@IsString()
	title: string

	@IsString()
	miniText: string

	@IsString()
	image: string

	@IsString()
	description: string

	@IsString()
	secondImage: string

	@IsString()
	content: string
}
