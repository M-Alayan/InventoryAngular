import { Product } from "./Product";

export class Order{
id!:number;
customer_name!:string;
customer_address!:string;
customer_phone!:string;
product_id!:number;
amount!:number;
rate!:number
gross_amount!:number;
quantity!:number;
vat!:number;
descount!:number;
net_amount!:number;
product!:Product;

}
