import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showDropdown = false;
  currentPage : string | undefined | any

  constructor(){
    this.currentPage = sessionStorage.getItem('currentPage');
    
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
