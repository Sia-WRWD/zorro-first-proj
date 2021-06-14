import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { updateDetails } from '../shared/update';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UpdateAdminDataService {

  _url = 'http://localhost:3000/upAdminData'

  constructor(private _http: HttpClient) { }

  updateAD(upADInfo: updateDetails) {
    return this._http.post<any>(this._url, upADInfo).pipe(map(res=> {
      return res;
    }));
  }
}
