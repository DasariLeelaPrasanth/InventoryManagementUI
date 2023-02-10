import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {

  tableType : any = 'Purchases'


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

  inventoryDetails : any=[]


  constructor(public formBuilder: FormBuilder, public _globalService: GlobalService) { }

  ngOnInit(): void {
this.getInventoryDetails()
  }
  

    getInventoryDetails() {
    this._globalService.getRetailers().subscribe((res) => {
      this.inventoryDetails = res;
    });
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

}
