import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
    constructor(private readonly ElasticService: ElasticsearchService) {}

    search(query: string, tutorId?: string) {
        return this.ElasticService.search({
            q: tutorId ? query + ' ' + tutorId : query,
            default_operator: 'AND'
        });
    }
}
