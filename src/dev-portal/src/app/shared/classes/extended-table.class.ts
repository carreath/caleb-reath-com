import { Table } from "./table.class";
import { FilterQuery, SearchQuery } from "../interfaces";

export abstract class ExtendedTable extends Table {
    public searchQuery: SearchQuery;
    public filterQuery: FilterQuery;

    public searchEventHandler(searchEvent): void {

    }

    public filterChangedEventHandler(filterChangedEvent) {

    }

    public filterEventHandler(filterEvent): void {

    }
}