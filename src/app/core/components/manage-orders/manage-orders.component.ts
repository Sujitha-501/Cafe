import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from '../../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss']
})
export class ManageOrdersComponent implements OnInit {

  ordersForm!: FormGroup;
  message: any;
  categoryList: any;
  productList: any;
  selectedGroup: any;
  getPrice: any;
  quantityValue: any;
  payment = [
    { id: 1, name: 'Cash' },
    { id: 2, name: 'Credit Card' },
    { id: 3, name: 'Debit Card' }
  ]

  constructor(private authService: AuthService,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.authService.messages.subscribe(res => this.message = res);

    this.userService.getCategory().subscribe((res: any) => {
      if (res) {
        this.ngxService.stop();
        this.categoryList = res.response;
      } else {
        this.ngxService.stop();
      }
    });


    this.ordersForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      contactNumber: new FormControl(null, [Validators.required]),
      paymentMode: new FormControl(null, [Validators.required]),
      category: new FormControl(null, Validators.required),
      product: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      total: new FormControl(0, Validators.required)
    });
  }

  onSelect() {
    const selectedCategoryId = this.ordersForm.get('category')?.value;
    console.log('selectedCategoryId:', selectedCategoryId);
    if (selectedCategoryId) {
      this.userService.getProductById({ id: selectedCategoryId }).subscribe((res: any) => {
        if (res) {
          this.productList = res.response;
        }
      },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  onSelectProduct() {
    const selectedProductId = this.ordersForm.get('product')?.value;
    console.log('selectedProductId', selectedProductId);
    if (selectedProductId) {
      this.userService.getOneProduct({ id: selectedProductId }).subscribe((res: any) => {
        if (res) {
          this.getPrice = res.response.price;
          console.log('getPrice:', this.getPrice);
          this.ordersForm.controls['price'].setValue(this.getPrice);
          this.ordersForm.controls['quality'].setValue(1);
          this.ordersForm.controls['total'].setValue(this.getPrice * 1);
        }
      })
    }
  }

  onQuantity() {
    console.log('quantitys', this.quantityValue);
    this.ordersForm.controls['total'].setValue(this.getPrice * this.quantityValue);
  }

  notType(event: any) {
    if(event) {
      return false;
    };
  }

  allowPositiveNumbers(event: any) {
    const allowedKeys = ['Backspace', 'Delete'];
    const isShiftKey = event.shiftKey;
    const isAltKey = event.altKey;
    if (allowedKeys.includes(event.key)) {
      return true;
    }
    if (!isShiftKey && !isAltKey && /^[0-9]$/.test(event.key)) {
      return true;
    }
    event.preventDefault();
    return false;
  }
  
  
}
