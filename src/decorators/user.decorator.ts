import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { UserTable } from '../modules/user/models/user.model'

export const User = createParamDecorator(
	(data: keyof UserTable, ctx: ExecutionContext) => {
		const request = ctx.switchToHttp().getRequest()
		const user = request.user

		return data ? user?.[data] : user
	}
)
