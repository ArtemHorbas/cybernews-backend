import { User } from '../../user/models/user.model'
import { IsString } from 'class-validator'

export interface IAuthResponse {
	user: User

	@IsString()
	token: string
}
