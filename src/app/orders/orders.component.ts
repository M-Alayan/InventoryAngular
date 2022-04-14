import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../data/Order';
import { Product } from '../data/Product';
import { OrderService } from '../services/OrderService';
import { ProductService } from '../services/ProductService';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  message!:string;
  isAlert=false;
  isSucceed=true;
  constructor(private productService:ProductService, private orderService:OrderService,
    private route:ActivatedRoute,private router:Router) { }
  liProduct:Product[]=[];
  @ViewChild('f') 'form': NgForm;

  vat=.09;
quantity=1;
  editMode:boolean=false;
  idOrder:number=this.route.snapshot.queryParams['id'];
  ngOnInit(): void {
this.loadData();
    if(this.idOrder>0){
      this.Edit(this.idOrder)
      }
  }
loadData(){

  this.productService.loadActive().subscribe(
    data=>{
      this.liProduct=data
    }
  )
}


change(x:any){
this.productService.edit(x.target.value).subscribe(
  data=>{
    this.quantity=data.quantity
    this.form.form.patchValue({
     gamount:data.price*data.quantity,
    "txt_qty_order":this.quantity,
    "txt_rate_order":data.price,
    "txt_amount_order":data.price*data.quantity,
    "txt_amount2_order":data.price*data.quantity,
    "txt_vat_order":(data.price*data.quantity)*this.vat,
    "txt_netAmount_order":((data.price*data.quantity)*this.vat)+(data.price*data.quantity)

  })})}



save(){
  debugger
  var obj=new Order();
  obj.customer_name=this.form.value["txt_name_order"]
  obj.customer_address=this.form.value["txt_address_order"]
  obj.customer_phone=this.form.value["txt_phone_order"]
  obj.quantity=+ this.form.value["txt_qty_order"]
  obj.rate =+ this.form.value["txt_rate_order"]
  obj.amount =+ this.form.value["txt_amount_order"]
  obj.gross_amount =+ this.form.value["txt_amount2_order"]
  obj.vat =+ this.form.value["txt_vat_order"]
  obj.net_amount =+this.form.value["txt_netAmount_order"]
  obj.descount =+ this.form.value["txt_disc_order"]
  obj.product_id=+this.form.value["ddl_order"]

  if(this.editMode){
    debugger
    obj.id=+this.idOrder
    this.orderService.update(obj).subscribe(
      {

      next:()=>{debugger
        this.orderService.loadAll().subscribe(
          ()=> {debugger

                 this.loadData();
                this.router.navigate(['/home/manageorder']);
                 this.form.reset();
                 this.isAlert=true;
                 this.idOrder=0
                 this.editMode=false
                 this.message="Successfuly Update";
                 this.isSucceed=true;
                 setTimeout(() =>{
                             this.isAlert=false;
                             },2000)
          });},
                error:()=>{debugger
                  this.isAlert=true;
                       this.message="Ops.  there is an error"
                       this.isSucceed=false;
                     setTimeout(() =>{
                        this.isAlert=false;
                      },2000)
                }
      })
}
  else{
    if(obj.customer_name=="" ){
  this.orderService.save(obj).subscribe(

    {
      next:()=>{
        this.orderService.loadAll().subscribe(
          ()=> {

                 this.loadData();
                 this.router.navigate(['/home/manageorder']);
                 this.form.reset();
                 this.editMode=false
                 this.message="Successfuly Added";
                 this.isSucceed=true;
                 this.isAlert=true
                 setTimeout(() =>{
                             this.isAlert=false;
                             },2000)
          });},
                error:()=>{
                  this.isAlert=true;
                       this.message="Ops.  there is an error"
                       this.isSucceed=false;
                     setTimeout(() =>{
                        this.isAlert=false;
                      },2000)
                }


    })}else{
      this.isAlert=true;
      this.message="Ops.  there is an error"
      this.isSucceed=false;
    setTimeout(() =>{
       this.isAlert=false;
     },2000)
    }}




}

changeQty(x:any){
  debugger
  var x= x.target.value
  if(x<=this.quantity){
  var price=+ this.form.value["txt_rate_order"]
  var amount=x*price
  var t_vat=this.vat*amount
  var net_amount=(amount*this.vat)+amount
  this.form.form.patchValue({
  "txt_amount_order":amount,
  "txt_rate_order":price,
  "txt_amount2_order":amount,
  "txt_vat_order":t_vat,
  "txt_netAmount_order":net_amount
  })}
  else{
    alert("Error: number is more than quantity ")
    this.form.form.patchValue({
      "txt_qty_order":1
    })
  }}



descount(x:any){
  var x=x.target.value
  var n_amount=+ this.form.value["txt_netAmount_order"]
  this.form.form.patchValue({
    "txt_netAmount_order":n_amount-x
  })
}

Edit(id:number){
this.editMode=true;
this.orderService.edit(id).subscribe(
  data=>{
    this.form.form.patchValue({
      "txt_name_order":data.customer_name,
      "txt_address_order":data.customer_address,
      "txt_phone_order":data.customer_phone,
      "txt_qty_order":data.quantity,
      "txt_rate_order":data.rate,
      "txt_amount_order":data.amount,
      "txt_amount2_order":data.gross_amount,
      "txt_vat_order":data.vat,
      "txt_netAmount_order":data.net_amount,
      "txt_disc_order":data.descount,
      "ddl_order":data.product_id
    })

  }
)

}
}
