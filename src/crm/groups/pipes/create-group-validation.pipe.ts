import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { createGroupDTO } from '../DTO/createGroupDTO';

@Injectable()
export class CreateGroupValidationPipe implements PipeTransform {
    transform(
        value: createGroupDTO,
        metadata: ArgumentMetadata
    ): createGroupDTO {
        if (!isValidObjectId(value.TUTOR) && value.TUTOR !== null) {
            throw new BadRequestException();
        }

        if (value?.PUPILS?.length > value.PLACES)
            throw new BadRequestException();

        if (!value.TUTOR) value.TUTOR = null;

        value?.PUPILS?.forEach(id => {
            if (!isValidObjectId(id)) throw new BadRequestException();
        });

        return value;
    }
}
