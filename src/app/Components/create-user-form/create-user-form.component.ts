import { Component,  OnInit } from '@angular/core';
import { FormGroup, FormControl,FormControlName, Validator, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { RolesService } from 'src/app/services/roles.service';
import { UserRoleServices } from 'src/app/services/user-role.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.css']
})
export class CreateUserFormComponent implements OnInit{

  registerUser !: FormGroup;
  isChecked_accExpired : boolean = false
  isChecked_passwordExpired : boolean = false
  isChecked_accountLocked : boolean = false
  isChecked_enable: boolean = true
  selectedRoleValue:number = 0
  listRoles:any = []
  userRole_JsonObject : any;
  userRole_JsonObject_to_takeOff:any
  user_id_from_service:any
  current_authority:any;
  old_role:any

  isAnUpdate = false
  user_char_authority:any

  isText:boolean=false;
  eyeIcon: string = "fa-eye-slash"
  iconeText:string=" Show"
  type: string="password";
  invalidInput: string = "Invalid input"
  buttonName:string = "Create"
  messageError:string=null
  messageSucess:string=null
 

  constructor(private userServices: UsersService, private roleServices : RolesService, private userRoleServices : UserRoleServices, private dataService:ShareDataService,private route : Router){}
  
  ngOnInit(): void {

    this.init_register()
    this.getlistOfRoles(); 

    this.dataService.current_user_id.subscribe(user_id =>this.user_id_from_service=user_id)
    
    if(this.user_id_from_service!=0){
      this.buttonName="Update"
      this.isAnUpdate=true
      this.fetch_user_to_update()
      this.set_user_role_in_dropDown_list()
    } 
  }


init_register(){
      this.registerUser = new FormGroup({
      id: new FormControl(),
      firstName : new FormControl('',[Validators.required]),
      lastName :  new FormControl('',[Validators.required]),
      username :  new FormControl('',[Validators.required]),
      password :  new FormControl('',Validators.required),
      accountExpired : new FormControl(this.isChecked_accExpired),
      passwordExpired: new FormControl(this.isChecked_passwordExpired),
      accountLocked : new FormControl(this.isChecked_accountLocked),
      enable : new FormControl(this.isChecked_enable)
    })
  }


fetch_user_to_update(){
    this.userServices.getUserById(this.user_id_from_service).subscribe((response:any) => {
        this.set_data_to_update_in_register(response)
    },(error) => {
      this.print_error_message(error)
    })
}

set_data_to_update_in_register(user:any){
  this.registerUser.setValue({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  username: user.username,
  password: user.password,
  accountExpired : user.accountExpired,
  passwordExpired : user.passwordExpired,
  accountLocked : user.accountLocked,
  enable : user.enabled
 })
}

set_user_role_in_dropDown_list(){
  this.dataService.current_user_authority.subscribe(authority => this.user_char_authority=authority)
}


on_create_user_clicked(){
        
      if(this.selectedRoleValue==0){
          this.messageError="Please set the role of user"
          this.messageSucess=null
          return
        }
        
    this.userServices.saveUser(this.registerUser.value).subscribe(res => {
      if(res.id !=null && res.id!=0){
        this.userRole_JsonObject = {"role" : {"id": this.selectedRoleValue},
                                    "user" : {"id":res.id} 
                                   }
        this.userRoleServices.saveUserAndRole(this.userRole_JsonObject).subscribe(result => {
        this.init_register();
        },(error)=>{
          this.print_error_message(error)
        })
        this.messageSucess="User successfully created!"
        this.messageError=null
      }
      
    },(error) =>{
        if(error.status==422){
          this.messageError="Make sure you fill in all fields. If this is not the problem, the username may already exist in database."
          this.messageSucess=null
        }else{
          this.print_error_message(error)
        }
    })
  }


on_update_user_clicked(){

    if(this.selectedRoleValue!=0){
      this.roleServices.getRoleById(this.selectedRoleValue).subscribe(res =>{
          this.current_authority=res

      this.roleServices.get_role_by_name(this.user_char_authority).subscribe(role =>{
          this.old_role = role
          
          if(this.old_role.id != this.current_authority.id){
            this.userServices.updateUser(this.registerUser.value).subscribe((response:any)=>{

              if(response.id!=null && response.id!=0){
                  this.create_user_role(response)
                  this.add_new_and_takeOff_old_role()
                  this.print_successful_message(response)
              }
            },(error)=>{
              this.print_error_message(error)
            }) 

          }else{
            this.userServices.updateUser(this.registerUser.value).subscribe((resp:any)=>{
              this.print_successful_message(resp)
            },(error)=>{
              this.print_error_message(error)
            })
          }
      },(error)=>{
         this.print_error_message(error)
      })
      },(error)=>{
        this.print_error_message(error)
      })

    }else{
       this.userServices.updateUser(this.registerUser.value).subscribe((resp:any)=>{
        this.print_successful_message(resp)
      },(error)=>{
        this.print_error_message(error)
      })
    }
  }
  

create_user_role(response:any){
  this.userRole_JsonObject = { "role" : {"id": this.current_authority.id},
                               "user" : {"id":response.id} 
                             }
  this.userRole_JsonObject_to_takeOff = { "role" : {"id": this.old_role.id},
                                          "user" : {"id":response.id } 
                                        }
}


add_new_and_takeOff_old_role(){
  this.userRoleServices.saveUserAndRole(this.userRole_JsonObject).subscribe((res:any)=>{},(error)=>{
    this.messageError = error.message
    this.messageSucess=null
  })
  this.userRoleServices.change_user_role(this.userRole_JsonObject_to_takeOff).subscribe((result:any)=>{},(error)=>{
   this.messageError = error.message
   this.messageSucess=null
  })
}

print_successful_message(httpResp:any){
  if(httpResp.id!=null && httpResp.id!=0){
    this.messageSucess="User successfully updated!"
    this.messageError=null
    this.dataService.change_user_id(0);
    this.dataService.change_user_authority("")
    this.init_register()
  }
}

print_error_message(error:any){
  this.messageError = error.message
  this.messageSucess=null
}

  private getlistOfRoles(){
    return this.roleServices.getAllRoles().subscribe(res =>{
      this.listRoles = res
    }, (error)=>{
        if(error.status==401){
          this.route.navigateByUrl("/login-form")
        }else{
          this.messageError=error.message;
          this.messageSucess=null
        }
    })
  }

  getSelectedValue(event : any){
      this.selectedRoleValue=event.target.value
       return this.selectedRoleValue;
  }

  get firstName(){
    return this.registerUser.get('firstName')
  }

  get lastName(){
    return this.registerUser.get('lastName')
  }

  get username(){
    return this.registerUser.get('username')
  }

  get password(){
    return this.registerUser.get('password')
  }

  get id(){
    return this.registerUser.get('id')
  }

  getIsChecked_accountExpired(event:any){
    this.isChecked_accExpired=event.target.value
    return this.isChecked_accExpired
  }

  getIsChecked_passwordExpired(event : any){
    this.isChecked_accExpired = event.target.value
    return this.isChecked_accExpired
  }
  getIsChecked_accountLocked(event: any){
    this.isChecked_accountLocked = event.target.value
    return this.isChecked_accountLocked
  }

  getIsChecked_enable(event : any){
      this.isChecked_enable = event.target.value
      return this.isChecked_enable
  }

  HideOrShowPassword(){
    this.isText = !this.isText
    this.isText ? this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash"
    this.isText ? this.type="text" : this.type="password"
    this.isText ? this.iconeText=" Hide " : this.iconeText=" Show "
  }

  hideNotif(){
     if(this.messageSucess!=null){
      this.messageSucess=null
      return
    } 
    this.messageError=null
  }
  

}
