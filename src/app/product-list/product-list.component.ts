import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  Router } from '@angular/router';

import { Product } from '../data/Product';

import { ProductService } from '../services/ProductService';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @ViewChild('f') 'form': NgForm
  liProduct:Product[]=[];
  @ViewChild('txtsearch') 'txtsearch':ElementRef
  message!:string;
  isAlert=false;
  isSucceed=true;


  editMode: boolean = false;
  constructor(private productService:ProductService, private route:Router) { }

  ngOnInit(): void {

this.loadData()
  }
loadData(){
  debugger
  this.productService.loadall().subscribe(

    data=>{debugger
      this.liProduct=data}
    )
}
Edit(id:number){


this.route.navigate(['/home/products'],{queryParams:{id:id}})

}



remove(id:number){
  let text = "Do you really want to delete this record ?\n This record can't restore";
  if (confirm(text) == true) {
  this.productService.delete(id).subscribe(() =>
  this.productService.loadall().subscribe(
    data => {
      this.liProduct = data
    }
  ))
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
  this.productService.loadByName(name).subscribe(
    data=>{
      this.liProduct=data;
    }
  )
 }

}
