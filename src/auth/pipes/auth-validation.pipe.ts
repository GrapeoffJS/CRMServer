import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform
} from '@nestjs/common';
import { authDTO } from '../DTO/authDTO';

@Injectable()
export class AuthValidationPipe implements PipeTransform {
    transform(value: authDTO, metadata: ArgumentMetadata) {
        if (!value.login || !value.password) {
            throw new BadRequestException();
        }

        return value;
    }
}
