import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchUserDataService {

  UserData:any = [];

  constructor(private _http: HttpClient) { }

  getUserData() {
    return this._http.get<any>('//localhost:3000/fetchUD');
  }
}
