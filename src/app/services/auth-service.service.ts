import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http :  HttpClient) { }

  authentication(credential : any):Observable<any>{
    return this.http.post(`http://localhost:8080/oauth/login`,credential);
  }
}
