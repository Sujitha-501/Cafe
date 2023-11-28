import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/core/services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {

  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  dialogAction: any = 'Add';
  categoryForm!: FormGroup;
  message: any;
  getId: any;
  categoryDetail: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private authService: AuthService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService) { }

  ngOnInit() {
    if(this.data?.action === 'Update') {
      this.dialogAction = this.data.action;
      this.getId = this.data.data?.id;
      this.userService.getOneCategory({ id: this.getId }).subscribe((res: any) => {
        this.categoryDetail = res.categoryDetails;
        this.formInitialize();
      });
    }
   
    this.authService.messages.subscribe(res => this.message = res);
    this.categoryForm = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });
  }

  formInitialize() {
    this.categoryForm = new FormGroup({
      name: new FormControl(this.categoryDetail && this.categoryDetail.name ? this.categoryDetail.name : null, [Validators.required])
    });
  }

  onCreateCategory() {
    this.ngxService.start();
    if (this.categoryForm.valid && !this.data) {
      this.dialogAction = 'Add'
        this.userService.createCategory(this.categoryForm.value).subscribe((res: any) => {
          if (res) {
            this.onAddCategory.emit();
            this.ngxService.stop();
            this.snackbarService.openSnackbar(this.message.ADD_CATEGORY, 'Success');
          } else {
            this.ngxService.stop();
            this.snackbarService.openSnackbar(this.message.ERROR_DATA, 'Error');
          }
        })
    }
    else {
      this.categoryForm.value.id = +this.getId;
      this.userService.updateCategory(this.categoryForm.value).subscribe((res: any) => {
        if(res) {
          this.onEditCategory.emit();
          this.ngxService.stop();
          this.snackbarService.openSnackbar(this.message.UPDATE_CATEGORY, 'Success');
        } else {
          this.ngxService.stop();
          this.snackbarService.openSnackbar(this.message.UPDATE_ERROR, 'Error');
        }
      })
    }
  }

}
