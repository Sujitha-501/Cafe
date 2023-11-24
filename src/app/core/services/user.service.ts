import { Injectable } from '@angular/core';
import { HttpRoutingService } from './http-routing.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpRoutingService) { }

  
}
