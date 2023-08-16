import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl,FormControlName, Validator, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { UserRoleServices } from 'src/app/services/user-role.service';
import { TaskService } from 'src/app/services/task.service';
import { ShareDataService } from 'src/app/services/share-data.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})

export class TaskFormComponent implements OnInit {

  registerTask !: FormGroup;
  isChecked_active : boolean = true
  selectedTaskOwnerValue: number = 0
  invalidInput: string = "Invalid input! "
  listOwner: any = []
  creatorTask : any;
  response:any;
  task_id_fromService:Number=0
  ButtonName:String="Create"
  messageError:string = null
  messageSucess:String=null
  isAnUpdate:boolean=false
  owner_id:any

  
  constructor(private userServices: UsersService, private userRoleServices : UserRoleServices,private taskServices : TaskService, private dataService: ShareDataService, private route : Router){}

  ngOnInit(): void { 
  this.init_register()
  this.dataService.current_task_id.subscribe(task_id=>this.task_id_fromService=task_id)

  if(this.task_id_fromService!=0){
    this.ButtonName="Update"
    this.isAnUpdate=true
    this.fetch_data_to_update()
  }
  this.get_list_owner();
  this.get_creator()
  }

  init_register(){
    this.registerTask = new FormGroup({
    id: new FormControl(),
    nameTask : new FormControl('',[Validators.required,Validators.minLength(5), Validators.maxLength(50)]),
    dateTaskCreated :  new FormControl('',[Validators.required]),
    dateTaskMade :  new FormControl('',[Validators.required]),
    descriptionTask :  new FormControl('',[Validators.required,Validators.minLength(5), Validators.maxLength(150)]),
    isActive : new FormControl(this.isChecked_active),
    owner : new FormControl(),
    creator : new FormControl()
  },[date_validator])
}

  fetch_data_to_update(){
      this.taskServices.get_task_by_id(this.task_id_fromService).subscribe((response:any)=>{
        this.set_data_to_update(response)
      }, (error)=>{
          this.messageError = error.message
      })
  }

  set_data_to_update(task :any){
      this.registerTask.setValue({
      id: task.id,
      nameTask: task.nameTask,
      dateTaskCreated: formatDate(task.dateTaskCreated,'YYYY-MM-dd', 'en-IN' ),
      dateTaskMade:  formatDate(task.dateTaskMade,'YYYY-MM-dd', 'en-IN'),
      descriptionTask: task.descriptionTask,
      isActive : task.isActive,
      owner: {"id": Number(task.owner.id)},
      creator : {"id": task.creator.id}
     })
    this.owner_id = Number(task.owner.id)
}

  
on_create_task_click(){
    this.set_owner_and_creator_in_register()

    this.taskServices.createTask(this.registerTask.value).subscribe(res =>{
      this.messageSucess="Task successfully created"
      this.messageError=null
      this.init_register()
    },(error)=>{
        if(error.status==422){
          this.messageError = "Make sure to attribute task to an Owner. If this is not the problem, the task name may already exist in database."
        }else{
          this.messageError = error.message
        }
        this.messageSucess=null
    })
  }


on_update_task_click(){
      
      this.set_owner_and_creator_in_register()

      this.taskServices.updateTask(this.registerTask.value).subscribe((res:any)=>{
      this.messageSucess="task successfully updated"
      this.init_register()
      this.dataService.changeTask_id(0);
      this.messageError=null
      this.route.navigateByUrl("/task-list-form")

    },(error)=>{
        if(error.status==401){
          this.route.navigateByUrl("/login-form")
        }else{
          this.messageError = error.message
        }
        this.messageSucess=null
    })
  }


get_creator(){
    return this.userServices.getTaskUserByUsername(localStorage.getItem('creator')).subscribe((request:any) => {
        localStorage.setItem('id',request.id)
    },(error)=>{
      if(error.status==401){
        this.route.navigateByUrl("/login-form")
      }else{
        this.messageError = error.message
      }
      this.messageSucess=null
    })  
}

set_owner_and_creator_in_register(){
  this.creatorTask = Number(localStorage.getItem('id'))
  this.registerTask.patchValue({
      creator: {"id": this.creatorTask},
      owner :  {"id": Number(this.selectedTaskOwnerValue)}
    })
}

get_list_owner(){
    return this.userRoleServices.getListOwner().subscribe(res => {
      this.listOwner=res;
    },(error)=>{
          if(error.status==401){
            this.route.navigateByUrl("/login-form")
          }else{
            this.messageError = error.message
          }
          this.messageSucess=null
      })
   }

  getisChecked_active(event:any) {
    this.isChecked_active = event.target.value
    return this.isChecked_active
  }

  getSelectedValue(event:any){
    this.selectedTaskOwnerValue=event.target.value
     return this.selectedTaskOwnerValue;
   }

  hideNotif(){
    if(this.messageSucess!=null){
    this.messageSucess=null
    return
    } 
  this.messageError=null
  }


get nameTask(){
  return this.registerTask.get('nameTask')
}

get dateTaskCreated(){
  return this.registerTask.get('dateTaskCreated')
}

get dateTaskMade(){
  return this.registerTask.get('dateTaskMade')
}

get descriptionTask(){
  return this.registerTask.get('descriptionTask')
}

get id(){
  return this.registerTask.get('id')
}

}

function date_validator(task_register: AbstractControl): ValidationErrors | null{
  const dateTaskCreated_frmctrl = task_register.get('dateTaskCreated');
  const dateTaskMade_frmctrl = task_register.get('dateTaskMade');
  return new Date(dateTaskCreated_frmctrl.value) > new Date(dateTaskMade_frmctrl.value) ? { message: 'date validation error' } : null;
}

