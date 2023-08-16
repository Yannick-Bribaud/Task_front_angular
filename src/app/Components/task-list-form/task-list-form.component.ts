import { Component,OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/model/tasks';
import { ShareDataService } from 'src/app/services/share-data.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-task-list-form',
  templateUrl: './task-list-form.component.html',
  styleUrls: ['./task-list-form.component.css']
})
export class TaskListFormComponent implements OnInit{

 allTasks : any[]=[]
 allOwers : any=[]
 allCreators :any=[]
 actionVisible:boolean=false
 task_id_from_Service :Number;
 task_clicked:Number
 ROLE :string = localStorage.getItem('role')
 messageError:string=null


constructor(private taskServices : TaskService, private dataService: ShareDataService, private route : Router){}
  
  ngOnInit(): void {
    this.fetch_all_Task()
    this.fetch_all_owners()
    this.fetch_all_creator()
    this.dataService.changeTask_id(0)
  }

  private fetch_all_Task(){
    this.allTasks.length=0
    this.taskServices.getAllTask().subscribe((res: Task[])=>{
    this.allTasks=res
  
  },(error)=>{
    if(error.status==401){
      this.route.navigateByUrl("/login-form")
    }else{
      this.messageError = error.message
    }
  })
}

private fetch_all_owners(){
  this.taskServices.get_Owner_list().subscribe((response : any) =>{
  this.allOwers = response;
},(error)=>{
  if(error.status==401){
    this.route.navigateByUrl("/login-form")
  }else{
    this.messageError = error.message
  }
})
}

private fetch_all_creator(){
  this.taskServices.get_Creator_list().subscribe((responses: any) => {
  this.allCreators = responses;
},(error)=>{
  if(error.status==401){
    this.route.navigateByUrl("/login-form")
  }else{
    this.messageError = error.message
  }
})
}
  
 hide_actions_buttons(){
    this.actionVisible=false
    this.dataService.changeTask_id(0);
  }

  on_row_clicked(task:any,row :any){
    if(this.ROLE=="ROLE_CREATOR"){
      this.task_clicked = task.id
      this.actionVisible=true
    }
  }

  on_modify_clicked(){
    this.dataService.changeTask_id(this.task_clicked)
    this.route.navigateByUrl("/create-task")
  }

delete_task(){
  this.taskServices.deleteTask(this.task_clicked).subscribe((res:any)=>{
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
