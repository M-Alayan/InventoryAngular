import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { Order } from '../data/Order';
import { OrderService } from '../services/OrderService';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
liOrder:Order[]=[];
@ViewChild('txtsearch') 'txtsearch':ElementRef
message!:string;
isAlert=false;
isSucceed=true;
  constructor(private orderService:OrderService ,private route:Router) { }

  ngOnInit(): void {
    debugger
    this.loadData()
  }
loadData(){
  this.orderService.loadAll().subscribe(
    data=>this.liOrder=data
  )

}

Edit(id:number){
  debugger
  this.route.navigate(['/home/orders'],{queryParams:{id:id}})

  }



  remove(id:number){
    let text = "Do you really want to delete this record ?\n This record can't restore";
    if (confirm(text) == true) {
this.orderService.delete(id).subscribe(x=>
  {
    this.loadData()
  })
  setTimeout(() =>{
    this.isAlert=true;
    this.message="Successfuly Delete Row";
    this.isSucceed=true;
    setTimeout(() =>{
                this.isAlert=false;
                },2000)
  })
  }}

  search(){
    debugger
    var name=this.txtsearch.nativeElement.value;
    this.orderService.loadByName(name).subscribe(
      data=>{
        this.liOrder=data;
      }
    )
   }
}
