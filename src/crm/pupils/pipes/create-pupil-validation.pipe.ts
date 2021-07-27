import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform
} from '@nestjs/common';
import { createPupilDTO } from '../DTO/createPupilDTO';
import { Genders } from '../models/Genders';

@Injectable()
export class CreatePupilValidationPipe implements PipeTransform {
    transform(value: createPupilDTO, metadata: ArgumentMetadata) {
        // if (
        //     !value.name ||
        //     !value.surname ||
        //     !value.midname ||
        //     !value.age ||
        //     !value.gender
        // ) {
        //     throw new BadRequestException();
        // }

        // if (value.gender !== Genders.Male && value.gender !== Genders.Female)
        //     throw new BadRequestException();

        return value;
    }
}
