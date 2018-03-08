import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableData, TableColumn, emptyTableData } from '../../interfaces';
import { ColumnRender } from '../../types/column-render.type';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() tableData: TableData = emptyTableData();
  @Output() linkClickEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  public linkClicked(href: string) {
    this.linkClickEvent.emit(href);
  }

  private call_renders(data, renders: ColumnRender[]) {
    let result = data;

    renders.forEach(render => {
      result = render(data, result);
      if (typeof(data) === 'object') {
        data.renderResult = result;
      }
    });

    return result;
  }

  public render(row, column: TableColumn, renderFunction: ColumnRender) {
    let renderedData = "";
    let data = row;

    if (row) {
      if (column.column) {
        if (row[column.column] !== null) {
          data = row[column.column];
        } else {
          return renderedData;
        }
      }

      if (renderFunction) {
        renderedData = renderFunction(data);
      } else {
        renderedData = this.call_renders(data, column.renders);
      }
    }

    return renderedData;
  }

}
