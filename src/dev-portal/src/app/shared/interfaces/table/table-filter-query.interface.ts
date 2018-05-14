export interface FilterQuery {
    filterParameters: string[];
    sortingValue: string;
}

export function emptyFilterQuery(): FilterQuery {
  return {
    filterParameters: [],
    sortingValue: 'familyname_asc'
  };
}

export function copyFilterQuery(otherQuery: FilterQuery): FilterQuery {
  return {
    filterParameters: otherQuery.filterParameters,
    sortingValue: otherQuery.sortingValue
  };
}
