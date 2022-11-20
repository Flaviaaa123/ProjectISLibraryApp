import { Component, OnInit } from '@angular/core';
import {User} from "../user";
import {LoginuserService} from "../loginuser.service";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = new User();
  getData:boolean;
  constructor(private loginuserservice : LoginuserService,
              private router : Router) { }

  ngOnInit(): void {
  }

  userLogin() {
    console.log(this.user)
    // @ts-ignore
    this.loginuserservice.loginUser(this.user).subscribe((res:boolean)=> {
      this.getData = res;
      if (this.getData) {
        this.router.navigate([`first`]);
      }
    },error => Swal.fire('Oops!', 'Wrong email or password!', 'error'));
  }
}
