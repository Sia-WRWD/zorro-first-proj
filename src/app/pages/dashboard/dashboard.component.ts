import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  array = ["I", "Love", "You", "UwU"]
  gridStyle = { width: '50%', textAlign: 'center' };
  isVisible1 = false;
  isVisible2 = false;
  isVisible3 = false;
  isVisible4 = false;
  isVisible5 = false;
  isVisible6 = false;
  isVisible7 = false;
  isVisible8 = false;

  constructor() { }

  ngOnInit(): void {

  }

  onValueChange(value: Date): void {
    console.log(`Current value: ${value}`);
  }

  onPanelChange(change: { date: Date; mode: string }): void {
    console.log(`Current value: ${change.date}`);
    console.log(`Current mode: ${change.mode}`);
  }

  showModal1(): void {
    this.isVisible1 = true;
  }

  showModal2(): void {
    this.isVisible2 = true;
  }

  showModal3(): void {
    this.isVisible3 = true;
  }
  showModal4(): void {
    this.isVisible4 = true;
  }

  showModal5(): void {
    this.isVisible5 = true;
  }

  showModal6(): void {
    this.isVisible6 = true;
  }

  showModal7(): void {
    this.isVisible7 = true;
  }

  showModal8(): void {
    this.isVisible8 = true;
  }

  handleOk(): void {
    this.isVisible1 = false;
    this.isVisible2 = false;
    this.isVisible3 = false;
    this.isVisible4 = false;
    this.isVisible5 = false;
    this.isVisible6 = false;
    this.isVisible7 = false;
    this.isVisible8 = false;
  }

  handleCancel(): void {
    this.isVisible1 = false;
    this.isVisible2 = false;
    this.isVisible3 = false;
    this.isVisible4 = false;
    this.isVisible5 = false;
    this.isVisible6 = false;
    this.isVisible7 = false;
    this.isVisible8 = false;
  }

}

