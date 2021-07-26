import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform
} from '@nestjs/common';
import { createCRMUserDTO } from '../DTO/createCRMUserDTO';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
    transform(value: createCRMUserDTO, metadata: ArgumentMetadata) {
        if (
            !value.login ||
            !value.password ||
            !value.name ||
            !value.surname ||
            !value.midname ||
            !value.role
        ) {
	    throw new BadRequestException();
	}

	return value;
    }

}
