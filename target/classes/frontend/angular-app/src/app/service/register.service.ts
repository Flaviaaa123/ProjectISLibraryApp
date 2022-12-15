import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseUrl = "http://localhost:8080/user"
  constructor(private httpClient:HttpClient) { }

  registerUser(user:User):Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`,user);
  }
}
