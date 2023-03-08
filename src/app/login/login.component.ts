import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginObj: loginObj;
  validForm: any = false;
  @ViewChild('loginForm')
  loginForm!: NgForm;

  constructor(
    public _authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.loginObj = {
      username: '',
      password: '',
    };
  }

  login() {
    if (this.loginForm.valid) {
      this._authenticationService.login(this.loginObj).subscribe((res: any) => {
        console.log(res,"login");
        if(res['message'] == "Success"){
          let data  = res['data']
          let userId = data['Id']
          sessionStorage.setItem('userId', userId)
           this.validForm = false;
           this.router.navigate(['/dashboard']);
        }
        
      },err => {
        console.log(err);
        this.validForm = true;
      })
    }
  }
}

export class loginObj {
  'username':string;
  'password':any;
} 