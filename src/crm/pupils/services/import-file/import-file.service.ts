import csvtojson from 'csvtojson';
import moment from 'moment';
import Pupil from '../../models/Pupil.model';
import xlsx from 'xlsx';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePupilDTO } from '../../DTO/CreatePupilDTO';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { SearchIndexerService } from '../../../../search-indexer/search-indexer.service';

@Injectable()
export class ImportFileService {
    constructor(
        @InjectModel(Pupil)
        private readonly PupilModel: ReturnModelType<typeof Pupil>,
        private readonly searchIndexer: SearchIndexerService
    ) {}

    async uploadCSV(file: Express.Multer.File) {
        const errorsOnLines: number[] = [];

        const csvString = Buffer.from(file.buffer).toString('utf-8');
        const pupils = await csvtojson({
            ignoreEmpty: true,
            maxRowLength: 9,
            delimiter: 'auto'
        }).fromString(csvString);

        for (let i = 0; i < pupils.length; i++) {
            const pupil: CreatePupilDTO = pupils[i];

            Object.keys(pupil).map(i => (pupil[i] = pupil[i].trim()));

            pupil.age = moment(pupil.age, 'DD.MM.YYYY').toISOString();

            try {
                await this.PupilModel.validate(pupil);
            } catch (err) {
                errorsOnLines.push(i + 2);
            }
        }

        if (errorsOnLines.length !== 0) {
            throw new BadRequestException(errorsOnLines);
        }

        pupils.forEach(async pupil => {
            const created = await this.PupilModel.create(pupil);
            await this.searchIndexer.createPupilIndex(created);
        });

        return;
    }

    async uploadXLSX(file: Express.Multer.File, sheetName: string) {
        const errorsOnLines: number[] = [];

        const uploaded = Buffer.from(file.buffer);
        const sheet = xlsx.read(uploaded);

        const pupils: CreatePupilDTO[] = xlsx.utils.sheet_to_json(
            sheet.Sheets[sheetName]
        );

        for (let i = 0; i < pupils.length; i++) {
            const pupil = pupils[i];

            Object.keys(pupil).map(i => (pupil[i] = pupil[i].trim()));

            pupil.age = moment(pupil.age, 'DD.MM.YYYY').toISOString();

            try {
                await this.PupilModel.validate(pupil);
            } catch (err) {
                errorsOnLines.push(i + 2);
            }
        }

        if (errorsOnLines.length !== 0) {
            throw new BadRequestException(errorsOnLines);
        }

        pupils.forEach(async pupil => {
            const created = await this.PupilModel.create(pupil);
            await this.searchIndexer.createPupilIndex(created);
        });

        return;
    }
}
