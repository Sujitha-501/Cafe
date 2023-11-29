import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {

  productForm!: FormGroup;
  message: any;
  categoryList : any = [];
  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  productDetails: any;
  getProductId: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {

    this.authService.messages.subscribe(res => this.message = res);

    this.userService.getCategory().subscribe((res: any) => {
      if(res) {
        this.categoryList = res.response;
      } 
    });

    if(this.data?.data) {
      this.getProductId = this.data?.data.id ;
      this.userService.getOneProduct({id: this.getProductId}).subscribe((res: any) => {
        if(res) {
          this.productDetails= res.response;
          this.intializeForm();
        }
      })
    }

    this.productForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      categoryId: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, [Validators.required, Validators.pattern('[0-9]{1,5}')]),
      status: new FormControl('true')
    });
  }

  intializeForm() {
    this.productForm = new FormGroup({
      name: new FormControl(this.productDetails.name ? this.productDetails.name : null, Validators.required),
      categoryId: new FormControl(this.productDetails.categoryId ? this.productDetails.categoryId : null, Validators.required),
      description: new FormControl(this.productDetails.description ? this.productDetails.description : null, Validators.required),
      price: new FormControl(this.productDetails.price ? this.productDetails.price : null, [Validators.required, Validators.pattern('[0-9]{1,5}')]),
      status: new FormControl(this.productDetails.status ? this.productDetails.status : null)
    });
  }

  OnSaveProduct() {
    this.ngxService.start();
    if(this.productForm.valid) {
      if(this.data?.action != 'Update') {
        this.userService.createProduct(this.productForm.value).subscribe((res: any) => {
          if(res){
            console.log('Create Product: ', res);
            this.ngxService.stop();
            this.onAddProduct.emit();
            this.snackbarService.openSnackbar(this.message.ADD_PRODUCT, 'Success');
          } else{
            this.ngxService.stop();
            this.snackbarService.openSnackbar(this.message.SAVE_ERROR, 'Error')
          }
        })
      } else {
        this.productForm.value.id = +this.getProductId
        this.userService.updateProduct(this.productForm.value).subscribe((res: any) => {
          if(res) {
            console.log('update product: ',res);
            this.ngxService.stop();
            this.onEditProduct.emit();
            this.snackbarService.openSnackbar(this.message.UPDATE_PRODUCT, 'Success');            
          } else {
            this.ngxService.stop();
            this.snackbarService.openSnackbar(this.message.UPDATE_ERROR, 'Error');
          }
        })
      }
    }
  }

}
