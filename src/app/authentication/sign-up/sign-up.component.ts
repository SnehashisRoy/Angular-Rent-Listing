import { Component, OnInit } from '@angular/core';
import {  Validators, FormGroup, ValidationErrors, FormControl } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/validators/password-match.directive';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
signupForm = new FormGroup({
    name:new FormControl('', Validators.required),
    email:new FormControl('', [Validators.required, Validators.email]),
    password1: new FormControl('', [Validators.required , Validators.minLength(6)]),
    password2: new FormControl('', Validators.required)

  },{ validators: passwordMatchValidator  });


  ngOnInit() {
  }

  onSubmit(){
    console.log(this.signupForm);
  }
  
  get name() { return this.signupForm.get('name'); }
  get email() { return this.signupForm.get('email'); }
  get password1() { return this.signupForm.get('password1'); }
  get password2() { return this.signupForm.get('password2'); }

  
  
  

}
