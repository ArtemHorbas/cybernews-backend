import { UserTable } from '../../user/models/user.model'
import { IsString } from 'class-validator'

export class AuthResponse {
	user: UserTable

	@IsString()
	token: string
}
