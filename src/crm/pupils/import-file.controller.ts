import {
    BadRequestException,
    Controller,
    Post,
    Query,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MimeTypes } from './MimeTypes';
import { PupilsService } from './pupils.service';

@Controller('/CRM/Pupils')
export class ImportFileController {
    constructor(private readonly PupilsService: PupilsService) {}

    @Post('/uploadFile')
    @UseInterceptors(
        FileInterceptor('file', {
            fileFilter(req, file, pass) {
                if (
                    file.mimetype !== MimeTypes.CSV &&
                    file.mimetype !== MimeTypes.XLSX
                ) {
                    pass(new BadRequestException(), false);
                } else pass(null, true);
            }
        })
    )
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Query('sheetName') sheetName: string
    ) {
        if (file.mimetype === MimeTypes.CSV) {
            return this.PupilsService.uploadCSV(file);
        }

        if (file.mimetype === MimeTypes.XLSX) {
            return this.PupilsService.uploadXLSX(file, sheetName);
        }
    }
}
