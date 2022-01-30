import { BadRequestException, Injectable } from '@nestjs/common';
import { read, utils } from 'xlsx';
import { ReturnModelType } from '@typegoose/typegoose';
import { StudentModel } from '../../../models/Student.model';
import { InjectModel } from 'nestjs-typegoose';
import { Types } from 'mongoose';

@Injectable()
export class XlsxImportServiceService {
    constructor(
        @InjectModel(StudentModel)
        private readonly studentModel: ReturnModelType<typeof StudentModel>
    ) {}

    async import(salesFunnelStep: string, file: Express.Multer.File) {
        const sheet = read(file.buffer, { type: 'buffer' });
        const students: StudentModel[] = utils
            .sheet_to_json<StudentModel>(sheet.Sheets[sheet.SheetNames[0]], {
                rawNumbers: true
            })
            .map(student => ({
                ...student,
                phone: student.phone.toString(),
                parentPhone: student.parentPhone.toString(),
                salesFunnelStep: new Types.ObjectId(salesFunnelStep)
            }));

        try {
            this.studentModel.insertMany(students);
            return;
        } catch (e) {
            throw new BadRequestException();
        }
    }
}
