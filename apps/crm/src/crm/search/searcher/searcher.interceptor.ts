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
                docs: searchResult.body.hits.hits,
                count: searchResult.body.hits.total.value
            }))
        );
    }
}
