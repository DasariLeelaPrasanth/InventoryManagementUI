import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public _http : HttpClient) { }

  login(body : any){
    let val = this._http
       .post(AppSettings.api.login, body);
       return val
       
   }
}
