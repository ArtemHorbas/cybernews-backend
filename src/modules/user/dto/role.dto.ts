import { IsString } from 'class-validator'

export class RoleDto {
	@IsString()
	value: string

	@IsString()
	userId: number
}
