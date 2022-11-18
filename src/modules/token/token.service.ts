import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class TokenService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async generateJwtToken(userId: number): Promise<string> {
		const payload = {
			id: userId
		}

		return this.jwtService.sign(payload, {
			secret: this.configService.get('JWT_SECRET'),
			expiresIn: this.configService.get('JWT_EXPIRE')
		})
	}
}
