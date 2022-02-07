import { Expose, Transform } from 'class-transformer';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export class BaseModel extends TimeStamps {
    @Expose()
    // makes sure that when deserializing from a Mongoose Object, ObjectId is serialized into a string
    @Transform(value => {
        if ('value' in value) {
            // HACK: this is changed because of https://github.com/typestack/class-transformer/issues/879
            // return value.value.toString(); // because "toString" is also a wrapper for "toHexString"
            return value.obj[value.key].toString();
        }

        return 'unknown value';
    })
    public _id: string;

    @Expose()
    public __v: number;
}
