import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class SearcherInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(searchResult => ({
                docs: {
                    students: searchResult.body.hits.hits.filter(
                        student => student._index === 'students'
                    ),
                    groups: searchResult.body.hits.hits.filter(
                        student => student._index === 'groups'
                    ),
                    crmusers: searchResult.body.hits.hits.filter(
                        student => student._index === 'crmusers'
                    )
                },
                count: searchResult.body.hits.total.value
            }))
        );
    }
}
