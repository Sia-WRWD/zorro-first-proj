import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { deleteDetails } from '../shared/delete';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserDataService {

  _url = 'http://localhost:3000/delUserData';

  constructor(private _http: HttpClient) { }

  deleteUD(delUDInfo: deleteDetails) {
    return this._http.post<any>(this._url, delUDInfo).pipe(map(res=> {
      return res;
    }));
  }

}
