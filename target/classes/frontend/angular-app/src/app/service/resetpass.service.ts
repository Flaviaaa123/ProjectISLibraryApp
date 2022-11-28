import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResetpassService {

  baseUrl = "http://localhost:8080/reset"

  constructor(private httpClient : HttpClient) { }

  resetPassword(pass: String) : Observable<Object>{
    console.log(pass);
    return this.httpClient.post(`${this.baseUrl}`,pass)
  }
}
