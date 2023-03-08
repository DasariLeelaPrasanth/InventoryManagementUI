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

   getInventory(){
    let val = this._http
       .get(AppSettings.api.getInventory);
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

     addFile(body: any){
      let val = this._http
      .post(AppSettings.api.addFile,body);
      return val
     }

     getFile(id: any){
      let val = this._http
      .get(AppSettings.api.getFile +"/"+id);
      return val
     }

     getUsers(){
      let val = this._http
         .get(AppSettings.api.getUsers);
         return val
         
     }
  
     getUserById(id:any){
      let val = this._http
         .get(AppSettings.api.getUserById +"/"+id);
         return val
         
     }
  
     addUser(body : any){
      let val = this._http
         .post(AppSettings.api.addUser,body);
         return val
         
     }

}
