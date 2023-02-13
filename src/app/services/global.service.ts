import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { AppSettings } from '../app.settings';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(public _http : HttpClient,public _app : AppSettings) { }


  getCustomerSales(){
    let val = this._http
       .get(AppSettings.api.getCustomerSales);
       return val
       
   }

   getCustomerSalesById(){
    let val = this._http
       .get(AppSettings.api.getCustomerSalesById);
       return val
       
   }
   createCustomerSales(body : any){
    let val = this._http
       .post(AppSettings.api.createCustomerSales,body);
       return val
       
   }



   getRetailers(){
    let val = this._http
       .get(AppSettings.api.getRetailers);
       return val
       
   }

   getRetailersById(){
    let val = this._http
       .get(AppSettings.api.getRetailersById);
       return val
       
   }

   createRetailers(body : any){
    let val = this._http
       .post(AppSettings.api.createRetailers,body);
       return val
       
   }


   dataDump(){
      let val = this._http
         .get(AppSettings.api.dataDump);
         return val
         
     }

}
