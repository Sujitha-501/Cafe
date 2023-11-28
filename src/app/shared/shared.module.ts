import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './components/dialog/dialog.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { MaterialModule } from '../material/material.module';
import { CategoryDialogComponent } from './components/category-dialog/category-dialog.component';



@NgModule({
  declarations: [
    DialogComponent,
    SnackbarComponent,
    CategoryDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
