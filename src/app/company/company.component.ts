import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Company } from '../data/Company';
import { Country } from '../data/Country';
import { Curancy } from '../data/Curancy';
import { CompanyService } from '../services/CompanyService';
import { CountryService } from '../services/CountryService';
import { CurancyService } from '../services/CurancyService';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  message!:string;
  isAlert=false;
  isSucceed=true;
@ViewChild('f')'form':NgForm;
  liCountry:Country[]=[];
  liCurancy:Curancy[]=[];
  constructor(private countryService:CountryService,private curancyService:CurancyService,private companyService:CompanyService) { }

  ngOnInit(): void {
this.loadData()
  }

  loadData() {
    this.countryService.loadAllCountry().subscribe(
      data => {
        this.liCountry = data
      })
      this.curancyService.loadAll().subscribe(
        data=>{
          this.liCurancy=data;
        }
      )

  }
  save(){
    debugger
var obj=new Company();
obj.name=this.form.value["txt_name_company"];
//obj.charge_amount=parseInt(this.form.value["txt_amount_company"]);
obj.vat_charge=parseInt(this.form.value["txt_vat_company"]);
obj.phone=this.form.value["txt_phone_company"];
obj.address=this.form.value["txt_address_company"];
obj.message=this.form.value["txt_area_message_company"];
obj.country_id=parseInt(this.form.value["txt_country_company"]);
obj.currency_id=parseInt(this.form.value["ddl_currency_company"]);
this.companyService.save(obj).subscribe(
  {

    next:()=>{
               this.loadData();
               this.form.reset();
               this.message="Successfuly Added";
               this.isSucceed=true;
               this.isAlert=true
               setTimeout(() =>{
                           this.isAlert=false;
                           },2000)
        },
              error:()=>{
                this.isAlert=true;
                     this.message="Ops.  there is an error"
                     this.isSucceed=false;
                   setTimeout(() =>{
                      this.isAlert=false;
                    },2000)
              }
  })

  }



}
