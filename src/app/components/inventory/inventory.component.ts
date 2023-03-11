import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent {
  searchText: any;

  tableType: any = 'Purchases';

  InvoiceNumber: any;
  DateOfPurchase: any;
  Address: any;
  Email: any;
  MobileNumber: any;
  GSTNumber: any;
  CustomerName: any;
  RetailerName: any;

  userForm!: FormGroup;

  inventoryFormArr: any = [
    {
      ProductName: '',
      DateOfPurchase: '',
      Quantity: '',
      Price: '',
      Discount: '',
      Tax: '',
      TotalPrice: '',
    },
  ];

  inventoryDetails: any = [];
  purchasesData: any = [];
  inventoryData: any = [];
  constructor(
    public formBuilder: FormBuilder,
    public _globalService: GlobalService
  ) {
    this.InvoiceNumber = 'SN0001';
    this.DateOfPurchase = '2023-02-11';
    this.Address = 'Vepagunta';
    this.Email = 'prasanthprince1998@gmail.com';
    this.MobileNumber = '9177987144';
    this.GSTNumber = '9177987144';
    this.CustomerName = { name: 'Prasanth', code: 'AF' };
    this.RetailerName = 'Prasanth';

    this.inventoryFormArr = [
      {
        ProductName: 'Camera',
        DateOfPurchase: '10-09-2022',
        Quantity: '1',
        Price: '1',
        Discount: 0,
        Tax: 0,
        TotalPrice: '1',
      },
    ];
  }

  ngOnInit(): void {
    this.getInventoryDetails();

    this.getSoldProducts();
  }

  productsSold: any;
  getSoldProducts() {
    this._globalService.getSoldProducts().subscribe((res) => {
      console.log(res, 'getSoldProducts');
      this.productsSold = res;
      this.getInventory();
    });
  }

  mergedData : any
  getInventory() {
    this._globalService.getInventory().subscribe((res) => {
      console.log(res, 'getInventorygetInventorygetInventory');
      this.productsData = res;
      this.productsData.forEach((ele: any) => {
        this.productsArr.push(ele.ProductName);
      });
      const items = new Map();

      // Merge items from array a
      for (const item of this.productsData) {
        items.set(item.ProductName, { ProductName: item.ProductName, quantityPurchased: item.quantityPurchased });
      }

      // Merge items from array b
      for (const item of this.productsSold) {
        const existingItem = items.get(item.ProductName);
        if (existingItem) {
          existingItem.quantitySold = item.quantitySold;
        } else {
          items.set(item.ProductName, { ProductName: item.ProductName, quantitySold: item.quantitySold });
        }
      }

      this.mergedData = Array.from(items.values());
      console.log(this.mergedData,"mergedmergedmerged");
      
    });
  }

  productsData: any = [];
  productsArr: any = [];

  customerNameArr: any = [];
  filteredCustomerNameArr: any = [];
  retailerNameArr: any = [];
  getInventoryDetails() {
    this.selectedDate 
    this._globalService.getRetailers().subscribe((res) => {
      this.inventoryDetails = res;
      let customerObj: any = {};
      let retailerObj: any = {};
      this.inventoryDetails.forEach((ele: any) => {
        customerObj[ele.CustomerName] = ele.CustomerName;
        retailerObj[ele.RetailerName] = ele.RetailerName;
      });
      this.customerNameArr = Object.values(customerObj);
      this.retailerNameArr = Object.values(retailerObj);
      console.log(this.inventoryDetails);

      console.log(
        this.customerNameArr,
        this.retailerNameArr,
        'this.retailerNameArrthis.retailerNameArr'
      );
    });
  }

  searchTerm: any;
  filteredCustomer: any = [];
  selectName(name: string) {
    this.CustomerName = name;
    this.filteredCustomer = [];
  }

  resetForm() {
    this.InvoiceNumber = '';
    this.DateOfPurchase = '';
    this.Address = '';
    this.Email = '';
    this.MobileNumber = '';
    this.GSTNumber = '';
    this.CustomerName = '';
    this.RetailerName = '';

    this.inventoryFormArr = [
      {
        ProductName: '',
        DateOfPurchase: '',
        Quantity: 0,
        CostPrice: 0,
        SellingPrice: 0,
        Discount: 0,
        Tax: 0,
        TotalPrice: 0,
      },
    ];
  }

  addInventoryForm() {
    this.inventoryFormArr.push({
      ProductName: '',
      DateOfPurchase: '',
      Quantity: 0,
      CostPrice: 0,
      SellingPrice: 0,
      Discount: 0,
      Tax: 0,
      TotalPrice: 0,
    });
  }

  pageType: any = 'main';

  submitInventory() {
    let retailerData = {
      MobileNumber: this.MobileNumber,
      Email: this.Email,
      Address: this.Address,
      RetailerName: this.RetailerName,
      CustomerName: this.CustomerName,
      GSTNumber: this.GSTNumber,
      DateOfPurchase: this.DateOfPurchase,
      InvoiceNumber: this.InvoiceNumber,
    };
    let inventoryData = this.inventoryFormArr;
    let data = {
      retailerData: retailerData,
      inventoryData: inventoryData,
    };

    this._globalService.createRetailers(data).subscribe((res: any) => {
      console.log(res);
      this.getInventoryDetails();

      this.getSoldProducts();
      this.pageType = 'main';
    });
  }

  RetailerId: any;
  editPageArr: any = [];
  totalCostPrice: any;
  editPageData(data: any) {
    this.RetailerId = data.Id;
    this.InvoiceNumber = data.InvoiceNumber;
    this.DateOfPurchase = new Date(data.DateOfPurchase);
    this.Address = data.Address;
    this.Email = data.Email;
    this.MobileNumber = data.MobileNumber;
    this.GSTNumber = data.GSTNumber;
    this.CustomerName = data.CustomerName;
    this.RetailerName = data.RetailerName;

    this.editPageArr = data.Inventories;

    this.totalCostPrice = this.editPageArr.reduce(
      (sum: any, p: any) => sum + p.CostPrice,
      0
    );
  }

  typeaheadOnSelect(event: any): void {
    if (event.value) {
      let filteredNames = this.inventoryDetails.filter(
        (ele: any) => ele.CustomerName == event.value
      );
      console.log(filteredNames, 'filteredNamesfilteredNames');

      this.Address = filteredNames[0].Address;
      this.Email = filteredNames[0].Email;
      this.MobileNumber = filteredNames[0].MobileNumber;
      this.GSTNumber = filteredNames[0].GSTNumber;
      this.RetailerName = filteredNames[0].RetailerName;
    }
  }

  productsOnSelect(event: any, index: any) {
    let ele = this.productsData.filter(
      (ele: any) => ele.ProductName == event.value
    );
    console.log(ele);

    this.inventoryFormArr[index]['CostPrice'] = ele[0].CostPrice;
    this.inventoryFormArr[index]['SellingPrice'] = ele[0].SellingPrice;
    this.inventoryFormArr[index]['Discount'] = ele[0].Discount;
    this.inventoryFormArr[index]['Tax'] = ele[0].Tax;
    this.inventoryFormArr[index]['Warranty'] = ele[0].Warranty;
  }

  selectedDate:any = 'today'
  changeDate(){
    console.log(this.selectedDate);
    this.getInventoryDetails();
  }
}
