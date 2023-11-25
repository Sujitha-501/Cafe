import { Injectable } from '@angular/core';
import { HttpRoutingService } from './http-routing.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpRoutingService) { }

  signup(data: any) {
    return this.httpService.postMethod('signup',data);
  }

  getCategoryCount() {
    return this.httpService.getMethod('getCategoryCount');
  }

  getProductCount() {
    return this.httpService.getMethod('getProductCount');
  }
}
