import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginObj: any


  constructor(public authenticationService: AuthenticationService){
    this.loginObj = {
      userName : '',
      password : ''
    };
  }

  login(){
    // this.authenticationService.
  }
  onClick(){
    if(this.loginObj.username == "mani" && this.loginObj.password == 123){
      alert("Login Successful");
    }else{
      alert("Login Unsuccessful, Please try again")
    }

  }
}
