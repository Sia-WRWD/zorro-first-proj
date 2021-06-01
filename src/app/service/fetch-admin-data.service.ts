import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchAdminDataService {

  AdminData:any = [];

  constructor(private _http: HttpClient) { }

  public getAdminData() {
    return this._http.get<any>('//localhost:3000/fetchAD');
  }
}
