import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRoleServices {

  endpoint: string = `http://localhost:8080/api/userRole/`

  constructor(private http :HttpClient) { }

  saveUserAndRole(UserRoleData:any):Observable<any>{
    return this.http.post(this.endpoint +'create',UserRoleData)
  }

  getListOwner(){
    return this.http.get(this.endpoint +'ownerlist')
  }

  updateUserAndRole(userRole:any){
    return this.http.put(this.endpoint + 'update',userRole)
  }

  change_user_role(userRole:any){
    return this.http.post(this.endpoint + 'changeUserRole',userRole)
  }




}
