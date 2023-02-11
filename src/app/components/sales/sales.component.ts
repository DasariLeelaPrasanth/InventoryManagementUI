import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
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
    {"name": "Afghanistan", "code": "AF"}, 
    {"name": "Åland Islands", "code": "AX"}, 
    {"name": "Albania", "code": "AL"}, 
    {"name": "Algeria", "code": "DZ"}, 
    {"name": "American Samoa", "code": "AS"}, 
    {"name": "Andorra", "code": "AD"}, 
    {"name": "Angola", "code": "AO"}, 
    {"name": "Anguilla", "code": "AI"}, 
    {"name": "Antarctica", "code": "AQ"}, 
    {"name": "Antigua and Barbuda", "code": "AG"}, 
    {"name": "Argentina", "code": "AR"}, 
    {"name": "Armenia", "code": "AM"}, 
    {"name": "Aruba", "code": "AW"}, 
    {"name": "Australia", "code": "AU"}, 
    {"name": "Austria", "code": "AT"}, 
    {"name": "Azerbaijan", "code": "AZ"}, 
    {"name": "Bahamas", "code": "BS"}, 
    {"name": "Bahrain", "code": "BH"}, 
    {"name": "Bangladesh", "code": "BD"}, 
    {"name": "Barbados", "code": "BB"}, 
    {"name": "Belarus", "code": "BY"}, 
    {"name": "Belgium", "code": "BE"}, 
    {"name": "Belize", "code": "BZ"}, 
    {"name": "Benin", "code": "BJ"}, 
    {"name": "Bermuda", "code": "BM"}, 
    {"name": "Bhutan", "code": "BT"}, 
    {"name": "Bolivia", "code": "BO"}, ];

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


  constructor(public formBuilder: FormBuilder) {
   }

  ngOnInit(): void {

  }
  



  filterCountry(event : any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.countries.length; i++) {
      let country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
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
      MobileNumber : "Phone no : 9177987144",
      Email : "Email : prasanthprince1998@gmail.com",
      Address :"Addresss : Lakshmipuram, Vepagunta, Visakhapatnam, Andhrapradesh-530047",
      InvoiceNumber : this.InvoiceNumber,
      CustomerName :  "Dasari Tech Solutions",
      BusinessName : "Dasari Tech Solutions",
      GSTNumber :  "GSTIN : ",
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
          widths: ['*', 'auto', 'auto', 'auto','auto', 'auto', 'auto'],
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
}
