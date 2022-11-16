import { User } from '../../user/models/user.model'
import { IsString } from 'class-validator'

export class AuthResponse {
	user: User

	@IsString()
	token: string
}
