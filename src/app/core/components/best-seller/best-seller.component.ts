import { Component } from '@angular/core';

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.scss']
})
export class BestSellerComponent {

  productList = [
   { imageUrl : './assets/coffee1.jpg' , name: 'Coffee1'},
   { imageUrl : './assets/coffee2.jpg' , name: 'Coffee2'},
   { imageUrl : './assets/coffee3.jpg' , name: 'Coffee3'}
  ]

}
