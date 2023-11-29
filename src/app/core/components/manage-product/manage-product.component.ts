import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../../services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit{


  displayedColumns: string[] = ['id', 'categoryId', 'name', 'price', 'status', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator
  checked = false;
  active: any;

  constructor(private ngxService: NgxUiLoaderService,
    private userService: UserService) {}

  ngOnInit(): void {
      this.ngxService.start();
      this.userService.getProduct().subscribe((res: any) => {
        console.log('products:', res);
        this.active = res.response.status;
        if(this.active === true) {
          this.checked = true;
        }
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(res.response);
        this.dataSource.paginator = this.paginator;
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
