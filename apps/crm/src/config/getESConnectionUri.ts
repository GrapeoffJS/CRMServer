export default (protocol: string, host: string, port: string) => {
    return `${protocol}://${host}:${port}`;
};
