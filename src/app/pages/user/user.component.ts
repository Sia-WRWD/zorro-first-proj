import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeleteUserDataService } from 'src/app/service/delete-user-data.service';
import { FetchUserDataService } from 'src/app/service/fetch-user-data.service';
import { UpdateUserDataService } from 'src/app/service/update-user-data.service';
import { deleteDetails } from 'src/app/shared/delete';
import { updateDetails } from 'src/app/shared/update';

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

  updateModel = new updateDetails;
  updateForm: FormGroup;
  updateFormVisible = false;

  deleteModel = new deleteDetails;
  deleteForm: FormGroup;
  deleteFormVisible = false;

  fetchUserData: ReadonlyArray<udata> = [];

  constructor(
    private _fetchUserDataService: FetchUserDataService,
    private fb: FormBuilder, 
    private router: Router,
    private _updateUserDataService: UpdateUserDataService,
    private _deleteUserDataService: DeleteUserDataService
    ) { }

  ngOnInit() {
    this.loadUserData();
    this.initializeUpdateForm();
    this.initializeDeleteForm();
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

  //Update Data
  openUpdateForm(): void {
    this.updateFormVisible = true;
  }

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
    this._updateUserDataService.updateUD(this.updateModel)
    .subscribe(
      data => {
        console.log('Success', data),
          alert("Succesfully Updated User Data!"),
          this.router.navigate(['welcome/register-success']);
      },
      error => {
        console.error('Error', error),
          alert("Update For User Data Failed!"),
          this.router.navigate(['welcome/register-fail']);
      });
  }

  //Delete Data
  openDeleteForm(): void {
    this.deleteFormVisible = true;
  }

  initializeDeleteForm(): void {
    this.deleteForm = this.fb.group({
      del_email: ['', [Validators.email, Validators.required]],
      del_username: ['', [Validators.required]]
    })
  }

  submitDeleteForm(df: NgForm) {
    for (const i in this.deleteForm.controls) {
      this.deleteForm.controls[i].markAsDirty();
      this.deleteForm.controls[i].updateValueAndValidity();
    }
    console.log(this.deleteForm);
    this._deleteUserDataService.deleteUD(this.deleteModel)
    .subscribe(
      data => {
        console.log('Success', data),
          alert("Succesfully Deleted User Account!"),
          this.router.navigate(['welcome/register-success']);
      },
      error => {
        console.error('Error', error),
          alert("Deletion of User Account Failed!"),
          this.router.navigate(['welcome/register-fail']);
      });
  }

  close(): void {
    this.updateFormVisible = false;
    this.deleteFormVisible = false;
  }

}
