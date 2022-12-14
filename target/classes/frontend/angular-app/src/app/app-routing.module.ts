import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {LoginComponent} from "./component/login/login.component";
import {FirstComponent} from "./component/first/first.component";
import {CartComponent} from "./component/cart/cart.component";
import {ForgotComponent} from "./component/forgot/forgot.component";
import {ResetComponent} from "./component/reset/reset.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'first', component: FirstComponent},
  { path: 'cart', component: CartComponent},
  { path: 'forgot', component: ForgotComponent},
  { path: 'reset', component: ResetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {

}
