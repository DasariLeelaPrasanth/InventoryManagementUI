import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any;
  isViewOnly: boolean;
  imageUrl: any;

  

  constructor(private sanitizer : DomSanitizer) {
    let user = localStorage.getItem('user');
    this.isViewOnly = true;
    this.user = user ? JSON.parse(user) : {};
    this.imageUrl = localStorage.getItem('imageUrl');
  }

  saveChanges() {
    localStorage.setItem('user', JSON.stringify(this.user));
    this.isViewOnly = true;
  }
  
  uploadImage(event : any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result as string;
      localStorage.setItem('imageUrl', this.imageUrl);
    };
  }

  toggleView() {
    this.isViewOnly = !this.isViewOnly;
  }
}
