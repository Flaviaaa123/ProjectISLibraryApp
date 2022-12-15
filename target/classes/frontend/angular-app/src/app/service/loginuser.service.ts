import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class LoginuserService {
  private baseurl="http://localhost:8080/user/login";
  private baseUrl2 = "http://localhost:8080/save";
  value : string | null;

  constructor(private httpClient : HttpClient) { }

  loginUser(user : User) : Observable<Object>{
    this.value = user.email;
    return this.httpClient.post(`${this.baseurl}`,user);
  }

  saveEmail():Observable<Object>{
    return this.httpClient.post(`${this.baseUrl2}`,this.value)
  }
}
