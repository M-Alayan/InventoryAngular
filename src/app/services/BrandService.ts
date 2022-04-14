import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { brand } from "../data/Brand";

@Injectable()
export class BrandService {

  private httpOptions;
  constructor(private http: HttpClient) {
    let token = JSON.parse(localStorage.getItem('token') || '');
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.token}`
      })
    };

  }

  loadAll(): Observable<any> {

    return this.http.get("http://localhost/Inventory/api/Brand/liBrand", this.httpOptions);
  }
  loadActive():Observable<any>{
    return this.http.get("http://localhost/Inventory/api/Brand/liActiveBrand", this.httpOptions);
  }
  save(b: brand) {
    return this.http.post("http://localhost/Inventory/api/Brand/insertBrand", b,this.httpOptions);

  }
  edit(Id: number): Observable<any> {
    return this.http.get("http://localhost/Inventory/api/Brand/edit?id=" + Id,this.httpOptions);
  }
  delete(Id: number): Observable<any> {
    return this.http.get("http://localhost/Inventory/api/Brand/deleteBrand?id=" + Id,this.httpOptions);
  }
  update(b: brand) {
    return this.http.post("http://localhost/Inventory/api/Brand/updateBrand", b,this.httpOptions);

  }
  loadByName(name: string): Observable<any> {
    return this.http.get("http://localhost/Inventory/api/Brand/search?name=" + name,this.httpOptions)
  }

}
