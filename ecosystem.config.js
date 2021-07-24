module.exports = {
  apps: {
    name: 'CRMServer',
    script: './dist/main.js',
    instances: 'max',
    exec_mode: 'cluster'
  }
};
