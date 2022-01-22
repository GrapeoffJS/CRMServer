import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class IndexerService {
    constructor(private readonly esService: ElasticsearchService) {}

    async createDoc(id: string, data: any, index: string) {
        try {
            await this.esService.index({ index, id, body: data });
        } catch (e) {}
    }

    async updateDoc(id: string, data: any, index: string) {
        try {
            await this.esService.update({ id, index, body: data });
        } catch (e) {}
    }

    async deleteDoc(id: string, index: string) {
        await this.esService.delete({ id, index });
    }
}
