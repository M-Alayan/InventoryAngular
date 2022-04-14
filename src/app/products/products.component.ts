import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttributeValue } from '../data/AttributeValue';
import { brand } from '../data/Brand';
import { Category } from '../data/Category';
import { Product } from '../data/Product';
import { Store } from '../data/Store';
import { AttributeValueService } from '../services/AttributeValueService';
import { BrandService } from '../services/BrandService';
import { CategoryService } from '../services/CategoryService';
import { ProductService } from '../services/ProductService';
import { StoreService } from '../services/StoreService';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @ViewChild('f') 'form': NgForm
  liCategory: Category[] = [];
  liStore: Store[] = [];
  liBrand: brand[] = [];
  liSize: AttributeValue[] = [];
  liColor: AttributeValue[] = [];
  filePath!: string;
  filePathFolder :string = '';
  editMode:boolean=false;
  message!:string;
  isAlert=false;
  isSucceed=true;

  isVisible=false;

  @ViewChild('img_picture')img!:ElementRef;
  constructor(private categoryService: CategoryService, private StoreService: StoreService,
    private brandService: BrandService, private attributeValueService: AttributeValueService,
    private Productservice: ProductService ,private route:ActivatedRoute ,private router:Router
  ) { }

  idP:number=this.route.snapshot.queryParams['id'];
  ngOnInit(): void {
    this.loadData();
if(this.idP>0){
this.Edit(this.idP)
}

  }
  loadData() {
    this.brandService.loadActive().subscribe({
      next: data => {
        this.liBrand = data;
      }
    });
    this.StoreService.loadActive().subscribe(
      data => {
        this.liStore = data;
      });
    this.categoryService.loadActive().subscribe(
      data => {
        this.liCategory = data;

      });
    this.attributeValueService.loadAllColor().subscribe(
      data => {
        this.liColor = data;
      });
    this.attributeValueService.loadAllSize().subscribe(
      data => {
        this.liSize = data;
      });
  }
  save() {
    debugger
    var obj = new Product();
    obj.name = this.form.value["txt_name_Product"];
    obj.price =+ this.form.value["txt_price_Product"];
    obj.sku =+ this.form.value["txt_sku_Product"];
    obj.quantity =+ this.form.value["txt_qty_Product"];
    obj.availabilty =+ this.form.value["ddl_availability_product"];
    obj.description = this.form.value["txt_description_Product"];
    obj.brand_id =+ this.form.value["ddl_brand"];
    obj.store_id =+ this.form.value["ddl_store"];
    obj.category_id =+ this.form.value["ddl_category"];
    obj.size_id =+ this.form.value["ddl_size_product"];
    obj.color_id =+ this.form.value["ddl_color_product"];
    obj.path = this.filePath;
    // obj.filePath = this.filePathFolder;
    if(this.editMode){debugger
      obj.id=+this.idP
      this.Productservice.update(obj).subscribe(

        {
          next:()=>{
            this.Productservice.loadall().subscribe(
              ()=> {

                     this.loadData();
                     this.router.navigate(['/home/productlist']);
                     this.form.reset();
                     this.isAlert=true;
                     this.editMode=false
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

      this.Productservice.save(obj).subscribe(
       {
        next:()=>{
          this.Productservice.loadall().subscribe(
            ()=> {
                  this.router.navigate(['/home/productlist']);
                   this.loadData();
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

        }
      )
    }

  }

         fileSelected(event: any) {
    debugger
    let selectedFile = event.target.files[0];
    let fd = new FormData();
    fd.append(selectedFile.name, selectedFile);
    this.Productservice.uploadFile(fd)
      .subscribe(data=>{
        debugger
  this.filePath="http://localhost/Inventory/img/"+data})
this.isVisible=true
  }

Edit(id:number){
debugger
  this.editMode = true;
    // this.productId = id;

this.Productservice.edit(id).subscribe(

 data=>{debugger;
    this.form.form.patchValue({

      "txt_name_Product":data.name,
      "txt_price_Product":data.price,
      "txt_sku_Product":data.sku,
      "txt_qty_Product":data.quantity,
      "ddl_availability_product":data.availabilty,
      "txt_description_Product":data.description,
      "ddl_brand":data.brand_id,
      "ddl_store":data.store_id,
      "ddl_category":data.category_id,
      "ddl_size_product":data.size_id,
      "ddl_color_product":data.color_id,
      "img_picture":data.path,
     //filePath:data.filePath


    })
    this.img.nativeElement.src=data.path,
    this.isVisible=true
  }
)
}





}
