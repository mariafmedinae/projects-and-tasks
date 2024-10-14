import { Routes } from '@angular/router';
import { loginGuard } from './login/guard/login.guard';
import { LoginComponent } from './login/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects/projects.component';
import { TasksComponent } from './tasks/tasks/tasks.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    { 
        path: 'login', 
        component: LoginComponent
    },
    { 
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [loginGuard],
        children: [
            {
                path: '',
                component: ProjectsComponent
            },
        ]
    },
];
