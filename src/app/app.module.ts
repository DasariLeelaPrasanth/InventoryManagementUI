import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule , ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SalesComponent } from './components/sales/sales.component';
import { SharedModule } from './common/common.module';
import { CommonModule } from '@angular/common';
import { SelectDropDownModule } from 'ngx-select-dropdown';

import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';

import { AutoCompleteModule } from 'primeng/autocomplete';

import {
  HttpClientModule
} from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';



@NgModule({
  providers: [
    { provide: HIGHCHARTS_MODULES, useFactory: () => [ more, exporting ] } // add as factory to your providers
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    InventoryComponent,
    DashboardComponent,
    SalesComponent,
    ProfileComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    ChartModule,
    SelectDropDownModule,
    AutoCompleteModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    TypeaheadModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
