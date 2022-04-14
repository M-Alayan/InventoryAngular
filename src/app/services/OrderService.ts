import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "../data/Order";


@Injectable()
export class OrderService{
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

  loadAll():Observable<any>{
    return this.http.get("http://localhost/Inventory/api/Order/liOrder",this.httpOptions);
  }
  save(o:Order){
   return this.http.post("http://localhost/Inventory/api/Order/insertOrder",o,this.httpOptions);

  }
  edit(Id:number):Observable<any>{
    return this.http.get("http://localhost/Inventory/api/Order/edit?id="+Id,this.httpOptions);
  }
  delete(Id:number):Observable<any>{
   return this.http.get("http://localhost/Inventory/api/Order/deleteOrder?id="+Id,this.httpOptions);
  }
  update(o:Order){
   return this.http.post("http://localhost/Inventory/api/Order/updateOrder",o,this.httpOptions);

  }
  loadByName(name:string):Observable<any>{
    return this.http.get("http://localhost/Inventory/api/Order/search?name="+name,this.httpOptions)
  }

}
