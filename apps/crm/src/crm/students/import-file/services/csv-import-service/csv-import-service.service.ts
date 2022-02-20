import { BadRequestException, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import csvtojson from 'csvtojson';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { Types } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';

import { StudentModel } from '../../../crud/models/student.model';

@Injectable()
export class CsvImportServiceService {
    constructor(
        @InjectModel(StudentModel)
        private readonly studentModel: ReturnModelType<typeof StudentModel>
    ) {}

    async import(salesFunnelStepID: string, file: Express.Multer.File) {
        const students: StudentModel[] = [];
        let err = null;

        csvtojson({ delimiter: [';', ','] }, { encoding: 'utf-8' })
            .fromString(file.buffer.toString('utf-8'))
            .subscribe(
                data => {
                    const studentPhone = parsePhoneNumberFromString(
                        `+${(data?.phone?.toString() as string)?.replace(
                            /\D/g,
                            ''
                        )}`
                    );

                    const parentPhone = parsePhoneNumberFromString(
                        `+${(data?.parentPhone?.toString() as string)?.replace(
                            /\D/g,
                            ''
                        )}`
                    );

                    students.push({
                        ...data,
                        phone: {
                            phone: studentPhone?.formatInternational(),
                            countryCode: studentPhone?.country
                        },
                        parentPhone: {
                            phone: parentPhone?.formatInternational(),
                            countryCode: parentPhone?.country
                        },
                        salesFunnelStep: new Types.ObjectId(salesFunnelStepID)
                    });
                },
                null,
                async () => {
                    try {
                        await this.studentModel.insertMany(students);
                    } catch (e) {
                        err = new BadRequestException();
                    }
                }
            );

        if (err) {
            throw err;
        }
    }
}
