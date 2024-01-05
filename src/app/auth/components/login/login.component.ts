import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  messages!: Observable<any>;
  errorMessage!: string;
  error!: boolean;
  message: any;
  role!: string;
  status: any;
  show!: boolean;
  userDetails: any[] = [];
  constructor(private router: Router,
    private snackbarService: SnackbarService,
    private ngxService: NgxUiLoaderService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.required, Validators.pattern('[a-zA-Z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
      password: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9@#$%^&*]{5,}$')]),
    });
    this.authService.messages.subscribe(res => this.message = res);
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.ngxService.start();
      this.authService.signIn(this.loginForm.value).subscribe((response: any) => {
        if (response && response['user']) {
          this.userDetails = response.user;
          this.role = response.user.role;
          this.status = response.user.status;
          // Store both role and status in the AuthService
          this.authService.setUserRole(this.role);
          this.authService.userData(this.userDetails);
          this.ngxService.stop();
          if (this.status == 'true') {
            this.snackbarService.openSnackbar(this.message.LOGIN, 'Success');
            this.router.navigate(['/cafe/dashboard']);
          } else {
            this.snackbarService.openSnackbar(this.message.INACTIVE_USER, 'Info');
            this.router.navigate(['/app']);
          }
        }
      }, (err) => {
        if (err.error && err.error.error) {
          this.ngxService.stop();
          this.snackbarService.openSnackbar(this.message.ERROR, 'Error');
          this.errorMessage = err.error.error;
          this.error = true;
        };

      })
    }
  }

}
