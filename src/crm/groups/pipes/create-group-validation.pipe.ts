import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform
} from '@nestjs/common';
import { CREATE_GROUP_ERRORS } from '../constants';
import { createGroupDTO } from '../DTO/createGroupDTO';

@Injectable()
export class CreateGroupValidationPipe implements PipeTransform {
    transform(
        value: createGroupDTO,
        metadata: ArgumentMetadata
    ): createGroupDTO {
        if (
            !value.GROUP_NAME ||
            value.GROUP_NAME.length === 0 ||
            value.GROUP_NAME.length > 80
        ) {
            throw new BadRequestException(CREATE_GROUP_ERRORS.WRONG_GROUP_NAME);
        }

        if (!value.LEVEL || typeof value.LEVEL !== 'number') {
            throw new BadRequestException(CREATE_GROUP_ERRORS.WRONG_LEVEL);
        }

        if (!value.PLACES || typeof value.PLACES !== 'number') {
            throw new BadRequestException(CREATE_GROUP_ERRORS.WRONG_PLACES);
        }

        if (!value.TUTOR || value.TUTOR === '') {
            value.TUTOR = null;
        }

        if (!value.PUPILS || typeof value.PUPILS !== 'object') {
            value.PUPILS = [];
        }

        return value;
    }
}
