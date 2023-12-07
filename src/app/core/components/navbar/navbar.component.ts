import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  private role: string;

  constructor(private authService: AuthService) {
    this.role = authService.getUserRole();
  }

  logOut() {
    this.authService.logOut();
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

}
