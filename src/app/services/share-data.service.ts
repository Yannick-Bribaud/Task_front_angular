import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private task_id = new BehaviorSubject<Number>(0)
  current_task_id = this.task_id.asObservable();

  private user_id = new BehaviorSubject<Number>(0)
  current_user_id = this.user_id.asObservable();

  private user_authority = new BehaviorSubject<String>("")
  current_user_authority = this.user_authority.asObservable();


  constructor() { }

  changeTask_id(task_id: Number){
    this.task_id.next(task_id)
  }

  change_user_id(user_id: Number){
    this.user_id.next(user_id)
  }

  change_user_authority(user_authority : String){
    this.user_authority.next(user_authority)
  }

}
