import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannerComponent } from './core/components/banner/banner.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { AuthGuard } from './auth/services/auth.guard';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { LoginComponent } from './auth/components/login/login.component';
import { LoginGuard } from './auth/services/login.guard';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: BannerComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'cafe', component: NavbarComponent, canActivate: [AuthGuard] , children : [
    { path: 'dashboard', component: DashboardComponent}
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
