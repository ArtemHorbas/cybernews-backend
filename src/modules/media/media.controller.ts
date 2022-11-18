import {
	Controller,
	HttpCode,
	Post,
	Query,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { MediaService } from './media.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { Roles } from '../../decorators/roles.decorator'
import { AppRoles } from '../../utils/enums/roles'
import { IMediaResponse } from './response/media.response'

@Controller('media')
export class MediaController {
	constructor(private readonly mediaService: MediaService) {}

	@HttpCode(200)
	@Post()
	@Roles(AppRoles.ADMIN, AppRoles.MODER)
	@UseInterceptors(FileInterceptor('media'))
	uploadMediaFile(
		@UploadedFile() mediaFile: Express.Multer.File,
		@Query('folder') folder?: string
	): Promise<IMediaResponse> {
		return this.mediaService.saveMedia(mediaFile, folder)
	}
}
