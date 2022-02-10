import {
    BadRequestException,
    Controller,
    Get,
    Post,
    Query,
    Res,
    StreamableFile,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { XlsxImportServiceService } from './services/xlsx-import-service/xlsx-import-service.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MimeTypes } from './types/MimeTypes';
import { Request, Response } from 'express';
import { SalesFunnelStepId } from '../crud/dto/sales-funnel-step-id';
import { createReadStream } from 'fs';
import path from 'path';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiBody,
    ApiConsumes,
    ApiCreatedResponse,
    ApiQuery,
    ApiResponse,
    ApiTags
} from '@nestjs/swagger';
import { CsvImportServiceService } from './services/csv-import-service/csv-import-service.service';
import { RequiredActionRights } from '../../../authorization/required-action-rights.decorator';
import { ActionRights } from '../../../../../admin-panel/src/roles/rights/action-rights';

@ApiTags('Students / Import File')
@ApiBearerAuth()
@Controller('/crm/students/import-file')
export class ImportFileController {
    constructor(
        private readonly xlsxImportService: XlsxImportServiceService,
        private readonly csvImportService: CsvImportServiceService
    ) {}

    @RequiredActionRights(ActionRights.IMPORT_STUDENTS_VIA_FILE)
    @ApiCreatedResponse({ description: 'File successfully imported' })
    @ApiBadRequestResponse({ description: 'There are errors in imported file' })
    @ApiConsumes('multipart/form-data')
    @ApiQuery({ name: 'salesFunnelStepID', type: () => String })
    @ApiBody({
        description: 'CSV or XLSX File with correct format',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    })
    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            fileFilter(
                req: Request,
                file: {
                    mimetype: string;
                },
                callback: (error: Error | null, acceptFile: boolean) => void
            ): void {
                switch (file.mimetype) {
                    case MimeTypes.XLSX:
                        callback(null, true);
                        break;
                    case MimeTypes.CSV:
                        callback(null, true);
                        break;

                    default:
                        callback(
                            new BadRequestException(
                                `File mime type must be ${MimeTypes.XLSX} or ${MimeTypes.CSV}`
                            ),
                            false
                        );
                }
            }
        })
    )
    async import(
        @Query() { salesFunnelStepID }: SalesFunnelStepId,
        @UploadedFile() file: Express.Multer.File
    ) {
        switch (file.mimetype) {
            case MimeTypes.XLSX:
                return await this.xlsxImportService.import(
                    salesFunnelStepID,
                    file
                );
                break;

            case MimeTypes.CSV:
                return await this.csvImportService.import(
                    salesFunnelStepID,
                    file
                );
                break;
        }
    }

    @RequiredActionRights(ActionRights.IMPORT_STUDENTS_VIA_FILE)
    @ApiResponse({ description: 'Template file' })
    @Get('/template')
    downloadTemplate(@Res({ passthrough: true }) response: Response) {
        const file = createReadStream(
            path.join(process.cwd(), './static/template.xlsx')
        );

        response.set({
            'Content-Type': MimeTypes.XLSX,
            'Content-Disposition': 'attachment; filename="template.xlsx"'
        });

        return new StreamableFile(file);
    }
}
