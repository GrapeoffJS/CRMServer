import { BadRequestException, Injectable } from '@nestjs/common';
import { read, utils } from 'xlsx';
import { ReturnModelType } from '@typegoose/typegoose';
import { StudentModel } from '../../../crud/models/Student.model';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';
import { parsePhoneNumber } from 'libphonenumber-js';

@Injectable()
export class XlsxImportServiceService {
    constructor(
        @InjectModel(StudentModel)
        private readonly studentModel: ReturnModelType<typeof StudentModel>
    ) {}

    async import(salesFunnelStepID: string, file: Express.Multer.File) {
        const sheet = read(file.buffer, { type: 'buffer' });
        const students = utils
            .sheet_to_json<any>(sheet.Sheets[sheet.SheetNames[0]], {
                rawNumbers: true
            })
            .map(student => {
                const studentPhone = parsePhoneNumber(
                    `+${(student?.phone.toString() as string)?.replace(
                        /\D/g,
                        ''
                    )}`
                );

                const parentPhone = parsePhoneNumber(
                    `+${(student?.parentPhone.toString() as string)?.replace(
                        /\D/g,
                        ''
                    )}`
                );

                return {
                    ...student,
                    phone: {
                        phone: studentPhone.formatInternational(),
                        countryCode: studentPhone?.country
                    },
                    parentPhone: {
                        phone: parentPhone.formatInternational(),
                        countryCode: parentPhone?.country
                    },
                    salesFunnelStep: new Types.ObjectId(salesFunnelStepID)
                };
            });

        try {
            this.studentModel.insertMany(students);
            return;
        } catch (e) {
            throw new BadRequestException();
        }
    }
}
