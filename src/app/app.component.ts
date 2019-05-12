import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rent Your Property';
  
  constructor(private router: Router){}

  ngOnInit() {

    // if the user is not loggged In

    if(! localStorage.getItem('auth_token')){
      this.router.navigate(['/auth/log-in']);
    }
  }

}
