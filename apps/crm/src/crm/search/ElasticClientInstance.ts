import { Client, ClientOptions } from '@elastic/elasticsearch';

export class ElasticClientInstance {
    private static _instance: ElasticClientInstance;
    private _client: Client;

    get client() {
        return this._client;
    }

    private constructor() {}

    static getInstance(): ElasticClientInstance {
        if (!ElasticClientInstance._instance) {
            ElasticClientInstance._instance = new ElasticClientInstance();
            return ElasticClientInstance._instance;
        }

        return ElasticClientInstance._instance;
    }

    async connect(connectionOptions: ClientOptions) {
        this._client = new Client(connectionOptions);
    }
}
