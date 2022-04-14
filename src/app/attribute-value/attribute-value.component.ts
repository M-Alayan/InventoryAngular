import { Component, ElementRef, OnInit ,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AttributeValue } from '../data/AttributeValue';
import { AttributeValueService } from '../services/AttributeValueService';

@Component({
  selector: 'app-attribute-value',
  templateUrl: './attribute-value.component.html',
  styleUrls: ['./attribute-value.component.css']
})
export class AttributeValueComponent implements OnInit {
pop:boolean=false;
livalue:AttributeValue[]=[]
@ViewChild('f') 'form' : NgForm;
@ViewChild('txtsearch') 'txtsearch':ElementRef
value!: string;
 id!: number;
    edit: boolean = false;
  AttID=0;
  'message':string;
   isAlert=false;
   isSucceed=true;

constructor(private Ar:ActivatedRoute, private attvalueservice:AttributeValueService, private attributvalue:AttributeValue) { }

  ngOnInit(): void {
    this.value = this.Ar.snapshot.queryParams['value'];
        this.id = parseInt(this.Ar.snapshot.queryParams['id']);
         this.attvalueservice.loadAll(this.id).subscribe(
          data =>{
             this.livalue = data;
          }
        )
  }
    Onsave(){
    debugger
  this.attributvalue.name = this.form.value["txt1"];
   this.attributvalue['attribute_id'] =  this.id
   this.attributvalue.id = this.AttID
    if(this.edit){
      this.attvalueservice.update(this.attributvalue).subscribe({
        next:()=>{
        this.attvalueservice.loadAll(this.id).subscribe(
          data =>{
            this.pop = false;
            this.livalue = data;
            this.isAlert=true;
            this.message="Successfuly Update";
            this.isSucceed=true;
            setTimeout(() =>{
              this.isAlert=false;
            },2000)
          }
        )
     },
     error:err=>{
      this.isAlert=true;
      this.message="Ops.  there is an error"
      this.isSucceed=false;
      setTimeout(() =>{
        this.isAlert=false;
      },2000)
    }
  });
 }
     else{
       debugger
      this.attvalueservice.save(this.attributvalue).subscribe({
        next:()=>{
          this.attvalueservice.loadAll(this.id).subscribe(
            data =>{
              this.pop = false;
              this.livalue = data;
              this.isAlert=true;
              this.message="Successfuly";
              this.isSucceed=true;
              setTimeout(() =>{
                this.isAlert=false;
              },2000)
            }
          )
        },
        error:err=>{
          this.isAlert=true;
          this.message="Ops.  there is an error"
          this.isSucceed=false;
          setTimeout(() =>{
            this.isAlert=false;
          },2000)
        }


      });
     }  }

 remove(id:number){
  let text = "Do you really want to delete this record ?\n This record can't restore";
  if (confirm(text) == true) {
 this.attvalueservice.delete(id).subscribe(()=>{
   this.attvalueservice.loadAll(this.id).subscribe(
     data=>
     {
       this.livalue = data;
     }
   )
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
  Edit(id:number){
  debugger
  this.pop = true;
  this.edit = true;
  this.AttID = id;
  this.attvalueservice.edit(id).subscribe(
    data=>{
       this.form.form.patchValue({
         "txt1":data.name,
          "id":id

       })
    });

  }

  onClick() {
    this.pop = true;
  }

  exit(){
    debugger;
    this.pop = false;
  }

  save(){

  }
  close(){
    this.pop = false;

 }
 search(){

  var name=this.txtsearch.nativeElement.value;
  this.attvalueservice.loadByName(name).subscribe(
    data=>{
      this.livalue=data;
    }
  )
 }
}


