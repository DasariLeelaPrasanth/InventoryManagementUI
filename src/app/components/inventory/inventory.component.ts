import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {

  // ProductName : DataTypes.STRING,
  // DateOfPurchase : DataTypes.DATE,
  // Quantity : DataTypes.INTEGER,
  // CostPrice : DataTypes.INTEGER,
  // SellingPrice : DataTypes.INTEGER,
  // Warranty : DataTypes.INTEGER,
  // Tax : DataTypes.INTEGER,
  // CurrentQuantity : DataTypes.INTEGER,

          
          


  tableType : any = 'Purchases'


  InvoiceNumber: any
  DateOfPurchase: any
  Address: any
  Email:any
  MobileNumber:any
  GSTNumber:any
  CustomerName:any
  RetailerName:any

  countries: any = [ 
    {"name": "Prasanth", "code": "AF"}, 
    {"name": "Leela", "code": "AX"}, 
    {"name": "Dasari", "code": "AL"}, 
     ];

  filteredCountries: any=[];

  selectedCountries: any=[];

  selectedCountryAdvanced: any=[];

  filteredBrands: any=[];

  filteredGroups: any=[];


  userForm!: FormGroup;


  inventoryFormArr :any = [{
        ProductName : "",
        DateOfPurchase : "",
        Quantity : "",
        Price : "",
        Discount : "",
        Tax : "",
        TotalPrice : ""
  }]

  inventoryDetails : any=[]
  purchasesData : any = []
  inventoryData : any = []
  constructor(public formBuilder: FormBuilder, public _globalService: GlobalService) { 
    
    this.InvoiceNumber = "SN0001"
    this.DateOfPurchase = "2023-02-11"
    this.Address = "Vepagunta"
    this.Email = "prasanthprince1998@gmail.com"
    this.MobileNumber = "9177987144"
    this.GSTNumber = "9177987144"
    this.CustomerName = {name: 'Prasanth', code: 'AF'}
    this.RetailerName = "Prasanth"

    this.inventoryFormArr  = [{
      ProductName : "Camera",
      DateOfPurchase : "10-09-2022",
      Quantity : "1",
      Price : "1",
      Discount : 0,
      Tax : 0,
      TotalPrice : "1"
}]

   
  }

  ngOnInit(): void {
    this.getInventoryDetails()
  }




  
    customerNameArr : any = [];
    filteredCustomerNameArr : any = [];
    retailerNameArr : any = [];
    getInventoryDetails() {
    this._globalService.getRetailers().subscribe((res) => {
      this.inventoryDetails = res;
      let customerObj  : any = {};
      let retailerObj : any  = {};
      this.inventoryDetails.forEach((ele : any) => {
        customerObj[ele.CustomerName] = {name : ele.CustomerName};
        retailerObj[ele.RetailerName] = {name : ele.RetailerName};
      });
      this.customerNameArr = Object.values(customerObj);
      this.retailerNameArr = Object.values(retailerObj);
      console.log( this.customerNameArr ,this.retailerNameArr,"this.retailerNameArrthis.retailerNameArr");
      
    });}

  resetForm(){
    this.InvoiceNumber = ""
    this.DateOfPurchase = ""
    this.Address = ""
    this.Email = ""
    this.MobileNumber = ""
    this.GSTNumber = ""
    this.CustomerName = ""
    this.RetailerName = ""
  
    this.inventoryFormArr  = [{
      ProductName : "",
      DateOfPurchase : "",
      Quantity : 0,
      CostPrice : 0,
      SellingPrice : 0,
      Discount : 0,
      Tax : 0,
      TotalPrice : 0
}]
  }



  addInventoryForm() {
    this.inventoryFormArr.push({
      ProductName : "",
      DateOfPurchase : "",
      Quantity : 0,
      CostPrice : 0,
      SellingPrice : 0,
      Discount : 0,
      Tax : 0,
      TotalPrice : 0
    })
  }

  filterCountry(h:any){}

  filterCustomer(event : any) {
    console.log(event);
    
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.customerNameArr.length; i++) {
      let country = this.customerNameArr[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCustomerNameArr = filtered;
  }

  pageType :  any = 'main'

  options = [
    {value: 'Option 1', label: 'Option 1'},
    {value: 'Option 2', label: 'Option 2'},
    {value: 'Option 3', label: 'Option 3'}
  ];

  selectedOption = "";

  config = {
    placeholder: 'Select an option',
    search: true,
    searchPlaceholder: 'Search...',
    multiple: false
  };

  submitInventory(){

    let retailerData = {
      MobileNumber : this.MobileNumber,
      Email : this.Email,
       Address : this.Address,
      RetailerName : this.RetailerName,
      CustomerName :('name' in this.CustomerName) ? this.CustomerName['name'] : this.CustomerName ,
      GSTNumber : this.GSTNumber,
      DateOfPurchase : this.DateOfPurchase,
      InvoiceNumber : this.InvoiceNumber
    };
    let inventoryData =  this.inventoryFormArr;
    let data = {
      retailerData : retailerData,
      inventoryData : inventoryData
    }

    this._globalService.createRetailers(data).subscribe((res : any) => {
      console.log(res);
      
    });
    console.log(this.inventoryFormArr);
    
  }


  RetailerId : any
  editPageArr : any = [];
  totalCostPrice : any
  editPageData(data : any){
    this.RetailerId = data.Id;
    this.InvoiceNumber =data.InvoiceNumber;
    this.DateOfPurchase = new Date(data.DateOfPurchase);
    this.Address =data.Address;
    this.Email =data.Email;
    this.MobileNumber =data.MobileNumber;
    this.GSTNumber =data.GSTNumber;
    this.CustomerName ={name : data.CustomerName};
    this.RetailerName =data.RetailerName;

    this.editPageArr = data.Inventories

    this.totalCostPrice = this.editPageArr.reduce((sum:any, p: any)=> sum + (p.CostPrice), 0)

    
  }
}
