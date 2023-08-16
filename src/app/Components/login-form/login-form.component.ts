import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit{
  
  formGroup!: FormGroup;
  type: string="password";
  isText : boolean=false;
  eyeIcon : string = "fa-eye-slash"
  iconeText : string=" Show Password"
  userRole : any
  username: any
  messageError:string = null

  constructor(private authService : AuthServiceService, private route : Router){}

  ngOnInit(): void {
    this.init_register();
  }

  init_register(){
        this.formGroup = new FormGroup({
        username : new FormControl('',[Validators.required]),
        password : new FormControl('',[Validators.required]),
        
      })
  }

  HideOrShowPassword(){
    this.isText = !this.isText
    this.isText ? this.eyeIcon="fa-eye" : this.eyeIcon="fa-eye-slash"
    this.isText ? this.type="text" : this.type="password"
    this.isText ? this.iconeText=" Hide password" : this.iconeText=" Show password"
  }

  authFeature(){
    if(this.formGroup.valid){
        this.authService.authentication(this.formGroup.value).subscribe((result:any) => {
        localStorage.setItem('access_token',result.access_token)
        localStorage.setItem('creator',result.username)
        localStorage.setItem('role',result.roles[0])
        
        if(localStorage.getItem('role')=='ROLE_ADMIN'){
          this.route.navigateByUrl("/admin-tool")
         }else if (localStorage.getItem('role')=='ROLE_CREATOR' || localStorage.getItem('role')=='ROLE_OWNER'){
          this.route.navigateByUrl("/task-tool")
         }
      },(error)=>{
          if(error.status==401){
           this.messageError = "Error 401 : Authentication failed!"
          }else{
              this.messageError=error.message
          }
      });
    }
  }

getUsername (){
  return this.username;
}

getUserRole (){
  return this.userRole
}


}


