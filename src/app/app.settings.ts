import { Injectable } from "@angular/core";
import  {environment} from "../environments/environment";
@Injectable({
    providedIn: 'root'
  })
  
export class AppSettings{
    public static api : any = {

        "login" :  environment.api + "/login",


        "getRetailers" :  environment.api + "/getRetailers",
        "getInventory" :  environment.api + "/getInventory",
        "createRetailers" :  environment.api + "/createRetailers",

        "getCustomerSales" :  environment.api + "/getCustomerSales",
        "createCustomerSales" :  environment.api + "/createCustomerSales",
        "getSoldProducts": environment.api + "/getSoldProducts",

        "dataDump" : environment.api + "/getDataDump",

        "addFile" : environment.api + "/addFile",
        "getFile" :  environment.api +"/getFile",

        
        
        
        "getUsers" :  environment.api + "/getUsers",
        "getUserById" :  environment.api + "/getUserById",
        "addUser" :  environment.api + "/addUser"
    }
}