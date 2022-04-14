import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUpModel } from '../data/SignUpModel';
import { AccountService } from '../services/AccountService';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('form') 'form': NgForm;
  message!:string;
  isAlert=false;
  isSucceed=true;
  constructor(private accountService:AccountService ,private route:Router) { }

  ngOnInit(): void {
  }


  signUp(){
    debugger
var obj=new SignUpModel();
obj.name=this.form.value["name"];
obj.username=this.form.value["username"];
obj.email=this.form.value["email"];
obj.password=this.form.value["password"];
obj.role_Id=this.form.value["role"];
if(obj.username != '' && obj.password!='' && obj.email!='' ){
  this.accountService.register(obj).subscribe(
    ()=>{
      this.form.reset();
      this.isAlert=true;
      this.message="Successfuly SignIn";
      this.isSucceed=true;
      setTimeout(() =>{
                  this.isAlert=false;
                  },2000)
                  this.route.navigate(['/'])
    }
  )


}else{

  this.isAlert=true;
  this.message='Please Fill UserName & Password & email'
  this.isSucceed=false;
setTimeout(() =>{
   this.isAlert=false;
 },2000)
}
  }

}
