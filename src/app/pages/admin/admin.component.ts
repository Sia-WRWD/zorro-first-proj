import { Component, OnInit } from '@angular/core';
import { FetchAdminDataService } from 'src/app/service/fetch-admin-data.service';

export interface AdminData {
  admin_id: number;
  admin_username: string;
  admin_email: string;
  admin_firstname: string;
  admin_lastname: string;
  admin_timecreated: string;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  listofFetchAdminData: AdminData[] = [];

  constructor(private _fetchAdminDataService: FetchAdminDataService) { }

  ngOnInit(): void {
    this.loadAdminData();
  }

  //Fetch Admin Data
  loadAdminData() {
    this._fetchAdminDataService.getAdminData().subscribe((res) => {
      this.listofFetchAdminData = res;
      console.log(this.listofFetchAdminData);
    }, (error) => {
      console.log('Error Encountered: ', error);
    });
  }
}
