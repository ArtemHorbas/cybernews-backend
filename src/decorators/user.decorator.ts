import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '../modules/user/models/user.model'

export const JwtUser = createParamDecorator(
	(data: keyof User, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		const user = request.user

		return data ? user?.[data] : user
	}
)
