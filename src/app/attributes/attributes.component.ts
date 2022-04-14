import { Attribute, Component, OnInit ,ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { VmAttribute } from '../data/VmAttribute';
import { AttributeService } from '../services/AttributeService';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css']
})
export class AttributesComponent implements OnInit {
pop:boolean=false;
  constructor(private attributeService:AttributeService,private Attribute:Attribute, private route:Router, private vm:VmAttribute) { }
  @ViewChild('f', { static: false }) 'Form1' : NgForm;
  liattribute:VmAttribute[]=[];

  ngOnInit(): void {
//     if(localStorage.getItem('token'=='')){
// this.route.navigate(["/login"])
//     }
    this.attributeService.loadAll().subscribe(
           data=>{
             this.liattribute = data;
             }
         )
  }
     add(id:number){
   if(id==2){

   this.route.navigate(["/home/attributevalue"],{queryParams:{id:id,value:"color"}})
 }
   else{

   this.route.navigate(["home/attributevalue"],{queryParams:{id:id,value:"size"}})
   }
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
}
