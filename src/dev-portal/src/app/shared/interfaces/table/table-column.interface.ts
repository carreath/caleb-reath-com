import { ColumnRender } from "../../types/column-render.type";

export interface TableColumn {
    column: string;
    column_classes?: string;
    header: string;
    header_classes?: string;
    column_type: string;
    rendered_link_href?: string;
    link_href_renderer?: ColumnRender;
    component_name?: string;
    renders: ColumnRender[];
    rendered_data?: string;
}

export function defaultRender(data: any): string {
    if (data !== null && data !== undefined) {
      return data;
    } else {
      return "-";
    }
}

export function emptyTableColumn(): TableColumn {
    return {
        column: '',
        header: '',
        column_type: '',
        renders: [defaultRender]
    };
}
