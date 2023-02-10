import { Injectable } from "@angular/core";
import  {environment} from "../environments/environment";
@Injectable({
    providedIn: 'root'
  })
  
export class AppSettings{
    public static api : any = {

        "login" :  environment.api + "/login",

        "getCustomerSales" :  environment.api + "/getCustomerSales",
        "getCustomerSalesById" :  environment.api + "/getCustomerSalesById",
        "createCustomerSales" :  environment.api + "/createCustomerSales",


        "getRetailers" :  environment.api + "/getRetailers",
        "getRetailersById" :  environment.api + "/getRetailersById",
        "createRetailers" :  environment.api + "/createRetailers",

    
    }
}