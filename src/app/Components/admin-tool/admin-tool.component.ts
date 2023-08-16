import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-tool',
  templateUrl: './admin-tool.component.html',
  styleUrls: ['./admin-tool.component.css']
})
export class AdminToolComponent {

  constructor(private route : Router){}

  ROLE:string = localStorage.getItem("role")

  on_create_user_clicked(){
    if(this.ROLE=="ROLE_ADMIN"){
      this.route.navigateByUrl("/create-user")
    }else{
      this.route.navigateByUrl("/login-form")
    }
  }

  on_list_user_clicked(){
    if(this.ROLE=="ROLE_ADMIN"){
      this.route.navigateByUrl("/list-user-form")
    }else{
      this.route.navigateByUrl("/login-form")
    }

  }

}
