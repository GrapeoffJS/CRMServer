import path from 'path';
import { config } from 'dotenv';

config({ path: path.join(__dirname, '../../', process.env.NODE_ENV + '.env') });

export default (
    host: string = process.env.ESHost,
    port: string = process.env.ESPort
) => {
    return 'http://' + host + ':' + port + '/';
};