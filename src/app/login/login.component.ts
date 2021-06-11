import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VerifyLoginService } from '../service/verify-login.service';
import { loginDetails } from '../shared/login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  loginModel = new loginDetails;

  constructor(private fb: FormBuilder, private _verifyLoginService: VerifyLoginService, private router: Router) { }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

    initializeLoginForm() {
      this.validateForm = this.fb.group({
        username: [null, [Validators.required]],
        password: [null, [Validators.required]],
        remember: [false]
      })
    }

    submitInfo(f: NgForm): void {
      for (const i in this.validateForm.controls) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
      console.log(this.validateForm)
      this._verifyLoginService.verify(this.loginModel)
        .subscribe(
          data => {
            console.log('Success', data),
              alert("Succesfully Logged In"),
              this.router.navigate(['welcome']);
          },
          error => {
            console.error('Error!', error),
              alert("Something is Wrong, Please Try Again!");
          });
    }

}
