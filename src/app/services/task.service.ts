import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../model/tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  endpoint : string = `http://localhost:8080/api/task/`

  constructor(private http : HttpClient) { }

  getAllTask(){
      return this.http.get(this.endpoint + 'list')
  }

  createTask(taskData:any){
    return this.http.post(this.endpoint +'create',taskData)
  }

  updateTask(taskData:any){
    return this.http.put(this.endpoint +'update', taskData)
  }

  deleteTask(taskId: any){
    return this.http.delete(this.endpoint + 'delete/'+taskId)
  }

 get_Owner_list(){
    return this.http.get(this.endpoint + 'listOwners')
 }

 get_Creator_list(){
  return this.http.get(this.endpoint + 'listCreators')
 }

 get_task_by_id(id:any){
  return this.http.get(this.endpoint + 'select/' +id)
 }
  
}
