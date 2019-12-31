import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  private url:string = environment.apiUrl+'api/';

  constructor(private http : HttpClient) { }

  deleteImage(id:number){

    return this.http.get(this.url+'listing/remove-image/'+ id).pipe(

      catchError(this.handleError)
  
      );

  }

  updateListing(id: number, listing: any ){
    return this.http.post(this.url+'listing/edit/'+ id , listing).pipe(

    catchError(this.handleError)

    );


  }
  uploadImages(id: number, images: any){

    return this.http.post(this.url+'listing/upload/'+ id , images).pipe(

      catchError(this.handleError)
  
      );
  }

  createListing(listing:any){
    return this.http.post(this.url+'listing/create', listing).pipe(

      map(v => v['data']),

      catchError(this.handleError)
  
      );

  }

  private handleError(error: HttpErrorResponse) {
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
    // return an observable with a user-facing error message
    return throwError (
      'Something bad happened; please try again later.');
  };

}
