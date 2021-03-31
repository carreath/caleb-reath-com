import { Pagination, emptyPagination } from "./table-pagination.interface";
import { TableColumn } from "./table-column.interface";
import { emptyTableColumn } from "..";

export interface TableData<T extends object> {
    items: T[];
    pagination: Pagination;
}

export function emptyTableData<T extends object>(): TableData<T> {
    return {
        items: [],
        pagination: emptyPagination()
    };
}
