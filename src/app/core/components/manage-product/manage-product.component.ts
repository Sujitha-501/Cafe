import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductDialogComponent } from 'src/app/shared/components/product-dialog/product-dialog.component';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {


  displayedColumns: string[] = ['id', 'categoryId', 'name', 'price', 'status', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator
  // checked = true;
  active: any;
  message: any;

  constructor(private ngxService: NgxUiLoaderService,
    private userService: UserService,
    private dialogService: DialogService,
    private snackbarService: SnackbarService,
    private authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.createProductTable();

    this.authService.messages.subscribe(res => this.message = res);
  }

  createProductTable() {
    this.userService.getProduct().subscribe((res: any) => {
      if (res) {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(res.response);
        this.dataSource.paginator = this.paginator;
      } else {
        this.ngxService.stop();
      }

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddProduct() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.data = {
      action: 'Add'
    }
    const dialogRef = this.dialog.open(ProductDialogComponent, dialogConfig);
    dialogRef.componentInstance.onAddProduct.subscribe(res => {
      this.createProductTable();
    })
  }

  onEdit(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.data = {
      action: 'Update',
      data: element
    }
    const dialogRef = this.dialog.open(ProductDialogComponent, dialogConfig);
    dialogRef.componentInstance.onEditProduct.subscribe(res => {
      this.createProductTable();
    })
  }

  onDelete(element: any) {
    const dialogRef = this.dialogService.openConfirmationDialog(this.message.DELETE, 'custome-dialog');
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res) {
        this.ngxService.start();
        this.userService.deleteProduct({ id: element.id }).subscribe((res: any) => {
          if (res.deletePro) {
            this.ngxService.stop();
            this.snackbarService.openSnackbar(this.message.DELETE_PRODUCT, 'Success');
            this.createProductTable();
          }
        })
      }
    })
  }

  onChange(status: any, id: any) {
    this.ngxService.start();
    var data = {
      status: status.toString(),
      id: id
    }
    this.userService.updateProduct(data).subscribe((res: any) => {
      this.ngxService.stop();
      this.snackbarService.openSnackbar(this.message.PRODUCT_STATUS, 'Success');
    }, (error: any) => {
      this.ngxService.stop();
      console.log(error);
    })
  }

}
