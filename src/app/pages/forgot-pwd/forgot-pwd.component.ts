import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdatePasswordService } from 'src/app/service/update-password.service';
import { forgotPwdDetails } from 'src/app/shared/forgotpwd';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css']
})
export class ForgotPwdComponent implements OnInit {

  forgotPwdForm: FormGroup;
  forgotPwdModel = new forgotPwdDetails();

  constructor(private fb: FormBuilder, private router: Router, private _forgotPwdService: UpdatePasswordService) { }

  ngOnInit(): void {
    this.initializeForgotPwdForm();
  }

  initializeForgotPwdForm(): void {
    this.forgotPwdForm = this.fb.group ({
      email: ['', [Validators.email, Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]]
    })
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.forgotPwdForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.forgotPwdForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };


  submitForm(f: NgForm): void {
    for (const i in this.forgotPwdForm.controls) {
      this.forgotPwdForm.controls[i].markAsDirty();
      this.forgotPwdForm.controls[i].updateValueAndValidity();
    }
    console.log(this.forgotPwdForm)
    this._forgotPwdService.register(this.forgotPwdModel)
      .subscribe(
        data => {
          console.log('Success', data),
            alert("Succesfully Updated Password!"),
            this.router.navigate(['login']);
        },
        error => {
          console.error('Error!', error),
            alert("Password Update Failed!")
        });
  }

}
