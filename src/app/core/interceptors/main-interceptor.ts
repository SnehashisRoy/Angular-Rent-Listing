import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

/** Pass untouched request through to the next request handler. */
@Injectable()

export class MainInterceptor implements HttpInterceptor {
    constructor(
      private toastr:ToastrService,
      private authservice: AuthService) { }
  //function which will be called for all http calls
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // Get the auth header from the service.
    const authHeader = this.authservice.getAuthorizationHeader();
    // Clone the request to add the new header.
    const authReq = request.clone({headers: request.headers.set('Authorization', authHeader)
                                                   .set('Content-Type', 'application/json')});
    // Pass on the cloned request instead of the original request.
    
    
    return next.handle(authReq).pipe(
      map((event: HttpEvent<any>)=>{

        if(event instanceof HttpResponse){
            if(event.body.success == false){
              this.toastr.error(event.body.data, 'Error');
                console.log(event.body.data);
                return;
            }
            
        }

        return event;

      })
    );
  }
    
}