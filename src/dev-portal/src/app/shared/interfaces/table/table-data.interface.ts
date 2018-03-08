import { Pagination, emptyPagination } from "./table-pagination.interface";
import { TableColumn } from "./table-column.interface";
import { emptyTableColumn } from "..";

export interface TableData {
    items: {}[];
    tableColumns: TableColumn[];
    pagination: Pagination;
}

export function emptyTableData(): TableData {
    return {
        items: [],
        tableColumns: [],
        pagination: emptyPagination()
    };
}
