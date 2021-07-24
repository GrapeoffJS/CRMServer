import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform
} from '@nestjs/common';
import { CREATE_USER_ERRORS } from '../constants';
import { createCRMUserDTO } from '../DTO/createCRMUserDTO';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
    transform(value: createCRMUserDTO, metadata: ArgumentMetadata) {
        if (
            !value.login ||
            value.login.length === 0 ||
            value.login.length > 30
        ) {
            throw new BadRequestException(CREATE_USER_ERRORS.WRONG_LOGIN);
        }

        if (
            !value.password ||
            value.password.length === 0 ||
            value.password.length > 100
        ) {
            throw new BadRequestException(CREATE_USER_ERRORS.WRONG_PASSWORD);
        }

        if (!value.name || value.name.length === 0 || value.name.length > 30) {
            throw new BadRequestException(CREATE_USER_ERRORS.WRONG_NAME);
        }

        if (
            !value.surname ||
            value.surname.length === 0 ||
            value.surname.length > 30
        ) {
            throw new BadRequestException(CREATE_USER_ERRORS.WRONG_SURNAME);
        }

        if (
            !value.midname ||
            value.midname.length === 0 ||
            value.midname.length > 30
        ) {
            throw new BadRequestException(CREATE_USER_ERRORS.WRONG_MIDNAME);
        }

        if (
            value.role !== 'admin' &&
            value.role !== 'manager' &&
            value.role !== 'teacher'
        ) {
            throw new BadRequestException(CREATE_USER_ERRORS.WRONG_ROLE);
        }

        return value;
    }
}
