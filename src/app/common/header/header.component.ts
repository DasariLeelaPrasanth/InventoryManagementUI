import { Component } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showDropdown = false;
  currentPage : string | undefined | any

  constructor( public _globalService: GlobalService){
    this.currentPage = sessionStorage.getItem('currentPage') ?  sessionStorage.getItem('currentPage') : "dashboard";
    
  }


  dataDump() {
    this._globalService.dataDump().subscribe((res : any) => {
     
    });
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  logout() {
    // handle logout logic here
  }

  changePage(page : string) {
    sessionStorage.setItem('currentPage', page);
    this.currentPage = page
  }
}
