import { ConnectionOptions } from 'mongoose';

export default {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
} as ConnectionOptions;
