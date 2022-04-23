import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../data/Product";


@Injectable()
export class ProductService {
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

  loadall(): Observable<any> {
    return this.http.get("http://localhost/Inventory/api/Product/liProduct",this.httpOptions);
}
  loadActive():Observable<any>{
    return this.http.get("http://localhost/Inventory/api/Product/liActiveProduct",this.httpOptions)
}
  save(p: Product) {
    return this.http.post("http://localhost/Inventory/api/Product/insertProduct", p,this.httpOptions);
}

  edit(Id: number): Observable<any> {
    return this.http.get("http://localhost/Inventory/api/Product/edit?id=" + Id,this.httpOptions);
}
  delete(id: number): Observable<any> {
    return this.http.get("http://localhost/Inventory/api/Product/deleteProduct?id="+id,this.httpOptions);
}
  update(p: Product) {
    return this.http.post("http://localhost/Inventory/api/Product/updateProduct", p,this.httpOptions);

}
  loadByName(name: string): Observable<any> {
    return this.http.get("http://localhost/Inventory/api/Product/search?name=" + name,this.httpOptions)
}
  uploadFile(fd: FormData):Observable<any> {
    debugger
   return this.http.post("http://localhost/Inventory/api/Product/uploadFile", fd);
}
}
