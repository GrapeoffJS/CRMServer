import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
    constructor(private readonly ElasticService: ElasticsearchService) {}

    public search(query: string, tutorId?: string) {
        const correctedQuery = query
            .split(' ')
            .map(item => `*${item.toString()}*`)
            .join(' ');

        return this.ElasticService.search({
            q: tutorId ? correctedQuery + ' ' + tutorId : correctedQuery,
            default_operator: 'AND'
        });
    }

    // TODO: Search CRM Users
    public searchInCRMUsers() {}
}
