import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forgotPwdDetails } from '../shared/forgotpwd';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UpdatePasswordService {

  _url = 'http://localhost:3000/updateForgotPwd'

  constructor(private _http: HttpClient) { }

  register(forgotPwdInfo: forgotPwdDetails) {
    return this._http.post<any>(this._url, forgotPwdInfo).pipe(map(res=> {
      return res;
    }));
  }
}
