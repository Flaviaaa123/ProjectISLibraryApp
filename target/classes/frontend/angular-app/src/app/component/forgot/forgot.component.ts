import { Component, OnInit } from '@angular/core';
import {Email} from "../../model/email";
import {SendemailService} from "../../service/sendemail.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  email : Email = new Email();
  inProgress:boolean = false;

  constructor(private emailService : SendemailService,
              private router:Router) { }

  ngOnInit(): void {
  }

  sendEmail() {
    this.inProgress = true;
    console.log(this.email);
    this.emailService.emailSend(this.email).subscribe(res => {
    this.inProgress = false;
    Swal.fire('Sent!','Please go check your email','success')
    this.goToPage("/login")
  }, error => Swal.fire('Oops!','Email doesn t exist','error'))
    this.inProgress = false;
  }

  goToPage(pageName: string):void {
    this.router.navigate([`${pageName}`]);
  }
}
