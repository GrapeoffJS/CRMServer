import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform
} from '@nestjs/common';
import { CREATE_PUPIL_ERRORS } from '../constants';
import { createPupilDTO } from '../DTO/createPupilDTO';

@Injectable()
export class CreatePupilValidationPipe implements PipeTransform {
    transform(value: createPupilDTO, metadata: ArgumentMetadata) {
        if (!value.name || value.name.length === 0 || value.name.length > 30) {
            throw new BadRequestException(CREATE_PUPIL_ERRORS.WRONG_NAME);
        }

        if (
            !value.surname ||
            value.surname.length === 0 ||
            value.surname.length > 30
        ) {
            throw new BadRequestException(CREATE_PUPIL_ERRORS.WRONG_SURNAME);
        }

        if (
            !value.midname ||
            value.midname.length === 0 ||
            value.midname.length > 30
        ) {
            throw new BadRequestException(CREATE_PUPIL_ERRORS.WRONG_MIDNAME);
        }

        if (!value.age) {
            throw new BadRequestException(CREATE_PUPIL_ERRORS.WRONG_AGE);
        }

        if (value.gender !== 'Мужской' && value.gender !== 'Женский') {
            throw new BadRequestException(CREATE_PUPIL_ERRORS.WRONG_GENDER);
        }

        return value;
    }
}
