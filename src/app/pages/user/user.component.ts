import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchUserDataService } from 'src/app/service/fetch-user-data.service';

export interface udata {
  user_id: string;
  user_username: string;
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_timecreated: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  fetchUserData: ReadonlyArray<udata> = [];
  // editCache: { [key: string]: { edit: boolean; data: udata } } = {};

  constructor(
    private _fetchUserDataService: FetchUserDataService, 
    private router: Router
    ) { }

  ngOnInit() {
    this._fetchUserDataService.getUserData().subscribe((res) => {
      this.fetchUserData = res;
      console.log(this.fetchUserData);  
    }, (error) => {
      console.log('Error Encountered: ', error);
    });
    // this.updateEditCache();
  }

  //Fetch Data
  loadUserData() {
    this._fetchUserDataService.getUserData().subscribe((res) => {
      this.fetchUserData = res;
      console.log(this.fetchUserData);
    }, (error) => {
      console.log('Error Encountered: ', error);
    });
  }

  //Edit Data
  // startEdit(user_id: string): void {
  //   this.editCache[user_id].edit = true;
  // }

  // cancelEdit(user_id: string): void {
  //   const index = this.fetchUserData.findIndex(item => item.user_id === user_id);
  //   this.editCache[user_id] = {
  //     data: {...this.fetchUserData[index] },
  //     edit: false
  //   };
  // }

  // saveEdit(user_id: string): void {
  //   const index = this.fetchUserData.findIndex(item => item.user_id === user_id);
  //   Object.assign(this.fetchUserData[index], this.editCache[user_id].data);
  //   this.editCache[user_id].edit = false;
  // }

  // updateEditCache(): void {
  //   this.fetchUserData.forEach(item => {
  //     this.editCache[item.user_id] = {
  //       edit: false,
  //       data: { ...item }
  //     };
  //   });
  // }

}
