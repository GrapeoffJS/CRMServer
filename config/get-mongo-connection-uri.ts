export const getMongoConnectionUri = (
    protocol: string,
    host: string,
    port = '',
    defaultdb: string,
    connectionParams = ''
) => {
    return `${protocol}://${host}${port}/${defaultdb}${connectionParams}`;
};
