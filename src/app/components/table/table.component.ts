import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { BasicButtonComponent } from '../basic-button/basic-button.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, BasicButtonComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() updateTable:Subject<any> = new Subject();
  @Input() names:any;
  @Input() data:any;
  @Output() action = new EventEmitter();

  dataSource:any;
  displayedColumns:any;
  displayedColumnsNames:any;

  ngOnInit() {
    // Update table rows acording to data
    this.updateTable.subscribe(id => {
      this.data = this.data.filter((element: any) => element.id !== id);
    });
  }

  ngOnChanges() {
    this.displayedColumns = Object.keys(this.names);
    this.displayedColumnsNames = this.names;
    this.dataSource = new MatTableDataSource(this.data);
  }

  buttonClick(action: string, element: any) {
    this.action.emit({ action, element });
  }
}
