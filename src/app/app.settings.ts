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
        "getInventory" :  environment.api + "/getInventory",
        "createRetailers" :  environment.api + "/createRetailers",

    
        "dataDump" : environment.api + "/dataDump",

        "addFile" : environment.api + "/addFile",
        "getFile" :  environment.api +"/getFile",

        
        
        
        "getUsers" :  environment.api + "/getUsers",
        "getUserById" :  environment.api + "/getUserById",
        "addUser" :  environment.api + "/addUser"
    }
}