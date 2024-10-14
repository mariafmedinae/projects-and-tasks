import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { TableComponent } from '../../components/table/table.component';
import { NewProjectComponent } from './../new-project/new-project.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../components/modal/modal.component';
import { Subject } from 'rxjs';
import { TasksComponent } from '../../tasks/tasks/tasks.component';
import { LoaderComponent } from "../../components/loader/loader.component";
import { AlertMessageComponent } from '../../components/alert-message/alert-message.component';
import { ApisService } from '../../services/apis.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ButtonComponent, TableComponent, NewProjectComponent, TasksComponent, LoaderComponent, AlertMessageComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent { 
  updateTable: Subject<any> = new Subject();

  isCreateProject = false;
  isViewTasks = false;

  projects:any;
  loadingProjects = false;
  errorProjects = false;
  
  deleteAlert = false;
  alertText = '';
  alertClass = '';

  project:any;

  // Table columns
  tableNames = {
    id: 'Id',
    name: "Proyecto",
    username: "Descripción",
    view: "Ver tarea",
    delete: "Eliminar",
  };

  constructor(
    private apisService: ApisService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadingProjects = true;
    this.apisService.getProjects().subscribe(
      (data) => {        
        this.projects = data;
        this.loadingProjects = false;
      },
      (error) => {
        this.loadingProjects = false;
        this.errorProjects = true;
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
          let index = this.projects.findIndex((element: { id: any; }) => element.id === result.id);
          this.projects.splice(index, 1);
          this.updateTable.next(result.id);
          this.deleteAlert = true;
          this.alertText = 'Proyecto eliminado con éxito';
          this.alertClass = 'alert-success floating-alert';
        } else if(result === 'error') {
          this.deleteAlert = true;
          this.alertText = 'Se presentó un error. Vuelva a intentarlo';
          this.alertClass = 'alert-danger floating-alert';
        }
        setTimeout(() => {this.deleteAlert = false;}, 3000);
      })
    } else if(event.action === 'view') {
      this.isViewTasks = true;
      this.project = event.element;
    }
  }

  // Opens new project component
  addProject() {
    this.isCreateProject = true;
  }

  saveProject(event: any) {
    let lastId = 1;
    if(this.projects.length > 0) lastId = this.projects.at(-1).id + 1;
    event.id = lastId;
    this.projects.push(event);
  }

  closeForm() {
    this.isCreateProject = false;
  }

  closeTasksview() {
    this.isViewTasks = false;
  }
}