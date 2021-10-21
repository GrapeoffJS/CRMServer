export default (
    protocol: string = process.env.ELASTIC_SEARCH_PROTOCOL,
    host: string = process.env.ELASTIC_SEARCH_HOST,
    port: string = process.env.ELASTIC_SEARCH_PORT
) => {
    return `${protocol}://@${host}:${port}`;
};
