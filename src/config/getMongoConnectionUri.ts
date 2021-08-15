import path from 'path';
import { config } from 'dotenv';

config({ path: path.join(__dirname, '../../', process.env.NODE_ENV + '.env') });

export default (
    host: string = process.env.MONGO_HOST,
    port: string = process.env.MONGO_PORT,
    defaultdb: string = process.env.MONGO_DEFAULTDB
) => {
    if (!host || !port || !defaultdb) return null;
    if (process.env.NODE_ENV !== 'development') {
        return 'mongodb://' + host + ':' + port + '/' + defaultdb;
    }
};
