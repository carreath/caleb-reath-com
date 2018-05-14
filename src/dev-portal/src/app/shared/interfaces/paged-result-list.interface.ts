export interface PagedResultsList<T> {
    page: number;
    pageSize: number;
    totalCount: number;
    items: Array<T>;
  }
