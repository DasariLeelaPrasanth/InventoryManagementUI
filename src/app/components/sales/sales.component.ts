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


  getBase64ImageFromURL(url : any) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
  
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
  
        var ctx : any = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
  
        var dataURL = canvas.toDataURL("image/png");
        console.log(dataURL,"dataURL");
        
        resolve(dataURL);
      };
  
      img.onerror = error => {
        reject(error);
      };
  
      img.src = url;
    });
  }

  async saveAddForm(){
 
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

    let customerData = {
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
    

    console.log(customerData,salesData,"customerDatacustomerData");
     let docDefinition : any = {
    watermark: { text: 'Dasari Tech Solutions', color: 'grey', opacity: 0.1, bold: true, italics: false },
    content: [
    
      {
        text: 'INVOICE',
        fontSize: 20,
        bold: true,
        alignment: 'center',
        decoration: 'underline',
        color: 'skyblue'
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
              image : await this.getBase64ImageFromURL("./assets/Images/png/logo-color.png"),
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
            'This is system generated invoice.',
          ],}],
          [ {
            image : await this.getBase64ImageFromURL("./assets/Images/png/signature.jpeg"),
            alignment: 'right',
            height: 50,
            width: 90
          },
            { text: 'Signature', alignment: 'right', italics: true}],
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

  inventoryDetails : any
  RetailerName : any
  productsData : any
  typeaheadOnSelect(event : any) : void{
    if(event.value){
      let filteredNames = this.inventoryDetails.filter((ele :any) => ele.CustomerName == event.value);
console.log(filteredNames,"filteredNamesfilteredNames");

      this.Address =filteredNames[0].Address;
    this.Email =filteredNames[0].Email;
    this.MobileNumber =filteredNames[0].MobileNumber;
    this.GSTNumber =filteredNames[0].GSTNumber;
    this.RetailerName =filteredNames[0].RetailerName
    
    }
  }

  productsArr : any = []
  productsOnSelect(event: any , index : any){
    let ele = this.productsData.filter((ele :any) => ele.ProductName == event.value);
    console.log(ele);
    
    this.salesFormArr[index]["CostPrice"] = ele[0].CostPrice
    this.salesFormArr[index]["SellingPrice"] = ele[0].SellingPrice
    this.salesFormArr[index]["Discount"] = ele[0].Discount
    this.salesFormArr[index]["Tax"] = ele[0].Tax
    this.salesFormArr[index]["Warranty"] = ele[0].Warranty
  }

  customerNameArr : any = [];
  filteredCustomerNameArr : any = [];
  retailerNameArr : any = [];
  getInventoryDetails() {
  this._globalService.getRetailers().subscribe((res : any) => {
    this.inventoryDetails = res;
    let customerObj  : any = {};
    let retailerObj : any  = {};
    this.inventoryDetails.forEach((ele : any) => {
      customerObj[ele.CustomerName] =  ele.CustomerName;
      retailerObj[ele.RetailerName] =  ele.RetailerName;
    });
    this.customerNameArr = Object.values(customerObj);
    this.retailerNameArr = Object.values(retailerObj);
    console.log(this.inventoryDetails);
    
    console.log( this.customerNameArr ,this.retailerNameArr,"this.retailerNameArrthis.retailerNameArr");
    
  });}
}
