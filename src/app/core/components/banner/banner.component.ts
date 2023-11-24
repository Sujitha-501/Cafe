import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/auth/components/login/login.component';
import { SignupComponent } from 'src/app/auth/components/signup/signup.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, OnDestroy {
  array = [
    {
      img: "assets/banner4.jpg",
      text1: "Design To Transform",
      text2: "Their Household Chores",
      btn: "Discover Now"
    },
    {
      img: "assets/banner1.jpg",
      text1: "Design To Transform",
      text2: "Their Household Chores",
      btn: "Discover Now"
    },
    {
      img: "assets/banner2.jpg",
      text1: "Design To Transform",
      text2: "Their Household Chores",
      btn: "Discover Now"
    }
  ]

  selectedIndex = 0
  interval: any;
  imgAnimation: boolean = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.slider();
  }

  slider() {
    if (this.array.length) {
      this.interval = setInterval(() => {
        this.imgAnimation = true;
        this.selectedIndex = this.selectedIndex < this.array.length - 1 ? ++this.selectedIndex : 0;
        setTimeout(() => {
          this.imgAnimation =false;
        }, 2000);
      }, 6000)
    }
  }

  onClick(index: number) {
    clearInterval(this.interval);
    this.selectedIndex = index;
    this.slider();
  } 

  openSignupDialog() {
    const dialogRef = new MatDialogConfig();
    dialogRef.width= "500px";
    this.dialog.open(SignupComponent, dialogRef)
  }

  openLoginDialog() {
    const dialogRef = new MatDialogConfig();
    dialogRef.width= "400px";
    this.dialog.open(LoginComponent, dialogRef)
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
