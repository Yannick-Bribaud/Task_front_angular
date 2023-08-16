import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './Components/login-form/login-form.component';
import { CreateUserFormComponent } from './Components/create-user-form/create-user-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderInterceptor } from './services/header.interceptor';
import { TaskFormComponent} from './Components/task-form/task-form.component';
import { TaskListFormComponent } from './Components/task-list-form/task-list-form.component';
import { ListUsersComponent } from './Components/list-users/list-users.component';
import { AdminToolComponent } from './Components/admin-tool/admin-tool.component';
import { TaskToolComponent } from './Components/task-tool/task-tool.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    CreateUserFormComponent,
    TaskFormComponent,
    TaskListFormComponent,
    ListUsersComponent,
    AdminToolComponent,
    TaskToolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS,useClass: HeaderInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
