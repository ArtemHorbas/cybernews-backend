import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app/app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	const PORT = process.env.PORT || 6000

	app.useGlobalPipes(new ValidationPipe())
	app.enableCors()
	app.setGlobalPrefix('api')

	await app.listen(PORT)
}

bootstrap()
