import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppData } from './core/app-data/app-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rent Your Property';

  loggedIn:any;
  
  constructor(private router: Router,
              private appData: AppData){}

  ngOnInit() {

    this.appData.logInStatusObs$.subscribe((logInStatus)=>{
        
        this.loggedIn = logInStatus;

    });

    // get 

    // if the user is not loggged In

    if(! localStorage.getItem('auth_token')){
      this.router.navigate(['/auth/log-in']);
    }else{
      
      this.appData.updateLogInStatus();

      this.router.navigate(['/dashboard']);
    }


  }
  logOut(){
    localStorage.removeItem('auth_token');
    this.appData.updateLogInStatus();
    this.router.navigate(['/auth/log-in']);


  }

}
