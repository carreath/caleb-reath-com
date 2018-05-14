import { Observable } from 'rxjs/Observable';
import { SearchQuery, FilterQuery, Pagination } from '../interfaces';
import { PagedResultsList } from './paged-result-list.interface';

export interface TableSearchService<T extends object> {
  getFilteredList(pagination: Pagination, filter: FilterQuery, search: SearchQuery): Observable<PagedResultsList<T>>;
}
