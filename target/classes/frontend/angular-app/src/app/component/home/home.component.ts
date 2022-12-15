import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {RegisterService} from "../../service/register.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email:string;
  pass:string;
  user : User = new User();

  constructor(private registerService : RegisterService,
              private router : Router) { }


  ngOnInit(): void {
  }

  userRegister() {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!this.email.match(validRegex)) {
      alert("Invalid email address!");
    } else if (this.pass.length<=7){
      alert("Password to short! MIN 8 CHARACTERS!")
    } else
    {
      console.log(this.user);
      this.registerService.registerUser(this.user).subscribe(response => {
        Swal.fire('Congrats!', 'Account created successfully!', 'success')
        this.goToPage("/login")
      }, error => Swal.fire('Oops!', 'Email already used', 'error'))
    }
  }

  goToPage(pageName: string):void {
    this.router.navigate([`${pageName}`]);
  }

  getEmail(event: any) {
    this.email=event.target.value;
  }

  getPass(event: any) {
    this.pass=event.target.value;
  }
}
