import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { deleteDetails } from '../shared/delete';


@Injectable({
  providedIn: 'root'
})
export class DeleteAdminDataService {

  _url = 'http://localhost:3000/delAdminData'

  constructor(private _http: HttpClient) { }

  deleteAD(delADInfo: deleteDetails) {
    return this._http.post<any>(this._url, delADInfo).pipe(map(res=> {
      return res;
    }));
  }

}
