import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  message: any;
  show!: boolean;
  constructor(private snackbarService: SnackbarService,
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.messages.subscribe(res => this.message = res);
    this.signupForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z]{4,20}')]),
      email: new FormControl(null, [Validators.required, Validators.required, Validators.pattern('[a-zA-Z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
      contactNumber: new FormControl(null, [Validators.required, Validators.pattern('^[e0-9]{10,10}$')]),
      password: new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z0-9@#$%^&*]{5,}$')]),
      role: new FormControl('user'),
      status: new FormControl('false')
    });
  }

  onRegister() {
    if (this.signupForm.valid) {
      this.ngxService.start();
      this.userService.signup(this.signupForm.value).subscribe((res: any) => {
        this.snackbarService.openSnackbar(this.message.REGISTER, 'Success');
        this.ngxService.stop();
      });
    }
  }
}
