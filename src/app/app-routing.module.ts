import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './Components/login-form/login-form.component';
import { CreateUserFormComponent } from './Components/create-user-form/create-user-form.component';
import { TaskFormComponent } from './Components/task-form/task-form.component';
import { TaskListFormComponent } from './Components/task-list-form/task-list-form.component';
import { ListUsersComponent } from './Components/list-users/list-users.component';
import { AdminToolComponent } from './Components/admin-tool/admin-tool.component';
import { TaskToolComponent } from './Components/task-tool/task-tool.component';

const routes: Routes = [
  {path:"login-form",  component : LoginFormComponent},
  {path:"create-user", component : CreateUserFormComponent},
  {path:"create-task",component : TaskFormComponent},
  {path:"task-list-form",  component : TaskListFormComponent},
  {path:"list-user-form", component : ListUsersComponent},
  {path:"admin-tool", component: AdminToolComponent},
  {path:"task-tool", component: TaskToolComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
