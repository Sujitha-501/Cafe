import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialogServices: MatDialog) { }

  openConfirmationDialog(message: string, className?: string) {
    const dialogRef = this.dialogServices.open(DialogComponent, {
      data: {
        header: 'Confirmation',
        content: message,
        actionType: 'Confirmation'
      },
      autoFocus: false
    });
    return dialogRef;
  };

  openSuccessDialog(message: string, className?: string) {
    const dialogRef = this.dialogServices.open(DialogComponent, {
      data: {
        header: 'Success',
        content: message,
        actionType: 'Success'
      },
      autoFocus: false
    });
    return dialogRef;
  };

  openMessageDialog(message: string, className?: string) {
    const dialogRef = this.dialogServices.open(DialogComponent, {
      data: {
        header: 'Message',
        content: message,
        actionType: 'Message'
      },
      autoFocus: false
    });
    return dialogRef;
  };
}
