import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BrandService } from '../services/BrandService';
import { brand } from '../data/Brand';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {

  @ViewChild('f', { static: false }) 'Form1': NgForm;
  @ViewChild('txtsearch') 'txtsearch': ElementRef
  message!: string;
  isAlert = false;
  isSucceed = true;
  librand: brand[] = [];
  brandId: number = 0;
  pop: boolean = false;
  editMode: boolean = false;

  constructor(private brandService: BrandService) { }

  ngOnInit(): void {



    this.loadData();
  }

  loadData() {
    this.brandService.loadAll().subscribe(
      data => {

        this.librand = data
      }
    )
  }
  save() {
    if (this.Form1.valid) {

      var obj = new brand();
      obj.name = this.Form1.value["brandname"];
      obj.status = parseInt(this.Form1.value["brandstatus"]);
      obj.id = this.brandId;
      if (this.editMode) {
        this.brandService.update(obj).subscribe({
          next: () => {
            this.brandService.loadAll().subscribe(
              x => {
                this.pop = false;
                this.loadData();
                this.Form1.reset();
                this.isAlert = true;
                this.message = "Successfuly Update";
                this.isSucceed = true;
                setTimeout(() => {
                  this.isAlert = false;
                }, 2000)
              });
          },
          error: () => {
            this.isAlert = true;
            this.message = "Ops.  there is an error"
            this.isSucceed = false;
            setTimeout(() => {
              this.isAlert = false;
            }, 2000)
          }

        })
      }
    else {
      this.brandService.save(obj).subscribe(
        {

          next: () => {
            this.brandService.loadAll().subscribe(
              x => {
                this.pop = false;
                this.loadData();
                this.Form1.reset();
                this.isAlert = true;
                this.message = "Successfuly Added";
                this.isSucceed = true;
                setTimeout(() => {
                  this.isAlert = false;
                }, 2000)
              });
          },
          error: () => {
            this.isAlert = true;
            this.message = "Ops.  there is an error"
            this.isSucceed = false;
            setTimeout(() => {
              this.isAlert = false;
            }, 2000)
          }

        });;
    }
  }
  }

  Edit(id: number) {
    this.pop = true;
    this.editMode = true;
    this.brandId = id;
    this.brandService.edit(id).subscribe(
      data => {
        this.Form1.form.patchValue({
          "brandname": data.name,
          "brandstatus": data.status,
          "id": id

        })
      });
  }
  remove(Id: number) {
    let text = "Do you really want to delete this record ?\n This record can't restore";
    if (confirm(text) == true) {

      this.brandService.delete(Id).subscribe(() =>
        this.brandService.loadAll().subscribe(
          data => {
            this.librand = data
          }
        ));
      setTimeout(() => {
        this.isAlert = true;
        this.message = "Successfuly Delete Row";
        this.isSucceed = true;
        setTimeout(() => {
          this.isAlert = false;
        }, 2000)
      })
    }
  }



  search() {
    debugger
    var name = this.txtsearch.nativeElement.value;
    this.brandService.loadByName(name).subscribe(
      data => {
        this.librand = data;
      }
    )
  }
  onClick() {
    this.pop = true;
    this.editMode = false;
  }

  exit() {

    this.pop = false;
  }
  close() {
    this.pop = false;

  }
}




