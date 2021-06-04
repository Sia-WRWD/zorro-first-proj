import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { RegisterService } from 'src/app/service/register.service';
import { registerDetails } from 'src/app/shared/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  registerModel = new registerDetails();
  // captchaTooltipIcon: NzFormTooltipIcon = {
  //   type: 'info-circle',
  //   theme: 'twotone'
  // };

  constructor(private fb: FormBuilder, private _registerService: RegisterService, private router: Router) { }

  ngOnInit(): void {
    this.initializeRegistrationForm();
  }

  initializeRegistrationForm(): void {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userRole: ['', [Validators.required]],
      // captcha: ['', [Validators.required]],
      agree: [false]
    });
  }

  submitForm(f: NgForm) {
    for (const i in this.registrationForm.controls) {
      this.registrationForm.controls[i].markAsDirty();
      this.registrationForm.controls[i].updateValueAndValidity();
    }
    console.log(this.registrationForm)
    this._registerService.register(this.registerModel)
      .subscribe(
        data => {
          console.log('Success', data),
            alert("Succesfully Registered New User!"),
            this.router.navigate(['welcome/register-success']);
        },
        error => {
          console.error('Error!', error),
            alert("Registration for New User Failed!"),
            this.router.navigate(['welcome/register-fail']);
        });
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.registrationForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registrationForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  // getCaptcha(e: MouseEvent): void {
  //   e.preventDefault();
  // }

}
