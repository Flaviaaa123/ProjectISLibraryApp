import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmedValidator} from "../../service/confirmed-validator.service";
import {ResetpassService} from "../../service/resetpass.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  password:string;

  constructor(private fb: FormBuilder,
              private resetpassService : ResetpassService,
              private router:Router) {

    this.form = fb.group({
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('password', 'confirm_password')
    })
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.password);
    this.resetpassService.resetPassword(this.password).subscribe(res=>{
      Swal.fire('Success!','Password reseted!','success')
      this.goToPage("/login")
    },error => Swal.fire('Oops!','Password was not reseted','error'))
  }

  ngOnInit(): void {
  }

  getPassword(event: any) {
    this.password = event.target.value
  }
  goToPage(pageName: string):void {
    this.router.navigate([`${pageName}`]);
  }
}
