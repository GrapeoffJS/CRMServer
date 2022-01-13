import csvtojson from 'csvtojson';
import moment from 'moment';
import Pupil from '../../models/Pupil.model';
import xlsx from 'xlsx';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePupilDTO } from '../../DTO/CreatePupilDTO';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { SalesFunnelStep } from '../../../../../../admin-panel/src/sales-funnel/models/SalesFunnelStep.model';

@Injectable()
export class ImportFileService {
    constructor(
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>,
        @InjectModel(SalesFunnelStep)
        private readonly SalesFunnelStepModel: ReturnModelType<
            typeof SalesFunnelStep
        >
    ) {}

    async uploadCSV(file: Express.Multer.File) {
        const errorsOnLines: number[] = [];
        const salesFunnelStep = await this.SalesFunnelStepModel.findOne({
            order: 1
        });

        const csvString = Buffer.from(file.buffer).toString('utf-8');
        const pupils = await csvtojson({
            ignoreEmpty: true,
            maxRowLength: 9,
            delimiter: 'auto'
        }).fromString(csvString);

        for (let i = 0; i < pupils.length; i++) {
            const pupil: CreatePupilDTO = pupils[i];

            pupil.dateOfBirth = moment(
                pupil.dateOfBirth,
                'DD.MM.YYYY'
            ).toISOString();

            pupil.salesFunnelStep = salesFunnelStep?.id;

            try {
                await this.PupilModel.validate(pupil);
            } catch (err) {
                errorsOnLines.push(i + 2);
            }
        }

        if (errorsOnLines.length !== 0) {
            throw new BadRequestException(errorsOnLines);
        }

        for (const pupil of pupils) {
            await this.PupilModel.create(pupil);
        }

        return;
    }

    async uploadXLSX(file: Express.Multer.File) {
        const errorsOnLines: number[] = [];
        const salesFunnelStep = await this.SalesFunnelStepModel.findOne({
            order: 1
        });

        const uploaded = Buffer.from(file.buffer);
        const sheet = xlsx.read(uploaded);

        const pupils: CreatePupilDTO[] = xlsx.utils.sheet_to_json(
            sheet.Sheets[sheet.SheetNames[0]]
        );

        for (let i = 0; i < pupils.length; i++) {
            const pupil = pupils[i];

            pupil.dateOfBirth = moment(
                pupil.dateOfBirth,
                'DD.MM.YYYY'
            ).toISOString();

            pupil.salesFunnelStep = salesFunnelStep.id;

            try {
                await this.PupilModel.validate(pupil);
            } catch (err) {
                errorsOnLines.push(i + 2);
            }
        }

        if (errorsOnLines.length !== 0) {
            throw new BadRequestException(errorsOnLines);
        }

        for (const pupil of pupils) {
            await this.PupilModel.create(pupil);
        }

        return 'SUCCESS';
    }
}
