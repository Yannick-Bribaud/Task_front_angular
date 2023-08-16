import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/services/roles.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  
list_users:any=[]
list_user_role:String[]=[]
actionVisible:boolean=false
user_id:any
user_authority:any
messageError:string=null


constructor(private userServices : UsersService, private roleService : RolesService,private dataService: ShareDataService,private route : Router){}

ngOnInit(): void {
  this.fetch_users()
  this.fetch_role_by_users()
  this.dataService.change_user_id(0)
}


fetch_users(){
  this.userServices.get_all_Users().subscribe((response:any) => {
  this.list_users=response
},(error)=>{
  if(error.status==401){
    this.route.navigateByUrl("/login-form")
  }else{
    this.messageError = error.message
  }
})
}

fetch_role_by_users(){
  this.roleService.get_role_by_user().subscribe((res:any)=>{
    for(const key in res){
      this.list_user_role.push(res[key][0])
    }
  },(error)=>{
    if(error.status==401){
      this.route.navigateByUrl("/login-form")
    }else{
      this.messageError = error.message
    }
  })
}

on_row_clicked(user:any, authority:any){
  this.user_id=user.id
  this.user_authority=authority
  this.actionVisible=true  
}

hide_actions_buttons(){
  this.actionVisible=false
  this.dataService.change_user_id(0)
}

on_modify_clicked(){
  this.dataService.change_user_id(this.user_id)
  this.dataService.change_user_authority(this.user_authority)
  this.route.navigateByUrl("/create-user")
}

on_delete_user_clicked(){
  console.log(this.user_id)
  this.userServices.deleteUserById(this.user_id).subscribe((res:any)=>{
        this.actionVisible=false
  },(error)=>{
    if(error.status==401){
      this.route.navigateByUrl("/login-form")
    }else{
      this.messageError = error.message
    }
  })
}

}
