import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform
} from '@nestjs/common';
import { CreateGroupDTO } from '../DTO/CreateGroupDTO';

@Injectable()
export class CreateGroupValidationPipe implements PipeTransform {
    transform(
        value: CreateGroupDTO,
        metadata: ArgumentMetadata
    ): CreateGroupDTO {
        if (value?.PUPILS?.length > value.PLACES)
            throw new BadRequestException();

        if (!value.TUTOR) value.TUTOR = null;

        return value;
    }
}
