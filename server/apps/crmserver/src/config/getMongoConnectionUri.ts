export default (
    protocol: string,
    host: string,
    port = '',
    username: string,
    password: string,
    defaultdb: string,
    connectionParams: string
) => {
    return `${protocol}://${username}:${password}@${host}${port}/${defaultdb}${connectionParams}`;
};
