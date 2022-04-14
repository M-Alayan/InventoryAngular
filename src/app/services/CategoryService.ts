import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../data/Category";

@Injectable()
export class CategoryService{
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

  loadall():Observable<any>{
   return this.http.get("http://localhost/Inventory/api/Category/liCategory",this.httpOptions);
  }
  loadActive():Observable<any>{
    return this.http.get("http://localhost/Inventory/api/Category/liActiveCategory",this.httpOptions);
  }
  save(c:Category){
   return this.http.post("http://localhost/Inventory/api/Category/insertCategory",c,this.httpOptions);
  }
  edit(Id:number):Observable<any>{
    return this.http.get("http://localhost/Inventory/api/Category/edit?id="+Id,this.httpOptions);
  }
  delete(Id:number):Observable<any>{
   return this.http.get("http://localhost/Inventory/api/Category/deleteCategory?id="+Id,this.httpOptions);
  }
  update(c:Category){
    return this.http.post("http://localhost/Inventory/api/Category/updateCategory",c,this.httpOptions);

   }
   loadByName(name:string):Observable<any>{
    return this.http.get("http://localhost/Inventory/api/Category/search?name="+name,this.httpOptions)
  }
}
