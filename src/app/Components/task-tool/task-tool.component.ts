import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-tool',
  templateUrl: './task-tool.component.html',
  styleUrls: ['./task-tool.component.css']
})
export class TaskToolComponent {

  ROLE:string=localStorage.getItem("role")

  constructor(private route: Router){}

  on_create_task_clicked(){
    if(this.ROLE=="ROLE_CREATOR"){
      this.route.navigateByUrl("/create-task")
    }else{
      this.route.navigateByUrl("/login-form")
    }
  }

  on_task_list_clicked(){
    if(this.ROLE=="ROLE_CREATOR" || this.ROLE=="ROLE_OWNER"){
      this.route.navigateByUrl("/task-list-form")
    }else{
      this.route.navigateByUrl("/login-form")
    }
  }

}
