import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { updateDetails } from '../shared/update';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserDataService {

  _url = 'http://localhost:3000/upUserData'

  constructor(private _http: HttpClient) { }

  updateUD(upUDInfo: updateDetails) {
    return this._http.post<any>(this._url, upUDInfo).pipe(map(res=> {
      return res;
    }));
  }

}
