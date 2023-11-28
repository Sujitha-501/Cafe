import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { BestSellerComponent } from './components/best-seller/best-seller.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';
import { BannerComponent } from './components/banner/banner.component';
import { CategoryComponent } from './components/category/category.component';
import { FooterComponent } from './components/footer/footer.component';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ManageCategoryComponent } from './components/manage-category/manage-category.component';



@NgModule({
  declarations: [
    HomeComponent,
    BestSellerComponent,
    DashboardComponent,
    BannerComponent,
    CategoryComponent,
    FooterComponent,
    NavbarComponent,
    ManageCategoryComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    AuthModule
  ]
})
export class CoreModule { }
