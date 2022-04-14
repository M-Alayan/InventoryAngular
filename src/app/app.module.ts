import { Attribute, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { BrandsComponent } from './brands/brands.component';
import { StoresComponent } from './stores/stores.component';
import { AttributesComponent } from './attributes/attributes.component';
import { CompanyComponent } from './company/company.component';
import { CategoryComponent } from './category/category.component';
import { OrdersComponent } from './orders/orders.component';
import { RouterModule, Routes } from '@angular/router';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { MatListModule } from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { AttributeValueComponent } from './attribute-value/attribute-value.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { BrandService } from './services/BrandService';
import { StoreService } from './services/StoreService';
import { CategoryService } from './services/CategoryService';
import { CompanyService } from './services/CompanyService';
import { CountryService } from './services/CountryService';
import { CurancyService } from './services/CurancyService';
import { ProductService } from './services/ProductService';
import { AttributeService } from './services/AttributeService';
import { AttributeValueService } from './services/AttributeValueService';
import { VmAttribute } from './data/VmAttribute';
import { AttributeValue } from './data/AttributeValue';
import { OrderService } from './services/OrderService';
import { AccountService } from './services/AccountService';
import { HomeComponent } from './home/home.component';








const appRoutes:Routes=[


  {path:'',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'home',component:HomeComponent,children:[
    {path:'attributes',component:AttributesComponent},
    {path:'brands',component:BrandsComponent},
    {path:'category',component:CategoryComponent},
    {path:'company',component:CompanyComponent},
    {path:'orders',component:OrdersComponent},
    {path:'products',component:ProductsComponent},
    {path:'stores',component:StoresComponent},
    {path:'manageorder',component:ManageOrdersComponent},
    {path:'productlist',component:ProductListComponent },
    {path:'attributevalue',component:AttributeValueComponent},
  ]}

]
@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    BrandsComponent,
    StoresComponent,
    AttributesComponent,
    CompanyComponent,
    CategoryComponent,
    OrdersComponent,
    ManageOrdersComponent,
      MenuListItemComponent,
      ProductListComponent,
      AttributeValueComponent,
      LoginComponent,
      SignupComponent,
      HomeComponent
   ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MatFormFieldModule,
    MatSortModule,
    MatRippleModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatTooltipModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
 

  ],

  providers: [HttpClientModule,BrandService
,StoreService,CategoryService,CountryService,
CompanyService,CurancyService,ProductService,
AttributeService,AttributeValueService,ProductsComponent,
VmAttribute,Attribute,AttributeValue,OrderService,AccountService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
