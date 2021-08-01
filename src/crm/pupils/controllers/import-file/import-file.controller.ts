import {
    BadRequestException,
    Controller,
    Post,
    Query,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImportFileService } from '../../services/import-file/import-file.service';
import { MimeTypes } from '../../MimeTypes';
import { path } from '../../path';

@Controller(path)
export class ImportFileController {
    constructor(private readonly importFileService: ImportFileService) {}

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
            return this.importFileService.uploadCSV(file);
        }

        if (file.mimetype === MimeTypes.XLSX) {
            return this.importFileService.uploadXLSX(file, sheetName);
        }
    }
}
