import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AuthService } from '../../services/auth.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  messages!: Observable<any>;
  errorMessage!: string;
  error!: boolean;
  message: any;
  constructor(private router: Router,
              private snackbarService: SnackbarService,
              private ngxService: NgxUiLoaderService,
              private authService: AuthService) {}

  ngOnInit(): void {
      this.loginForm = new FormGroup({
        email: new FormControl(null, [Validators.required,Validators.required, Validators.pattern('[a-zA-Z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
        password: new FormControl(null, Validators.required),
      });
      this.authService.messages.subscribe(res => this.message = res);
  }

  onRegister(){
    if(this.loginForm.valid) {
      console.log('Form: ', this.loginForm.value);
      this.ngxService.start();
      this.authService.signIn(this.loginForm.value).subscribe((response: any) => {
        if (response && response['user']) {
          console.log('response: ', response);
          this.ngxService.stop();
          this.snackbarService.openSnackbar(this.message.LOGIN , 'Success');
          this.router.navigate(['/cafe']);
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
