import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private userService: UserService,
    private ngxService: NgxUiLoaderService,) {}

  ngOnInit() {
    this.ngxService.start();
    this.userService.getCategoryCount().subscribe((res: any) => {
      console.log('Category Count:', res.categoryCount);
    });
    this.userService.getProductCount().subscribe((res: any) => {
      console.log('Product Count:', res.productCount);
      this.ngxService.stop();
    });

  }

}
