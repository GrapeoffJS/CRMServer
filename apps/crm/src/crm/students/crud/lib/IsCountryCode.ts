import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions
} from 'class-validator';
import { getCountries } from 'libphonenumber-js';

export function IsCountryCode(validationOptions?: ValidationOptions) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsCountryCode',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return getCountries().includes(value);
                }
            }
        });
    };
}
