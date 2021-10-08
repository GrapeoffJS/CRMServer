import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
    constructor(private readonly ElasticService: ElasticsearchService) {}

    public search(query: string, tutorId?: string) {
        const correctedQuery = this.getCorrectedQuery(query);

        return this.ElasticService.search({
            index: ['pupils', 'groups'],
            q: tutorId ? correctedQuery + ' ' + tutorId : correctedQuery,
            default_operator: 'AND'
        });
    }

    public searchCRMUsers(query: string) {
        const correctedQuery = this.getCorrectedQuery(query);

        return this.ElasticService.search({
            index: 'crmusers',
            q: correctedQuery,
            default_operator: 'AND'
        });
    }

    private getCorrectedQuery(query: string) {
        return query
            .split(' ')
            .map(item => `*${item.toString()}*`)
            .join(' ');
    }
}
