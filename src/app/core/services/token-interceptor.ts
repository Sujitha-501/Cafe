import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from "rxjs";


import { HeaderService } from "./header.service";
import { AuthService } from "src/app/auth/services/auth.service";
import { Router } from "@angular/router";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root'
})

export class TokenInterceptor {


  isRefreshingToken!: boolean;
  refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor(private headerService: HeaderService,
    private authService: AuthService,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptor');
    return next.handle(this.setHeaders(request)).pipe(catchError((err: any) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        return this.handleError(request, next);
      }
      return throwError(err);
    }));
  }
  /**
   * 
   * @param request 
   * @param next 
   * @returns 
   */

  private handleError(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.refreshTokenSubject.next(null);
      return this.authService.getRefreshToken().pipe(switchMap((token: any) => {
        this.isRefreshingToken = false;
        this.refreshTokenSubject.next(token['accessToken']);
        this.headerService.setHeaders('default', 'Authorization', token['accessToken']);
        sessionStorage.setItem('token', token['accessToken']);
        return next.handle(this.setHeaders(request));
      }), catchError((err: any) => {
        this.isRefreshingToken = false;
        this.router.navigate(['/app']);
        return throwError(err);
      }));
    } else {
      return this.refreshTokenSubject.pipe(filter(token => token !== null),
        take(1),
        switchMap((jwtToken) => next.handle(this.setHeaders(request))));
    }
  }
  /**
   * 
   * @param request 
   * @returns 
   */
  setHeaders(request: HttpRequest<any>) {
    console.log('setHeaders Interceptor:', request.url);
    const headers = this.headerService.getHeaders(request.url);
    return headers ? request.clone({
      setHeaders: headers
    }) : request;
  }
}