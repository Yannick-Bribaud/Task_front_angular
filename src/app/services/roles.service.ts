import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  endpoint : string = `http://localhost:8080/api/role/`

  constructor(private http : HttpClient) { }

  getAllRoles(){
    return this.http.get(this.endpoint +'list')
  }

  getRoleById(roleId : any){
    return this.http.get(this.endpoint + 'select/'+roleId)
  }

  get_role_by_user(){
    return this.http.get(this.endpoint + 'listRoleByUser')
  }

  get_role_by_name(authority : any){
    return this.http.get(this.endpoint + 'authority/' + authority)
  }
}
