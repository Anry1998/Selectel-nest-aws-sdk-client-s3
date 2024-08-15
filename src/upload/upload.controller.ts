import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadServise: UploadService) {}

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile(
        new ParseFilePipe({
            validators: [
                // new MaxFileSizeValidator({maxSize: 1000}), 
                // new FileTypeValidator({fileType: 'image/jpeg'})
            ],
        })
    ) file: Express.Multer.File) {
        await this.uploadServise.upload(file.originalname, file.buffer)
    }
}
