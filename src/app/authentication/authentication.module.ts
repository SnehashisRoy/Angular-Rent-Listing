import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AuthenticationComponent } from './authentication.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../core/services/auth.service';
import { httpInterceptorProviders } from '../core/interceptors';
import { LogInComponent } from './log-in/log-in.component';

@NgModule({
  declarations: [
    AuthenticationComponent,
    SignUpComponent,
    LogInComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers:[
    AuthService,
    httpInterceptorProviders
  ]
 

})
export class AuthenticationModule { }
