import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductDialogComponent } from 'src/app/shared/components/product-dialog/product-dialog.component';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit{


  displayedColumns: string[] = ['id', 'categoryId', 'name', 'price', 'status', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator
  checked = true;
  active: any;

  constructor(private ngxService: NgxUiLoaderService,
    private userService: UserService,
    private dialog: MatDialog) {}

  ngOnInit(): void {
      this.ngxService.start();
      this.createProductTable();
  }

  createProductTable() {
    this.userService.getProduct().subscribe((res: any) => {
      console.log('products:', res);
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(res.response);
      this.dataSource.paginator = this.paginator;
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

}
