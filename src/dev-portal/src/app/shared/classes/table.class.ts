import { TableData, TableColumn, emptyTableData } from "../interfaces";

interface ITable {
    tableData: TableData;
    page: number;
    pageSize: number;
    tableColumns: TableColumn[];
    updateTableData: (items: {}[], totalCount: number) => void;
    getTableData: () => void;
}

export abstract class Table implements ITable {
    public tableData: TableData = emptyTableData();
    public page = 1;
    public pageSize = 20;
    abstract tableColumns: TableColumn[];

    public updateTableData(items: {}[], totalCount: number): void {
        this.tableData = {
            items: items,
            tableColumns: this.tableColumns,
            pagination: {
                page: this.page,
                pageSize: this.pageSize,
                totalCount: totalCount
            }
        };
    }

    abstract getTableData(): void;
}
