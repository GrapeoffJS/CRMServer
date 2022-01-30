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
import { SalesFunnelStepID } from '../DTO/SalesFunnelStepID';
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

@ApiTags('CRM / Students / Import File')
@ApiBearerAuth()
@Controller('/crm/students/import-file')
export class ImportFileController {
    constructor(private readonly xlsxImportService: XlsxImportServiceService) {}

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
                if (file.mimetype === MimeTypes.XLSX) {
                    callback(null, true);
                } else {
                    callback(
                        new BadRequestException(
                            `File mime type must be ${MimeTypes.XLSX}`
                        ),
                        false
                    );
                }
            }
        })
    )
    async import(
        @Query() { salesFunnelStepID }: SalesFunnelStepID,
        @UploadedFile() file: Express.Multer.File
    ) {
        return await this.xlsxImportService.import(salesFunnelStepID, file);
    }

    @ApiResponse({ description: 'Template file' })
    @Get('/template')
    downloadTemplate(@Res({ passthrough: true }) response: Response) {
        const file = createReadStream(
            path.join(process.cwd(), './template-files/template.xlsx')
        );

        response.set({
            'Content-Type': MimeTypes.XLSX,
            'Content-Disposition': 'attachment; filename="template.xlsx"'
        });

        return new StreamableFile(file);
    }
}
