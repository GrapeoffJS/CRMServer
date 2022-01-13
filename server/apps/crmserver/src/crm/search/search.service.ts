import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
    constructor(private readonly ElasticService: ElasticsearchService) {}

    search(query: string, tutorId?: string) {
        const correctedQuery = SearchService.getCorrectedQuery(query);

        return this.ElasticService.search({
            index: ['pupils', 'groups'],
            q: tutorId ? correctedQuery + ' ' + tutorId : correctedQuery,
            default_operator: 'AND'
        });
    }

    searchCRMUsers(query: string) {
        const correctedQuery = SearchService.getCorrectedQuery(query);

        return this.ElasticService.search({
            index: 'crmusers',
            q: correctedQuery,
            default_operator: 'AND'
        });
    }

    private static getCorrectedQuery(query: string) {
        return query
            .split(' ')
            .map(item => `*${item.toString()}*`)
            .join(' ');
    }
}
