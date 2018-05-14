export interface Pagination {
    page: number;
    pageSize: number;
    totalCount: number;
}

export function emptyPagination(): Pagination {
    return {
        page: 1,
        pageSize: 20,
        totalCount: 0
    };
}

export function copyPagination(other: Pagination): Pagination {
  return {
    page: other.page,
    pageSize: other.pageSize,
    totalCount: other.totalCount
  };
}
