import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearcherService {
    constructor(private readonly esService: ElasticsearchService) {}

    async search(
        limit: number,
        offset: number,
        indices: string[],
        query_string: string
    ) {
        return this.esService.search({
            index: indices,
            default_operator: 'AND',
            q: query_string
                .split(' ')
                .map(keyword => `*${keyword}*`)
                .join(' '),
            body: {
                sort: ['_score'],
                from: offset,
                size: limit,
                aggs: {
                    types: {
                        terms: {
                            field: 'type'
                        }
                    }
                }
            }
        });
    }
}
