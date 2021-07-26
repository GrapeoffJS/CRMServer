export default (
    host: string = process.env.ESHost,
    port: string = process.env.ESPort
) => {
    return 'http://' + host + ':' + port + '/';
};
