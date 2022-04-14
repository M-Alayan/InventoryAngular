import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../data/loginModel';
import { AccountService } from '../services/AccountService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('form') 'form': NgForm;
  message!:string;
  isAlert=false;
  isSucceed=true;
  constructor(private accountService: AccountService,private route:Router) { }

  ngOnInit(): void {


  }

  signIn() {
    debugger
    let user = new LoginModel();
    user.username = this.form.value["uname"];
    user.password = this.form.value["password"];
    if (user.username != '' && user.password != '') {
      this.accountService.login(user).subscribe((data) => {
        localStorage.setItem('token',JSON.stringify(data));

        this.form.reset();
        this.isAlert=true;
        this.message="Successfuly SignIn";
        this.isSucceed=true;
        setTimeout(() =>{
                    this.isAlert=false;
                    },2000)
                    this.route.navigate(['/home'])
      })
    } else {
      this.isAlert=true;
                     this.message="Ops.  there is an error"
                     this.isSucceed=false;
                   setTimeout(() =>{
                      this.isAlert=false;
                    },2000)
    }
  }

}
