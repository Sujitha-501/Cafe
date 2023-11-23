import { Component, OnDestroy, OnInit } from '@angular/core';

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

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
