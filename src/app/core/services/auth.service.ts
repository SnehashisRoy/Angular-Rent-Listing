import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
    private url:string = 'http://localhost:8085/';
   
    private loggedIn: boolean = false;
  
    constructor(private http : HttpClient) {
      this.loggedIn= !!localStorage.getItem('auth_token');
     }

    registerUser( user: any ){

      return this.http.post(this.url+'api/sign-up', user).pipe(
  
      catchError (this.handleError)
  
      );
  
  
    }

    loginUser(credential:any){

      return this.http.post(this.url+'oauth/token', credential).pipe(

      tap( res => {
        if(res){
          this.loggedIn= true;
          localStorage.setItem('auth_token', res['access_token']);
         }
      }),
      catchError (this.handleError)
  
      )
  
  
    };

    logout(){
      localStorage.removeItem('auth_token');
      this.loggedIn = false;
  
    }
    loggInStatus(){
      return this.loggedIn;
    }
    
    getAuthorizationHeader(){
      let token   = localStorage.getItem('auth_token');
      return `Bearer ${token}`;
    }

    private handleError(error: HttpErrorResponse ) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      console.log(error.error.message);
      // return an observable with a user-facing error message
      return throwError (
        error.error.errors
        );
    };
  


}
