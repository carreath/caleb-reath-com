export interface SearchQuery {
    searchParameters: string[];
    selectedColumn: string;
}

export function emptySearchQuery(): SearchQuery {
  return {
    searchParameters: [],
    selectedColumn: "all"
  };
}

export function copySearchQuery(otherQuery: SearchQuery): SearchQuery {
  return {
    searchParameters: otherQuery.searchParameters,
    selectedColumn: otherQuery.selectedColumn
  };
}
