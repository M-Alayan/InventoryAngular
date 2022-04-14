import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '../data/Store';
import { StoreService } from '../services/StoreService';


@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  @ViewChild('f', { static: false }) 'Form1' : NgForm;
  @ViewChild('txtsearch')'txtsearch':ElementRef;
pop:boolean=false;
liStore:Store[]=[];
storeId: number = 0;
editMode: boolean = false;
message!:string;
isAlert=false;
isSucceed=true;

constructor(private storeservice:StoreService) { }

  ngOnInit(): void {
  this.loadData()
  }
  loadData(){
    this.storeservice.loadAll().subscribe(
      data=>{
        this.liStore=data;
      }
    )
  }
  save(){
    debugger
var obj=new Store();
obj.name=this.Form1.value["storename"];
obj.status=parseInt(this.Form1.value["storestatus"]);
obj.id=this.storeId
if(this.editMode){
  this.storeservice.update(obj).subscribe(
    {
      next:()=>{
        this.storeservice.loadAll().subscribe(
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
    }
  )
}else{
  this.storeservice.save(obj).subscribe(
{
  next:()=>{
    this.storeservice.loadAll().subscribe(
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
  )
}

  }

  Edit(id:number){


  this.pop = true;
  this.editMode=true;
  this.storeId=id;
  this.storeservice.edit(id).subscribe(
    data=>{
       this.Form1.form.patchValue({
         "storename":data.name,
         "storestatus":data.status,
         "id":id
       })
    });


  }
  remove(Id:number){
    let text = "Do you really want to delete this record ?\n This record can't restore";
    if (confirm(text) == true) {

   this.storeservice.delete(Id).subscribe(()=>
   this.storeservice.loadAll().subscribe(
     data => {
       this.liStore = data
     }
   ));setTimeout(() =>{
    this.isAlert=true;
         this.message="Successfuly Delete Row";
         this.isSucceed=true;
         setTimeout(() =>{
                     this.isAlert=false;
                     },2000)
  })
  }}
  search(){
   var name=this.txtsearch.nativeElement.value;
   this.storeservice.loadByName(name).subscribe(
     data=>{
       this.liStore=data;
     }
   )
  }
  onClick() {
    this.pop = true;
    this.editMode=false;
  }

  exit(){

    this.pop = false;
  }


  close(){
    this.pop = false;

 }
}
