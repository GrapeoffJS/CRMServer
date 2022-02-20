import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions
} from 'class-validator';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { PhoneNumber } from '../dto/create-student.dto';

export function IsCorrectPhoneNumber(validationOptions?: ValidationOptions) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsCountryCode',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return isValidPhoneNumber(
                        value,
                        (args.object as PhoneNumber).countryCode
                    );
                }
            }
        });
    };
}
