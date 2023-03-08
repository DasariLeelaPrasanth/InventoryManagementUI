import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userData : any;
  isViewOnly: boolean;
  // imageUrl: any = "'http://192.168.0.8:3330/getFile/IMG_1718.jpg'" ;
  imageUrl: string = 'http://192.168.0.8:3330/getFile/';
  constructor( public _globalService: GlobalService) {
    this.isViewOnly = true;
  }

  userId : any
  ngOnInit(): void {
    this.userId = sessionStorage.getItem('userId');
    this.getUser()
  }

  getUser(){
    this._globalService.getUserById(this.userId ).subscribe((res) => {
      console.log(res);
      this.userData = res
    })
  }

  saveChanges() {
    this._globalService.addUser( this.userData).subscribe((res) => {
      console.log(res);
    })
  }
  
  uploadImage(event : any , name  : any) {
    console.log( this.userData);
    
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(file,"file");
    if(name == 'logo'){
      this.userData['LogoPath'] = file.name
    }else{
      this.userData['SignaturePath'] = file.name
    }
    reader.onload = () => {
      this.imageUrl = reader.result as string;
      console.log( this.imageUrl ," this.imageUrl  this.imageUrl ");
    };
    const formData = new FormData();
    formData.append('file', file);
    this._globalService.addFile(formData).subscribe((res) => {})
  }


}