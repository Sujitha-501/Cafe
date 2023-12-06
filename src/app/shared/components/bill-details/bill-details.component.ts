import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.scss']
})
export class BillDetailsComponent implements OnInit {

  dialogAction: any;
  displayedColumns = ['product', 'categoryName', 'quantity', 'price', 'total'];
  dataSource!: MatTableDataSource<any>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    console.log('data: ', this.data);
    this.userService.getAllOrders({ email: this.data.email, modified: this.data.modified }).subscribe((res: any) => {
      if (res) {
        console.log('Order: ', res);
        this.dataSource = new MatTableDataSource(res.response);
        this.ngxService.stop();
      } else {
        this.ngxService.stop();
      }
    });
  }

}
