import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  endpoint: string = `http://localhost:8080/api/taskUser/`
  endpoint_:string = `http://localhost:8080/api/user/`

  constructor(private http :HttpClient) { }

  saveUser(userData:any):Observable<any>{
    return this.http.post(this.endpoint +'create',userData)
  }

  getUserById(userId : any){
      return this.http.get(this.endpoint + 'select/' +userId)
  }

  updateUser(userData: any){
    return this.http.put(this.endpoint + 'update', userData)
  }

  deleteUserById(userId: any){
    return this.http.delete(this.endpoint + 'delete/' + userId)
  }

  getTaskUserByUsername(creatorUsername:any){
    return this.http.get(this.endpoint + 'creator/'+creatorUsername)
  }

  get_all_Users(){
    return this.http.get(this.endpoint_ + 'list')
  }

}
