import { Component } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HeaderService } from './core/services/header.service';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Store';
  apiUrl = environment.apiUrl;
  constructor(private authService: AuthService, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.authService.getMessages();
    this.headerService.setHeaders(this.apiUrl + 'v1/login', 'content-type', 'application/json');
  }
}
