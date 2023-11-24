import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  headers: { [url: string]: { [key: string]: string } } = {};
  /**
   * 
   * @param url 
   * @param key 
   * @param value 
   */

  public setHeaders(url: string, key: string, value: string) {
    if (this.headers && this.headers.hasOwnProperty(url)) {
      this.headers[url][key] = value;
      console.log('setHeaders:', this.headers);
    }
    else {
      this.headers[url] = { [key]: value };
      console.log('setHeaders Else:', this.headers);
    }
  }
  /**
   * 
   * @param url 
   * @param key 
   * @returns 
   */

  public clearHeaders(url: string, key: string) {
    if (this.headers && this.headers.hasOwnProperty(url) && this.headers[url].hasOwnProperty(key)) {
      const val = this.headers[url][key];
      delete this.headers[url][key];
      return val;
    }
  }
  /**
   * 
   * @param url 
   * @returns 
   */
  public getHeaders(url: string) {
    if (this.headers && this.headers.hasOwnProperty(url)) {
      console.log('getHeaders If:', this.headers[url]);
      return this.headers[url];
    } else {
      console.log('getHeaders Else:', this.headers['default']);
      return this.headers['default'];
    }
  }
}
