import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { RolesGuard } from '../guards/roles.guard'
import { AppRoles } from '../utils/enums/roles'
import { JwtAuthGuard } from '../guards/jwt.guard'

export const ROLES_KEY = 'roles'


export const Roles = (...roles: AppRoles[]) => {
	return applyDecorators(
		SetMetadata(ROLES_KEY, roles),
		UseGuards(JwtAuthGuard, RolesGuard)
	)
}
