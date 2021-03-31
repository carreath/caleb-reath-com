

import { copyPagination, emptyPagination, emptyTableData, Pagination, TableColumn, TableData } from '../interfaces';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { TableSearchService } from '../interfaces/table-search-service.interface';
import { Router } from '@angular/router';

export abstract class Table<T extends object> {
    @BlockUI('list') blockUIList: NgBlockUI;
    public tableData: TableData<T> = emptyTableData();
    public pagination: Pagination = emptyPagination();

    constructor(private readonly listService: TableSearchService<T>, private router: Router) {
    }

    // Provide children with a way of accessing the service
    protected ListService() {
      return this.listService;
    }

    protected Router() {
      return this.router;
    }

    // pagination event handler
    public paginationChanged(event: Pagination) {
      this.pagination = event;
      this.getTableData();
    }

    // Build new TableData object to get angular to update UI
    public updateTableData(items: T[], totalCount: number): void {
        this.pagination.totalCount = totalCount;
        this.tableData = {
            items: items,
            pagination: this.pagination
        };
    }

    // Must be defined in list component
    abstract getTableData(): void;
}
