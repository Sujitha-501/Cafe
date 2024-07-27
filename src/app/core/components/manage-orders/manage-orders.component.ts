import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from '../../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared/services/dialog.service';
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
  categoryName: any;
  payment = [
    { id: 1, name: 'Cash' },
    { id: 2, name: 'Credit Card' },
    { id: 3, name: 'Debit Card' }
  ];
  dataSource!: MatTableDataSource<any>;
  displayedColumns = ['product', 'category', 'quantity', 'price', 'total', 'action'];
  TableData: any[] = [];
  userDatas: any;

  constructor(private authService: AuthService,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private ngxService: NgxUiLoaderService,
    private dialog: DialogService) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.authService.messages.subscribe(res => this.message = res);  
    this.userDatas = this.authService.getData();
    if(this.userDatas) {
      console.log('User name: ', this.userDatas);
      this.setUserDetails();
    }
    this.userService.getCategory().subscribe((res: any) => {
      if (res) {
        this.ngxService.stop();
        this.categoryList = res.response;
      } else {
        this.ngxService.stop();
      }
    });

    // this.ordersForm = new FormGroup({
    //   name: new FormControl(null, [Validators.required]),
    //   email: new FormControl(null, [Validators.required]),
    //   contactNumber: new FormControl(null, [Validators.required]),
    //   paymentMode: new FormControl(null, [Validators.required]),
    //   category: new FormControl(null, Validators.required),
    //   product: new FormControl(null, Validators.required),
    //   quantity: new FormControl(null, Validators.required),
    //   price: new FormControl(null, Validators.required),
    //   total: new FormControl(0, Validators.required)
    // });
  };

  setUserDetails() { 
    this.ordersForm = new FormGroup({
      name: new FormControl(this.userDatas && this.userDatas.name ? this.userDatas.name : null, [Validators.required, Validators.pattern('[a-zA-Z]{4,20}')]),
      email: new FormControl(this.userDatas && this.userDatas.email ? this.userDatas.email : null, [Validators.required, Validators.pattern('[a-zA-Z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
      contactNumber: new FormControl(this.userDatas && this.userDatas.contactNumber ? this.userDatas.contactNumber : null,  [Validators.required, Validators.pattern('^[e0-9]{10,10}$')]),
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
    if (selectedCategoryId) {
      this.userService.getProductById({ id: selectedCategoryId, status: 'true' }).subscribe((res: any) => {
        if (res) {
          this.productList = res.response;
          // Reset product, price, quantity, and total
          this.ordersForm.controls['product'].setValue(null);
          this.ordersForm.controls['price'].setValue(null);
          this.ordersForm.controls['quantity'].setValue(null);
          this.ordersForm.controls['total'].setValue(null);
        }
      },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  onSelectProduct() {
    const selectedProductId = this.ordersForm.get('product')?.value;
    if (selectedProductId) {
      this.userService.getProductByName({ name: selectedProductId }).subscribe((res: any) => {
        if (res) {
          this.getPrice = res.response.price;
          this.categoryName = res.response.category.name;
          this.ordersForm.controls['price'].setValue(this.getPrice);
          this.ordersForm.controls['quantity'].setValue(1);
          this.calculateTotal();
        }
      })
    }
  };

  onQuantity() {
    this.calculateTotal();
  };

  calculateTotal() {
    const price = this.ordersForm.controls['price'].value;
    const quantity = this.ordersForm.controls['quantity'].value;
    this.ordersForm.controls['total'].setValue(price * quantity);
  };

  notType(event: any) {
    if (event) {
      return false;
    };
  };

  allowPositiveNumbers(event: any) {
    const allowedKeys = ['Backspace', 'Delete'];
    const isShiftKey = event.shiftKey;
    const isAltKey = event.altKey;
    if (allowedKeys.includes(event.key)) {
      return true;
    }
    if (!isShiftKey && !isAltKey && /^[0-9]$/.test(event.key)) {
      if (event.target.value.length === 0 && event.key === '0') {
        return false;
      }
      return true;
    }
    event.preventDefault();
    return false;
  };

  onAddProduct() {
    if (this.ordersForm.valid) {
      // this.TableData.push(this.ordersForm.value);
      const tableRow = { ...this.ordersForm.value, categoryName: this.categoryName };
      this.TableData.push(tableRow);
      console.log('save: ', this.TableData);
      this.dataSource = new MatTableDataSource(this.TableData);
      // this.ordersForm.reset();      
      // Reset product, price, quantity, and total
      this.ordersForm.controls['category'].setValue(null);
      this.ordersForm.controls['product'].setValue(null);
      this.ordersForm.controls['price'].setValue(null);
      this.ordersForm.controls['quantity'].setValue(null);
      this.ordersForm.controls['total'].setValue(null);
    }
  };

  onDelete(element: any) {
    const dialogRef = this.dialog.openConfirmationDialog(this.message.DELETE, 'custome-dialog');
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        const index = this.TableData.indexOf(element);
        if (index !== -1) {
          this.TableData.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.TableData);
        }
      }
    });
  };

  billData: any;

  onPlaceOrder() {
    this.userService.createOrder(this.TableData).subscribe((res: any) => {
      this.ngxService.start();
      console.log('order Table:', res);
      if(res) {
        this.ordersForm.reset(); 
        this.ngxService.stop();
      }      
    }, (error) => {
      this.ngxService.stop();
      console.log('error', error);      
    });

    
    this.billData = this.ordersForm.value;
    const totalSum = this.TableData.reduce((sum, item) => sum + item.total, 0);
    var data = {
      name: this.billData.name,
      email: this.billData.email,
      contactNumber: this.billData.contactNumber,
      paymentMode: this.billData.paymentMode,
      totalAmount: totalSum
    }
    console.log('data: ', data);
    this.userService.createBills(data).subscribe((res: any) => {
      console.log('Bills:', res);
      if(res) {   
        this.snackbarService.openSnackbar('Order Palced Successfully', 'Success');     
        this.ngxService.stop();
      }
    })
  };

}
