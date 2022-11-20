import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "./user";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class LoginuserService {
  private baseurl="http://localhost:8080/user/login";
  constructor(private httpClient : HttpClient) { }

  loginUser(user : User) : Observable<Object>{
    console.log(user);
    return this.httpClient.post(`${this.baseurl}`,user);
  }
}
