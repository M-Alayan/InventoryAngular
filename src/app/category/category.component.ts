import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../data/Category';
import { CategoryService } from '../services/CategoryService';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @ViewChild('f', { static: false }) 'Form1' : NgForm;
@ViewChild('txtsearch')'txtsearch':ElementRef;
  liCategory:Category[]=[];
  categoryId: number = 0;
  editMode: boolean = false;
  message!:string;
  isAlert=false;
  isSucceed=true;

  constructor(private categoryservice:CategoryService) { }
  pop: boolean = false;
  ngOnInit(): void {
    debugger
    this.categoryservice.loadall().subscribe(
      data=>{
        this.liCategory=data;
      }

    )
  }
  loadData() {
    this.categoryservice.loadall().subscribe(
      data => {
        this.liCategory = data
      }
    )
  }
  save(){
    debugger
var obj=new Category();
obj.name=this.Form1.value["categoryname"];
obj.status=parseInt(this.Form1.value["categorystatus"]);
obj.id=this.categoryId
if(this.editMode){
  this.categoryservice.update(obj).subscribe(
    {
      next:()=>{
      this.categoryservice.loadall().subscribe(
        ()=> {
                this.pop = false;
               this.loadData();
               this.Form1.reset();
               this.isAlert=true;
               this.message="Successfuly Update";
               this.isSucceed=true;
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

  })
}else{
  this.categoryservice.save(obj).subscribe(
    {
      next:()=>{
        this.categoryservice.loadall().subscribe(
          ()=> {
                  this.pop = false;
                 this.loadData();
                 this.Form1.reset();
                 this.isAlert=true;
                 this.message="Successfuly Added";
                 this.isSucceed=true;
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
    }

  );
}
  }


  Edit(id:number){

  this.pop = true;
  this.editMode=true;
  this.categoryId=id;
  this.categoryservice.edit(id).subscribe(
    data=>{
       this.Form1.form.patchValue({
         "categoryname":data.name,
         "categorystatus":data.status,
         "id":id
       })
    });
  }

  remove(Id:number){
    let text = "Do you really want to delete this record ?\n This record can't restore";
    if (confirm(text) == true) {

   this.categoryservice.delete(Id).subscribe(()=>
   this.categoryservice.loadall().subscribe(
     data => {
       this.liCategory = data
     }
   ))
   setTimeout(() =>{
    this.isAlert=true;
    this.message="Successfuly Delete Row";
    this.isSucceed=true;
    setTimeout(() =>{
                this.isAlert=false;
                },2000)})
  }}
  search(){
var name=this.txtsearch.nativeElement.value;
this.categoryservice.loadByName(name).subscribe(
  data=>{
    this.liCategory=data;
  }
)
  }
  onClick() {
    this.pop = true;
    this.editMode = false;
  }

  exit(){

    this.pop = false;
  }


  close(){
    this.pop = false;

 }
}
