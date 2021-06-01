import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { registerDetails } from '../shared/register';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  _url = 'http://localhost:3000/registration'

  constructor(private _http: HttpClient) { }

  register(registerInfo: registerDetails) {
    return this._http.post<any>(this._url, registerInfo).pipe(map(res=> {
      return res;
    }));
  }

}
