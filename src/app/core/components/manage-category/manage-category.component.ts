import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CategoryDialogComponent } from 'src/app/shared/components/category-dialog/category-dialog.component';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit{

  constructor(private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog) {}

    displayedColumns: string[] = ['id', 'name', 'edit'];
    dataSource: any;
    @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  ngOnInit() {
    this.ngxService.start();
    this.createTable();
  }

  createTable(){
    this.userService.getCategory().subscribe((res: any) => {
      if(res) {
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

  onAddCategory() {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width= "500px";    
      const dialogRef = this.dialog.open(CategoryDialogComponent, dialogConfig);
      dialogRef.componentInstance.onAddCategory.subscribe((res) => {
        this.createTable();
      })
  }

  onEditCategory(element: any){ 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.data = {
      action :'Update',
     data: element 
    }
    const dialogRef = this.dialog.open(CategoryDialogComponent, dialogConfig);
    dialogRef.componentInstance.onEditCategory.subscribe(() => {
      this.createTable();
    });
  }

}
