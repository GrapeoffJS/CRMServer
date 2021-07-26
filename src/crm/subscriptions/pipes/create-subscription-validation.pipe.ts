import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform
} from '@nestjs/common';
import { createSubscriptionDTO } from '../DTO/createSubscriptionDTO';

@Injectable()
export class CreateSubscriptionValidationPipe implements PipeTransform {
    transform(value: createSubscriptionDTO, metadata: ArgumentMetadata) {
        if (!value.houseCount || !value.name || !value.price) {
            throw new BadRequestException();
        }

        return value;
    }
}
