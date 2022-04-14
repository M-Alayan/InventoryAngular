import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AttributeValue } from "../data/AttributeValue";
@Injectable()
export class AttributeValueService
{
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

  loadAllSize():Observable<any>{
    return this.http.get("http://localhost/Inventory/api/AttributeValue/liSize",this.httpOptions)
  }
  loadAllColor():Observable<any>{
    return this.http.get("http://localhost/Inventory/api/AttributeValue/liColor",this.httpOptions)
  }

  loadAll(id:number):Observable<any>{
    return this.http.get("http://localhost/Inventory/api/AttributeValue/loadAll?id="+id,this.httpOptions);
  }
  save(a:AttributeValue){
   return this.http.post("http://localhost/Inventory/api/AttributeValue/insertAttributeValue",a,this.httpOptions);

  }
  edit(Id:number):Observable<any>{
    return this.http.get("http://localhost/Inventory/api/AttributeValue/edit?id="+Id,this.httpOptions);
  }
  delete(Id:number):Observable<any>{
   return this.http.get("http://localhost/Inventory/api/AttributeValue/deleteAttributeValue?id="+Id,this.httpOptions);
  }
  update(a:AttributeValue){
   return this.http.post("http://localhost/Inventory/api/AttributeValue/updateAttributeValue",a,this.httpOptions);

  }
  loadByName(name:string):Observable<any>{
    return this.http.get("http://localhost/Inventory/api/AttributeValue/search?name="+name,this.httpOptions)
  }
}
