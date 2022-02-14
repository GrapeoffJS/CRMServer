module.exports = {
    apps: [
        {
            name: 'CRM',
            script: './dist/apps/crm/main.js',
            instances: 'max',
            exec_mode: 'cluster'
        },
        {
            name: 'Admin Panel',
            script: './dist/apps/admin-panel/main.js',
            instances: '1',
            exec_mode: 'cluster'
        }]
};
