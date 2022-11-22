
import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common'
import { RolesService } from './roles.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { Role } from './models/roles.model'

@Controller('roles')
export class RolesController {
	constructor(private readonly roleService: RolesService) {}


	@HttpCode(200)
	@Post()
	createRole(@Body() dto: CreateRoleDto): Promise<Role> {
		return this.roleService.createRole(dto)
	}

	@Get('/:value')
	getRole(@Param('value') value: string): Promise<Role> {
		return this.roleService.getRoleByValue(value)
	}
}
