import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acc-profile',
  templateUrl: './acc-profile.component.html',
  styleUrls: ['./acc-profile.component.css']
})
export class AccProfileComponent implements OnInit {

  visible1 = false;
  visible2 = false;
  visible3 = false;
  visible4 = false;

  constructor() { }

  ngOnInit(): void {
  }

  open1(): void {
    this.visible1 = true;
    this.visible2 = false;
    this.visible3 = false;
    this.visible4 = false;
  }

  open2(): void {
    this.visible2 = true;
    this.visible1 = false;
    this.visible3 = false;
    this.visible4 = false;
  }

  open3(): void {
    this.visible3 = true;
    this.visible4 = false;
    this.visible2 = false;
    this.visible1 = false;
  }

  open4(): void {
    this.visible4 = true;
    this.visible3 = false;
    this.visible2 = false;
    this.visible1 = false;
  }

  close(): void {
    this.visible1 = false;
    this.visible2 = false;
    this.visible3 = false;
    this.visible4 = false;
  }


}
