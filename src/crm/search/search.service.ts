import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
    constructor(private readonly ElasticService: ElasticsearchService) {}

    public search(query: string, tutorId?: string) {
        return this.ElasticService.search({
            q: tutorId ? query + ' ' + tutorId : query,
            default_operator: 'AND'
        });
    }
}
