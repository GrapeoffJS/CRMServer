import {
    BadRequestException,
    Controller,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImportFileService } from '../../services/import-file/import-file.service';
import { MimeTypes } from '../../MimeTypes';
import { path } from '../../path';
import { ActionPermissionsGuard } from 'src/admin-panel/roles/action-permissions.guard';
import { ActionPermissions } from 'src/admin-panel/roles/models/ActionPermissions';

@Controller(path)
export class ImportFileController {
    constructor(private readonly importFileService: ImportFileService) {}

    @UseGuards(ActionPermissionsGuard(ActionPermissions.CanImportFile))
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
    public async uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (file.mimetype === MimeTypes.CSV) {
            return this.importFileService.uploadCSV(file);
        }

        if (file.mimetype === MimeTypes.XLSX) {
            return this.importFileService.uploadXLSX(file);
        }
    }
}
