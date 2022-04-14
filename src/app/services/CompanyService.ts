import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Company } from "../data/Company";


@Injectable()
export class CompanyService{

private httpOptions
  constructor(private http:HttpClient){
    let token = JSON.parse(localStorage.getItem('token') || '');
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.token}`
      })
    };

  }

save(obj:Company){
 return this.http.post("http://localhost/Inventory/api/Company/insertCompany",obj,this.httpOptions)
}


}
