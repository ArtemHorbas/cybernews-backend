import { User } from '../../user/models/user.model'

export interface IAuthResponse {
	user: User
	token: string
}
