import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {LoginuserService} from "../../service/loginuser.service";
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  swal: any;
  user:User = new User();
  getData:boolean;
  constructor(private loginUserService : LoginuserService,
              private router : Router) { }

  ngOnInit(): void {
  }

  userLogin() {
    console.log(this.user)
    // @ts-ignore
    this.loginUserService.loginUser(this.user).subscribe((res:boolean)=> {
      this.getData = res;
      if (this.getData) {
        this.router.navigate([`first`]);
        sessionStorage.setItem('email',this.user.email)
      }
    },error => Swal.fire('Oops!', 'Wrong email or password!', 'error'));
    this.loginUserService.saveEmail().subscribe();
  }

  goToPage(pageName: string):void {
    this.router.navigate([`${pageName}`]);
  }
}
