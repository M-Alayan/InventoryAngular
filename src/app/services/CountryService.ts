import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class CountryService{
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

  loadAllCountry():Observable<any>{
    return this.http.get("http://localhost/Inventory/api/Company/loadAllCountry",this.httpOptions)
  }

}
