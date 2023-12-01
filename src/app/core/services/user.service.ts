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

  getCategory() {
    return this.httpService.getMethod('getCategory');
  }

  createCategory(data: any) {
    return this.httpService.postMethod('createCategory', data);
  }

  updateCategory(data: any) {
    return this.httpService.postMethod('updateCategory', data);
  }

  getOneCategory(data: any) {
    return this.httpService.postMethod('getOneCategory',data);
  }

  getProduct() {
    return this.httpService.getMethod('getProduct');
  }

  createProduct(data: any) {
    return this.httpService.postMethod('createProduct', data);
  }

  updateProduct(data: any) {
    return this.httpService.postMethod('updateProduct', data);
  } 

  getOneProduct(data: any) {
    return this.httpService.postMethod('getOneProduct', data);
  }

  deleteProduct(data: any) {
    return this.httpService.postMethod('deleteProduct', data);
  }

  getProductById(data: any) {
    return this.httpService.postMethod('getProductById', data);
  }
}
