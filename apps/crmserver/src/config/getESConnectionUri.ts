import path from 'path';
import { config } from 'dotenv';

config({ path: path.join(__dirname, '../../', process.env.NODE_ENV + '.env') });

export default (
    host: string = process.env.ESHost,
    port: string = process.env.ESPort
) => {
    if (host && port) {
        return 'http://' + host + ':' + port + '/';
    }

    return process.env.ELASTIC_SEARCH_URI;
};
