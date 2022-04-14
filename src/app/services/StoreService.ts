import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "../data/Store";

@Injectable()
export class StoreService{
  private httpOptions;
  constructor(private http:HttpClient){
    let token = JSON.parse(localStorage.getItem('token') || '');
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.token}`
      })
    };
  }

  loadAll():Observable<any>{
    return this.http.get("http://localhost/Inventory/api/Store/liStore",this.httpOptions);
  }
  loadActive():Observable<any>{
    return this.http.get("http://localhost/Inventory/api/Store/liActiveStore",this.httpOptions);
  }

  save(s:Store){
   return this.http.post("http://localhost/Inventory/api/Store/insertStore",s,this.httpOptions)
  }
  edit(Id:number):Observable<any>{
    return this.http.get("http://localhost/Inventory/api/Store/edit?id="+Id,this.httpOptions)
  }
  delete(Id:number):Observable<any>{
   return this.http.get("http://localhost/Inventory/api/Store/deleteStore?id="+Id,this.httpOptions);
  }
  update(s:Store){
   return this.http.post("http://localhost/Inventory/api/Store/updateStore",s,this.httpOptions)
  }
  loadByName(name:string):Observable<any>{
    return this.http.get("http://localhost/Inventory/api/Store/search?name="+name,this.httpOptions)
  }
}
