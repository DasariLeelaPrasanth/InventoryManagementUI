import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginObj: loginObj
  validForm : any = false
  @ViewChild('loginForm')
  loginForm!: NgForm;

  constructor(public authenticationService: AuthenticationService, private router: Router){
    this.loginObj = {
      username : '',
      password : ''
    };
  }

  login(){    
    if(this.loginForm.valid){
      alert(this.loginForm.valid)
      this.validForm = false
      this.router.navigate(['/dashboard']);
    }else{
      this.validForm = true
    }
  }
}

export class loginObj {
  'username':string;
  'password':any;
} 