import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  categoryCount!: boolean;
  productCount!: boolean;

  constructor(private userService: UserService,
    private ngxService: NgxUiLoaderService,) {}

  ngOnInit() {
    this.ngxService.start();
    this.userService.getCategoryCount().subscribe((res: any) => {
      this.categoryCount = res.categoryCount
    });
    this.userService.getProductCount().subscribe((res: any) => {
      this.productCount = res.productCount
      this.ngxService.stop();
    });

  }

}
