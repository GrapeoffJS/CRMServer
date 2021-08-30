import csvtojson from 'csvtojson';
import moment from 'moment';
import Pupil from '../../models/Pupil.model';
import xlsx from 'xlsx';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePupilDTO } from '../../DTO/CreatePupilDTO';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class ImportFileService {
    constructor(
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>
    ) {}

    public async uploadCSV(file: Express.Multer.File) {
        const errorsOnLines: number[] = [];

        const csvString = Buffer.from(file.buffer).toString('utf-8');
        const pupils = await csvtojson({
            ignoreEmpty: true,
            maxRowLength: 9,
            delimiter: 'auto'
        }).fromString(csvString);

        for (let i = 0; i < pupils.length; i++) {
            const pupil: CreatePupilDTO = pupils[i];

            Object.keys(pupil).forEach(i => (pupil[i] = pupil[i].trim()));

            pupil.dateOfBirth = moment(
                pupil.dateOfBirth,
                'DD.MM.YYYY'
            ).toISOString();

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

    public async uploadXLSX(file: Express.Multer.File) {
        const errorsOnLines: number[] = [];

        const uploaded = Buffer.from(file.buffer);
        const sheet = xlsx.read(uploaded);

        const pupils: CreatePupilDTO[] = xlsx.utils.sheet_to_json(
            sheet.Sheets[sheet.SheetNames[0]]
        );

        for (let i = 0; i < pupils.length; i++) {
            const pupil = pupils[i];

            Object.keys(pupil).forEach(i => (pupil[i] = pupil[i].trim()));

            pupil.dateOfBirth = moment(
                pupil.dateOfBirth,
                'DD.MM.YYYY'
            ).toISOString();

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
