import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginDetails } from '../shared/login';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VerifyLoginService {

  _url = "http://localhost:3000/verifyLogin"

  constructor(private _http: HttpClient) { }

  verify(loginInfo: loginDetails) {
    return this._http.post<any>(this._url, loginInfo).pipe(map(res=> {
      return res;
    }));
  }
}
