import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './component/login/login.component';
import { FirstComponent } from './component/first/first.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PopUpComponent } from './component/pop-up/pop-up.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './component/cart/cart.component';
import { ForgotComponent } from './component/forgot/forgot.component';
import { ResetComponent } from './component/reset/reset.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FirstComponent,
    PopUpComponent,
    CartComponent,
    ForgotComponent,
    ResetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  exports: [MatDialogModule],

  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[PopUpComponent]
})
export class AppModule { }
