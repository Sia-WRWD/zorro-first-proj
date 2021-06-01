import { Component, OnInit } from '@angular/core';
import { FetchAdminDataService } from 'src/app/service/fetch-admin-data.service';

export interface data {
  admin_id: number;
  admin_username: string;
  admin_email: string;
  admin_firstname: string;
  admin_lastname: string;
  admin_timecreated: string;
  disabled: boolean;
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  checked = false;
  loading = false;
  indeterminate = false;
  fetchAdminData: ReadonlyArray<data> = [];
  listofCurrentFetchAdminData: ReadonlyArray<data> = [];
  setofCheckedId = new Set<number>();

  constructor(private _fetchAdminDataService: FetchAdminDataService) { }

  ngOnInit(): void {
    this.loadAdminData();
  }

  //Fetch Admin Data
  loadAdminData() {
    this._fetchAdminDataService.getAdminData().subscribe((res) => {
      this.fetchAdminData = res;
      console.log(this.fetchAdminData);
    }, (error) => {
      console.log('Error Encountered: ', error);
    });
  }

  //
  UpdateCheckedSet(admin_id: number, checked: boolean): void {
    if (checked) {
      this.setofCheckedId.add(admin_id);
    } else {
      this.setofCheckedId.delete(admin_id);
    }
  }

  onCurrentPageDataChange(listofCurrentFetchAdminData: ReadonlyArray<data>): void {
    this.listofCurrentFetchAdminData = listofCurrentFetchAdminData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listofEnabledData = this.listofCurrentFetchAdminData.filter(({ disabled }) => !disabled);
    this.checked = listofEnabledData.every(({ admin_id }) => this.setofCheckedId.has(admin_id));
    this.indeterminate = listofEnabledData.some(({ admin_id }) => this.setofCheckedId.has(admin_id)) && !this.checked;
  }

  onItemChecked(admin_id: number, checked: boolean): void {
    this.UpdateCheckedSet(admin_id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listofCurrentFetchAdminData.filter(({ disabled }) => !disabled).forEach(({ admin_id }) => this.UpdateCheckedSet(admin_id, checked));
    this.refreshCheckedStatus();
  }


}
