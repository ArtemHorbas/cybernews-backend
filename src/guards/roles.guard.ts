import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AppRoles } from '../utils/enums/roles'
import { ROLES_KEY } from '../decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.getAllAndOverride<AppRoles[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass()
		])

		const { user } = context.switchToHttp().getRequest()

		let userRoles: AppRoles[] = []
		user.roles.forEach(role => userRoles.push(role.value))

		return roles.some(role => userRoles?.includes(role))
	}
}
