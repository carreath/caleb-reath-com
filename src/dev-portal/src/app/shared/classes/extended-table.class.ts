
import {
  copyFilterQuery,
  copySearchQuery,
  emptyFilterQuery,
  emptySearchQuery,
  FilterQuery,
  SearchQuery,
  emptyPagination,
} from '../interfaces';
import { Table } from './table.class';
import { TableSearchService } from '../interfaces/table-search-service.interface';
import { Router } from '@angular/router';

export abstract class ExtendedTable<T extends object> extends Table<T> {
    // Query objects for searching and filtering
    public searchQuery: SearchQuery = emptySearchQuery();
    public filterQuery: FilterQuery = emptyFilterQuery();

    constructor(listService: TableSearchService<T>, router: Router) {
      super(listService, router);
    }

    // Search event handler
    // Resets pagination and gets new table data
    public searchEventHandler(searchQuery): void {
      this.pagination = emptyPagination();
      this.searchQuery = copySearchQuery(searchQuery);
      this.getTableData();
    }

    // Filter event handler
    // Gets new table data
    public filterEventHandler(filterEvent): void {
      this.filterQuery = copyFilterQuery(filterEvent);
      this.getTableData();
    }
}
