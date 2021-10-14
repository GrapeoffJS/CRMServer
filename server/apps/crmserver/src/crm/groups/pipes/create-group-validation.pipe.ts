import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { CreateGroupDTO } from '../DTO/CreateGroupDTO';

@Injectable()
export class CreateGroupValidationPipe implements PipeTransform {
    transform(
        value: CreateGroupDTO,
        metadata: ArgumentMetadata
    ): CreateGroupDTO {
        if (value?.pupils?.length > value.places)
            throw new BadRequestException();

        if (!value.tutor) value.tutor = null;

        return value;
    }
}
