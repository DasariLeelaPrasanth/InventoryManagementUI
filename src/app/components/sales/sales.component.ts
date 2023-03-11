import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { GlobalService } from 'src/app/services/global.service';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {

  searchText : any;     
  InvoiceNumber: any
  DateOfPurchase: any
  Address: any
  Email:any
  MobileNumber:any
  GSTNumber:any
  CustomerName:any
  BusinessName:any

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


  salesFormArr :any = [{
        ProductName : "",
        DateOfPurchase : "",
        Quantity : "",
        Price : "",
        Discount : "",
        Tax : "",
        TotalPrice : ""
  }]

  userData : any
  userId: any;
  
  constructor(public formBuilder: FormBuilder,public _globalService: GlobalService) {
    
   }

   purchasesData : any = []
  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.getInventory()
 this.getUser()
 this.getCustomerSalesDetails()
  }
  getInventory(){
    this._globalService.getInventory().subscribe((res) => {
      console.log(res,"getInventorygetInventorygetInventory");
      this.productsData = res ;
      this.productsData.forEach((ele : any) => {
        
        this.productsArr.push(ele.ProductName)
      });
      console.log(this.productsArr,"this.productsArr");
      
    })
  }

  getUser(){
    this._globalService.getUserById(this.userId ).subscribe((res) => {
      console.log(res);
      this.userData = res
    })
  }

  pageType :  any = 'main'



  resetForm(){
    this.InvoiceNumber = ""
    this.DateOfPurchase = ""
    this.Address = ""
    this.Email = ""
    this.MobileNumber = ""
    this.GSTNumber = ""
    this.CustomerName = ""
    this.BusinessName = ""
    this.salesFormArr  = [{
      ProductName : "",
      DateOfPurchase : "",
      Quantity : 0,
      Price : 0,
      Discount : 0,
      Tax : 0,
      TotalPrice : 0
}]
  }

  imageUrl : any
 async getBase64ImageFromURL(url : any) {
  return new Promise((resolve, reject) => {
     this._globalService.getFile(url).subscribe((res : any) => {
      console.log(res);
      const file = res;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
       this.imageUrl = reader.result as string;
      console.log( this.imageUrl ," this.imageUrl  this.imageUrl ");
     
       
          resolve(this.imageUrl);
        
        };
        });
    
      });
  }

  async saveAddForm(){
 
    let customerData = {
      MobileNumber : "Phone no : "+this.userData.MobileNumber,
      Email : "Email : "+this.userData.Email,
      Address :"Addresss : "+this.userData.Address,
      InvoiceNumber : this.InvoiceNumber,
      CustomerName : this.userData['UserName'],
      BusinessName : this.userData['CompanyName'],
      GSTNumber :  "GSTIN : "+this.userData.GSTNumber,
      DateOfPurchase : this.DateOfPurchase
    }

    let companyData  = {
      MobileNumber : "Phone no : "+ this.MobileNumber,
      Email :  "Email : "+this.Email,
      Address : "Addresss : " +this.Address,
      InvoiceNumber : this.InvoiceNumber,
      CustomerName : this.CustomerName,
      BusinessName : this.BusinessName,
      GSTNumber : "GSTIN : "+this.GSTNumber,
      DateOfPurchase : this.DateOfPurchase
    }
    let salesData = this.salesFormArr
    
    this.saveCustomerSales()

    this.DownloadPdf("add")
    this.pageType = 'main'
  }

  saveCustomerSales(){
    let customerData = {
      MobileNumber : this.MobileNumber,
      Email : this.Email,
       Address : this.Address,
       BusinessName : this.BusinessName,
      CustomerName  : this.CustomerName ,
      GSTNumber : this.GSTNumber,
      DateOfPurchase : this.DateOfPurchase,
      InvoiceNumber : this.InvoiceNumber
    };
    let salesData =  this.salesFormArr;
    let data = {
      CustomersData : customerData,
      CustomerSalesData : salesData
    }

    this._globalService.createCustomerSales(data).subscribe((res : any) => {
      console.log(res);
      
      this.pageType = 'main';
      this.getCustomerSalesDetails()
      console.log(this.salesFormArr);
    });
    

  }

  inventoryDetails : any
  RetailerName : any
  productsData : any
  typeaheadOnSelect(event : any) : void{
    if(event.value){
      let filteredNames = this.CustomerSalesDetails.filter((ele :any) => ele.CustomerName == event.value);
console.log(filteredNames,"filteredNamesfilteredNames");

      this.Address =filteredNames[0].Address;
    this.Email =filteredNames[0].Email;
    this.MobileNumber =filteredNames[0].MobileNumber;
    this.GSTNumber =filteredNames[0].GSTNumber;
    this.BusinessName =filteredNames[0].BusinessName
    
    }
  }

  productsArr : any = []
  productsOnSelect(event: any , index : any){
    let ele = this.productsData.filter((ele :any) => ele.ProductName == event.value);
    console.log(ele);
    
    // this.salesFormArr[index]["CostPrice"] = ele[0].CostPrice
    this.salesFormArr[index]["Price"] = ele[0].SellingPrice
    this.salesFormArr[index]["Discount"] = ele[0].Discount
    this.salesFormArr[index]["Tax"] = ele[0].Tax
    this.salesFormArr[index]["Warranty"] = ele[0].Warranty
  }

  customerNameArr : any = [];
  filteredCustomerNameArr : any = [];
  retailerNameArr : any = [];
  CustomerSalesDetails : any = []
  getCustomerSalesDetails() {
  this._globalService.getCustomerSales().subscribe((res : any) => {

    this.CustomerSalesDetails = res;
    let customerObj  : any = {};
    let retailerObj : any  = {};
    this.CustomerSalesDetails.forEach((ele : any) => {
      customerObj[ele.CustomerName] =  ele.CustomerName;
      retailerObj[ele.BusinessName] =  ele.BusinessName;
    });
    this.customerNameArr = Object.values(customerObj);
    this.retailerNameArr = Object.values(retailerObj);
  
  });}


  RetailerId : any
  editPageArr : any = [];
  totalCostPrice : any
  editPageData(data : any){
    // this.RetailerId = data.Id;
    this.InvoiceNumber =data.InvoiceNumber;
    this.DateOfPurchase = new Date(data.DateOfPurchase);
    this.Address =data.Address;
    this.Email =data.Email;
    this.MobileNumber =data.MobileNumber;
    this.GSTNumber =data.GSTNumber;
    this.CustomerName = data.CustomerName;
    this.BusinessName =data.BusinessName;

    this.editPageArr = data.CustomerSales

    this.totalCostPrice = this.editPageArr.reduce((sum:any, p: any)=> sum + (p.TotalPrice), 0)

    
  }

  async DownloadPdf(type:any){
    let salesData = this.salesFormArr
    if(type == 'edit'){
      salesData = this.editPageArr
    }
 
    let companyData = {
      MobileNumber : "Phone no : "+this.userData.MobileNumber,
      Email : "Email : "+this.userData.Email,
      Address :"Addresss : "+this.userData.Address,
      InvoiceNumber : this.InvoiceNumber,
      CustomerName : this.userData['UserName'],
      BusinessName : this.userData['CompanyName'],
      GSTNumber :  "GSTIN : "+this.userData.GSTNumber,
      DateOfPurchase : this.DateOfPurchase
    }

    let customerData  = {
      MobileNumber : "Phone no : "+ this.MobileNumber,
      Email :  "Email : "+this.Email,
      Address : "Addresss : " +this.Address,
      InvoiceNumber : this.InvoiceNumber,
      CustomerName : this.CustomerName,
      BusinessName : this.BusinessName,
      GSTNumber : "GSTIN : "+this.GSTNumber,
      DateOfPurchase : this.DateOfPurchase
    }
   
    

    console.log(customerData,salesData,"customerDatacustomerData");
     let docDefinition : any = {
    watermark: { text: this.userData['CompanyName'], color: 'grey', opacity: 0.1, bold: true, italics: false },
    content: [
    
      {
        text: 'INVOICE',
        fontSize: 20,
        bold: true,
        alignment: 'center',
        decoration: 'underline',
        // color: 'skyblue'
      },
      {
        columns: [
          [
            {
              text: companyData.CustomerName,
              bold:true
            },
            { text: companyData.Address },
            { text: companyData.Email },
            { text: companyData.MobileNumber },
            {text : companyData.GSTNumber}
            // {text : companyData.state}
          ],
          [
            {
              image : await this.getBase64ImageFromURL(this.userData.LogoPath),
              alignment: 'right',
              height: 100,
              width: 150
            },
      
          ]
        ]
      },
      {
        text: 'Customer Details',
        style: 'sectionHeader'
      },
      {
        columns: [
          [
            {
              text: customerData.CustomerName,
              bold:true
            },
            { text: customerData.Address },
            { text: customerData.Email },
            { text: customerData.MobileNumber },
            {text : customerData.GSTNumber}
            // {text : customerData.state}
          ],
          [
            {
              text: `Date: ${customerData.DateOfPurchase}`,
              alignment: 'right'
            },
            { 
              text: `Bill No : ${customerData.InvoiceNumber}`,
              alignment: 'right'
            }
          ]
        ]
      },
      {
        text: 'Order Details',
        style: 'sectionHeader'
      },
      {
        layout: 'lightHorizontalLines',
        table: {
          
          headerRows: 1,
          widths: ['auto', '*', 'auto', 'auto','auto', 'auto', 'auto'],
          body: [
            ['S.No','Product Name', 'Quantity', 'Price/Unit', 'Discount(%)', 'GST(%)' , 'Amount'],
            ...salesData.map((p: any, index : any) => ([index +1 , p.ProductName, p.Quantity, p.Price, p.Discount, p.Tax, p.TotalPrice])),
            // [{text: 'Total Amount', colSpan: 7},  salesData.reduce((sum:any, p: any)=> sum + (p.TotalPrice), 0)]
            [{},{text: 'Total Amount'},{},{}, {},{},  salesData.reduce((sum:any, p: any)=> sum + (p.TotalPrice), 0)]
          ]
        }
      },
   
      {
        image : await this.getBase64ImageFromURL(this.userData.SignaturePath),
        alignment: 'right',
        height: 100,
        width: 150
      },

      {
        text: 'Terms and Conditions',
        style: 'sectionHeader'
      },
      // {
      //     ul: [
      //       'Warranty of the product will be subject to the manufacturer terms and conditions.',
      //       'This is system generated invoice.',
      //     ],
      // },
      {
        columns: [
          [ {ul: [
            'Warranty of the product will be subject to the manufacturer terms and conditions.',
            // 'This is system generated invoice.',
          ],}],
        //   [ {
        //     image : await this.getBase64ImageFromURL("./assets/Images/png/signature.jpeg"),
        //     alignment: 'right',
        //     height: 50,
        //     width: 90
        //   },
        //     { text: 'Signature', alignment: 'right', italics: true}],
        ]
      },
    ],
    styles: {
      sectionHeader: {
        bold: true,
        decoration: 'underline',
        fontSize: 14,
        margin: [0, 15,0, 15]          
      }
    }
  };

    

    // this.pdfMake.createPdf(docDefinition).download();
    pdfMake.createPdf(docDefinition).open();  
    this.pageType = 'main'
  }

  keyFunc(data : any,i : any){
    console.log(data,i,'data');
    let discount =0 , gst = 0
    if(Number(data.Discount) > 0 && Number(data.Quantity)  > 0 && Number(data.Price) > 0){

       discount = (data.Quantity * data.Price) * (data.Discount/100)
    }
    if(Number(data.Tax) > 0 && Number(data.Quantity)  > 0 && Number(data.Price) > 0){
     gst = (data.Quantity * data.Price) * (data.Tax/100)
    }
    this.salesFormArr[i].TotalPrice = (data.Quantity * data.Price) - discount - gst;
  }
}
