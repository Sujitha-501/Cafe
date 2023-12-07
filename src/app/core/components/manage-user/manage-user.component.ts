import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit{

  displayedColumns: string[] = ['id', 'name', 'email', 'contactNumber', 'status'];
  dataSource: any;
  message: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    private authService: AuthService) {}

  ngOnInit(): void {

    this.authService.messages.subscribe(res => this.message = res);
    this.ngxService.start();
      this.userService.getDetails().subscribe((res: any) => {
        console.log('Details: ', res);    
        if(res) {
          this.dataSource = new MatTableDataSource(res.response);
          this.dataSource.paginator = this.paginator;
          this.ngxService.stop();
        }    
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onChange(status: any, id:any) {
    this.ngxService.start();
    var data = {
      status :  status.toString(),
      id: id
    }
    this.userService.updateUser(data).subscribe((res: any) => {
      this.ngxService.stop();
      this.snackbarService.openSnackbar(this.message.USER_STATUS, 'Success');
    }, (error: any) => {
      this.ngxService.stop();
      console.log(error);      
    })
  }

}
