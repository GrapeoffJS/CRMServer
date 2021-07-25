import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform
} from '@nestjs/common';
import { createGroupDTO } from '../DTO/createGroupDTO';

@Injectable()
export class CreateGroupValidationPipe implements PipeTransform {
    transform(
        value: createGroupDTO,
        metadata: ArgumentMetadata
    ): createGroupDTO {
        if (!value.GROUP_NAME || !value.LEVEL || !value.PLACES) {
            throw new BadRequestException();
        }

        if (!value.PUPILS) {
            value.PUPILS = [];
        }

        if (value.PLACES < value.PUPILS.length) {
            throw new BadRequestException();
        }

        if (!value.TUTOR) {
            value.TUTOR = null;
        }

        return value;
    }
}
