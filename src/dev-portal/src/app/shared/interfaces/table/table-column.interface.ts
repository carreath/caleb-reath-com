import { ColumnRender } from "../../types/column-render.type";

export interface TableColumn {
    column: string;
    column_classes?: string;
    header: string;
    header_classes?: string;
    column_type: string;
    link_href?: string;
    link_href_renderer?: ColumnRender;
    renders: ColumnRender[];
}

export function defaultRender(data: any): string {
    return data;
}

export function emptyTableColumn(): TableColumn {
    return {
        column: '',
        header: '',
        column_type: '',
        renders: [defaultRender]
    };
}
