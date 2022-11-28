import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Email} from "../model/email";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SendemailService {

  baseUrl = "http://localhost:8080/email"
  constructor(private httpClient : HttpClient) { }

  emailSend(email:Email):Observable<Object>{
    console.log(email);
    return this.httpClient.post(`${this.baseUrl}`,email);
  }
}
