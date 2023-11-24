import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  details = [
    { type: 'Success', icon: 'check', panelClass: 'snackbar-success' },
    { type: 'Error', icon: 'error', panelClass: 'snackbar-error' },
    { type: 'Warning', icon: 'warning', panelClass: 'snackbar-warning' },
    { type: 'Info', icon: 'priority_high', panelClass: 'snackbar-info' },
    { type: 'Default', icon: 'data_usage', panelClass: 'snackbar-default' }

  ]
  constructor(public snackBar: MatSnackBar) { }

  openSnackbar(message: string, type: string, duration?: number, panelClass?: string) {
    const property = this.details.find(x => x.type === type);
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: {
        message: message,
        icon: property?.icon,
      },
      duration: duration ? duration : 3000,
      panelClass: panelClass ? panelClass : property?.panelClass
    })
  }
}
