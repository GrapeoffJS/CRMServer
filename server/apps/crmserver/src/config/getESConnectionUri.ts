export default (
    protocol: string,
    username: string,
    password: string,
    host: string,
    port: string
) => {
    return `${protocol}://${username}:${password}@${host}:${port}`;
};
