module.exports = {
    apps: {
        name: 'CRMServer',
        script: './dist/apps/crmserver/main.js',
        instances: 'max',
        exec_mode: 'cluster'
    }
};
