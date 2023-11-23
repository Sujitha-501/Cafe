import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { BannerComponent } from './core/components/banner/banner.component';

const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full'},
  {path : 'app', component: BannerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
