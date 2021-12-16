const dotenv = require('dotenv');

dotenv.config();

const config = {
    mongodb: {
        url: `${process.env.MONGO_CONNECTION_PROTOCOL}://${
            process.env.MONGO_INITDB_ROOT_USERNAME
        }:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}${
            process.env.MONGO_PORT || ''
        }/${process.env.MONGO_DEFAULTDB}${process.env.MONGO_CONNECTION_PARAMS}`,
        databaseName: 'CRM',

        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },

    // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
    migrationsDir: 'migrations',

    // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
    changelogCollectionName: 'changelog',

    // The file extension to create migrations and search for in migration dir
    migrationFileExtension: '.js',

    // Enable the algorithm to create a checksum of the file contents and use that in the comparison to determin
    // if the file should be run.  Requires that scripts are coded to be run multiple times.
    useFileHash: false
};

// Return the config as a promise
module.exports = config;
