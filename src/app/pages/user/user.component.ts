import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchUserDataService } from 'src/app/service/fetch-user-data.service';

export interface data {
  user_id: number;
  user_username: string;
  user_email: string;
  user_firstname: string;
  user_lastname: string;
  user_timecreated: string;
  disabled: boolean;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  fetchUserData:data[] = [];

  constructor(private _fetchUserDataService: FetchUserDataService, private router: Router) { }

  ngOnInit() {
    this.loadUserData();
  }

  loadUserData() {
    this._fetchUserDataService.getUserData().subscribe((res) => {
      this.fetchUserData = res;
      console.log(this.fetchUserData);
    }, (error) => {
      console.log('Error Encountered: ', error);
    });
  }

  directRegister() {
    this.router.navigate(['/RegisterU']);
  }


}
