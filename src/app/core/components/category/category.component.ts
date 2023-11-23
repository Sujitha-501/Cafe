import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  categories = [
    { imageUrl : './assets/coffee6.jpg' , name: 'Coffee1'},
    { imageUrl : './assets/coffee5.jpg' , name: 'Coffee2'},
    { imageUrl : './assets/coffee7.jpg' , name: 'Coffee2'},
    { imageUrl : './assets/coffee8.jpg' , name: 'Coffee3'}
   ]
}
