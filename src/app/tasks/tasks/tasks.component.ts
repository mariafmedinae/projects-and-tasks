import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderComponent } from '../../components/loader/loader.component';
import { AlertMessageComponent } from '../../components/alert-message/alert-message.component';
import { ButtonComponent } from '../../components/button/button.component';
import { TableComponent } from '../../components/table/table.component';
import { NewTaskComponent } from '../new-task/new-task.component';
import { ApisService } from '../../services/apis.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [LoaderComponent, AlertMessageComponent, ButtonComponent, TableComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  updateTable: Subject<any> = new Subject();
  @Input() project:any;
  @Output() closeTasks = new EventEmitter();

  isCreateTask = false;

  tasks:any;
  loadingTasks = false;
  errorTasks = false;
  
  deleteAlert = false;
  alertText = '';
  alertClass = '';

  // Table columns
  tableNames = {
    id: 'Id',
    title: "Tarea",
    completed: "Completada",
    delete: "Eliminar",
  };

  constructor(
    private apisService: ApisService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadingTasks = true;
    this.apisService.getTasks().subscribe(
      (data) => {                
        this.tasks = data;
        this.tasks = this.tasks.filter((element: { userId: any; }) => element.userId === this.project.id);
        this.loadingTasks = false;
      },
      (error) => {
        this.loadingTasks = false;
        this.errorTasks = true;
      }
    );
  }

  tableActions(event: any) {
    if(event.action === 'delete') {
      let dialogRef = this.dialog.open(ModalComponent, {
        data: event.element
      });

      dialogRef.afterClosed().subscribe((result) => {
        if(result !== 'error' && result !== 'close') {          
          let index = this.tasks.findIndex((element: { id: any; }) => element.id === result.id);
          this.tasks.splice(index, 1);
          this.updateTable.next(result.id);
          this.deleteAlert = true;
          this.alertText = 'Tarea eliminada con éxito';
          this.alertClass = 'alert-success floating-alert';
        } else if(result === 'error') {
          this.deleteAlert = true;
          this.alertText = 'Se presentó un error. Vuelva a intentarlo';
          this.alertClass = 'alert-danger floating-alert';
        }
        setTimeout(() => {this.deleteAlert = false;}, 3000);
      })
    }
  }

  addTask() {
    this.isCreateTask = true;
  }

  closeForm() {
    this.isCreateTask = false;
  }

  saveTask(event: any) {
    let lastId = 1;
    if(this.tasks.length > 0) lastId = this.tasks.at(-1).id + 1;
    event.id = lastId;
    this.tasks.push(event);
  }

  goBackToProjects() {
    this.closeTasks.emit();
  }
}
