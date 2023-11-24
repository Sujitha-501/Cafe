import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  messages!: Observable<any>;
  errorMessage!: string;
  error!: boolean;
  constructor(private router: Router,
              private snackbarService: SnackbarService,
              private dialogRef: MatDialogRef<SignupComponent>,
              private ngxService: NgxUiLoaderService,
              private authService: AuthService) {}

  ngOnInit(): void {
      this.signupForm = new FormGroup({
        name: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
        contactNumber: new FormControl(null, [Validators.required, Validators.pattern('^[e0-9]{10,10}$')]),
        password: new FormControl(null),
        role: new FormControl('user'),
        status: new FormControl('active')
      });
  }

  onRegister(){
    console.log('clicked')
    if(this.signupForm.valid) {
      console.log('Form: ', this.signupForm.value);
      this.ngxService.start();
      this.authService.signIn(this.signupForm.value).subscribe((response: any) => {
        if (response && response['user']) {
          console.log('response: ', response);
          this.ngxService.stop();
          this.snackbarService.openSnackbar('Registered Successfully', 'Success');
          this.router.navigate(['/app']);
        }
      }, (err) => {
        if (err.error && err.error.error) {
          this.errorMessage = err.error.error;
          this.error = true;
        };

      })
    }
    }
  }
