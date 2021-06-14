import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { FetchAdminDataService } from 'src/app/service/fetch-admin-data.service';
import { updateDetails } from 'src/app/shared/update';
import { deleteDetails } from 'src/app/shared/delete';
import { UpdateAdminDataService } from 'src/app/service/update-admin-data.service';
import { DeleteAdminDataService } from 'src/app/service/delete-admin-data.service';
import { Router } from '@angular/router';

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

  updateModel = new updateDetails;
  updateForm: FormGroup;
  updateFormVisible = false;

  deleteModel = new deleteDetails;
  deleteForm: FormGroup;
  deleteFormVisible = false;

  listofFetchAdminData: AdminData[] = [];

  constructor (
    private _fetchAdminDataService: FetchAdminDataService,
    private fb: FormBuilder,
    private _updateAdminDataService: UpdateAdminDataService,
    private _deleteAdminDataService: DeleteAdminDataService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.loadAdminData();
    this.initializeUpdateForm();
    this.initalizeDeleteForm();
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

  //Update Form
  initializeUpdateForm(): void {
    this.updateForm = this.fb.group({
      old_email: ['', [Validators.email, Validators.required]],
      up_email: ['', [Validators.email, Validators.required]],
      up_firstName: ['', [Validators.required]],
      up_lastName: ['', [Validators.required]]
    })
  }

  submitUpdateForm(uf: NgForm) {
    for (const i in this.updateForm.controls) {
      this.updateForm.controls[i].markAsDirty();
      this.updateForm.controls[i].updateValueAndValidity();
    }
    console.log(this.updateForm);
    this._updateAdminDataService.updateAD(this.updateModel)
    .subscribe(
      data => {
        console.log('Success', data),
          alert("Succesfully Updated Admin Data!"),
          this.router.navigate(['welcome/register-success']);
      },
      error => {
        console.error('Error', error),
          alert("Update For Admin Data Failed!"),
          this.router.navigate(['welcome/register-fail']);
      });
  }

  openUpdateForm(): void {
    this.updateFormVisible = true;
  }

  close(): void {
    this.updateFormVisible = false;
    this.deleteFormVisible = false;
  }

  //Delete Form
  initalizeDeleteForm(): void {
    this.deleteForm = this.fb.group({
      del_email: ['', [Validators.email, Validators.required]],
      del_username: ['', [Validators.required]]
    })
  }

  openDeleteForm(): void {
    this.deleteFormVisible = true;
  }

  submitDeleteForm(df: NgForm) {
    for (const i in this.deleteForm.controls) {
      this.deleteForm.controls[i].markAsDirty();
      this.deleteForm.controls[i].updateValueAndValidity();
    }
    console.log(this.deleteForm);
    this._deleteAdminDataService.deleteAD(this.deleteModel)
    .subscribe(
      data => {
        console.log('Success', data),
          alert("Succesfully Deleted Admin Account!"),
          this.router.navigate(['welcome/register-success']);
      },
      error => {
        console.error('Error', error),
          alert("Deletion of Admin Account Failed!"),
          this.router.navigate(['welcome/register-fail']);
      });
  }

}
