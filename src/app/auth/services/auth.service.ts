import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, map, throwError } from 'rxjs';
import { HttpRoutingService } from 'src/app/core/services/http-routing.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  messages = new BehaviorSubject<any>(null);
  user = new Subject<string>();
  private userRole!: string;
  userDatas :any[] =[];
  constructor(private http: HttpRoutingService) { }

  getMessages() {
    this.http.getJsonData('messages.json').subscribe(res => {
      console.log('messages: ', res);
      this.messages.next(res);
    });
  };


  signIn(data: any) {
    return this.http.postMethod('login', data).pipe(map((res: any) => {
      if (res && res['user'] && res['token']) {
        this.user.next(res['user']);
        sessionStorage.setItem('currentUserToken', JSON.stringify({ token: res['token'], refreshToken: res['refreshToken'] }))
      }
      return res;
    }), catchError(err => {
      return throwError(err);
    }));
  }

  isAuthenticated() {
    let token;
    const data = sessionStorage.getItem('currentUserToken');
    if (data) {
      // Get the currnt user details from the local storage.
      const currentUser = JSON.parse(data);
      if (currentUser && currentUser.token) {
        // To check whether the current user is authenticated or not in online.
        token = currentUser.token;
        console.log('isAuthenticated');
        return token != null;
      }
    } else {
      return false;
    }
  };

  getToken(): string {
    let token;
    const currentUser = JSON.parse(sessionStorage.getItem('currentUserToken') || '');
    if (currentUser) {
      token = currentUser.token;
      console.log('getToken');
    }
    return token;
  }
  getRefreshToken() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUserToken') || '');
    const refreshToken = currentUser ? currentUser.refreshToken : null;
    console.log('getRefreshToken');
    return this.http.postMethod('refreshToken', { refreshToken });
  }

  logOut() {
    sessionStorage.removeItem('currentUserToken');
    return true;
  }

  setUserRole(role: string): void {
    this.userRole = role;
  }

  getUserRole(): string {
    return this.userRole;
  }

  userData(data: any) {
    this.userDatas = data;    
  }

  getData() {
    return this.userDatas;    
  }

}
