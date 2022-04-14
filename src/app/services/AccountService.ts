import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginModel } from "../data/loginModel";
import { SignUpModel } from "../data/SignUpModel";

@Injectable()
export class AccountService{

  constructor(private http:HttpClient){

  }

  register(signup:SignUpModel){
  return  this.http.post("http://localhost/Inventory/api/Account/SignUp",signup)
}

   login(login:LoginModel):Observable<any>{
     return this.http.post("http://localhost/Inventory/api/Account/Login",login);

  }

}
