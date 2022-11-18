import { IsNumber, IsString } from 'class-validator'

export class RoleDto {
	@IsString()
	value: string

	@IsNumber()
	userId: number
}
