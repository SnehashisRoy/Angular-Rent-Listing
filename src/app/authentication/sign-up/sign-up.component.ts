import { Component, OnInit } from '@angular/core';
import {  Validators, FormGroup, ValidationErrors, FormControl } from '@angular/forms';
import { passwordMatchValidator } from '../../shared/validators/password-match.directive';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
constructor(
     private authService: AuthService,
     private router: Router,
     private toaster: ToastrService
){}

  ngOnInit() {
  }

  onSubmit(){
    if(!this.signupForm.valid){
      return;
    }
    this.authService.registerUser(this.signupForm.value).subscribe(
      ()=>{
        this.toaster.success('You are registered successfully. Please log in.')
        this.router.navigate(['/auth/log-in']);
      },
      err => {
        for (var key in err) {
          // skip loop if the property is from prototype
          if (!err.hasOwnProperty(key)) continue;
      
          var obj = err[key];
          for (var prop in obj) {
              // skip loop if the property is from prototype
              if(!obj.hasOwnProperty(prop)) continue;
      
              // your code
              this.toaster.error(obj[prop]);
          }
      }
        
      }
    )
  }
  
  get name() { return this.signupForm.get('name'); }
  get email() { return this.signupForm.get('email'); }
  get password1() { return this.signupForm.get('password1'); }
  get password2() { return this.signupForm.get('password2'); }

  
  
  

}
