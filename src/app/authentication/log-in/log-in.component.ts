import { Component, OnInit } from '@angular/core';
import {  Validators, FormGroup, ValidationErrors, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginForm = new FormGroup({
    email:new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required , Validators.minLength(6)]),

  });
constructor(
     private authService: AuthService,
     private router: Router,
     private toaster: ToastrService
){}


  ngOnInit() {
    
  }

  onSubmit(){

    let credential = {
      'grant_type': 'password',
      'client_id' : 1,
      'client_secret': 'ugbvQahxGAwij9a02xeeen7zJFGw44pvBGvmczgG',
      'username' : this.loginForm.value.email,
      'password': this.loginForm.value.password,
      'scope' : '',
     }

     this.authService.loginUser(credential).subscribe(
       (res) =>{
      this.router.navigate(['/dashboard']);
      this.toaster.success('You are registered successfully. Please log in.');
    },

    )
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }


}
