import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannerComponent } from './core/components/banner/banner.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginGuard } from './auth/services/login.guard';
import { HomeComponent } from './core/components/home/home.component';
import { AuthGuard } from './auth/services/auth.guard';

const routes: Routes = [
  { path: '', component: BannerComponent },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard]},
  { path: 'app', component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
