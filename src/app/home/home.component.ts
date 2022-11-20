import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import {RegisterService} from "../register.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user : User = new User();

  constructor(private registerService : RegisterService,
              private router : Router) { }


  ngOnInit(): void {
  }

  userRegister(){
    console.log(this.user);
    this.registerService.registerUser(this.user).subscribe(response => {
      Swal.fire('Congrats!', 'Account created successfully!', 'success')
    },error => Swal.fire('Oops!', 'Email already used', 'error'))
  }

  goToPage(pageName: string):void {
    this.router.navigate([`${pageName}`]);
  }
}
