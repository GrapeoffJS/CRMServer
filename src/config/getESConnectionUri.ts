export default (host: string = 'localhost', port: number = 9200) => {
    return 'http://' + host + ':' + port + '/';
};
