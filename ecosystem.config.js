module.exports = {
    apps: {
        name: 'CRMServer',
        script: './dist/apps/crm/main.js',
        instances: 'max',
        exec_mode: 'cluster'
    }
};
