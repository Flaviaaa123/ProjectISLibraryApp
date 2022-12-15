import {Component, OnInit} from '@angular/core';
import {CartService} from "../../service/cart.service";
import {Cartitem} from "../../model/cartitem";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import * as XLSX from 'xlsx';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  fileName = 'export-data.xlsx';
  public products: Cartitem[];
  public grandTotal !: number;
  inProgess : boolean = false;
  cartItem: Cartitem = new Cartitem();

  constructor(private cartService: CartService,
              private router:Router,
              private httpClient:HttpClient) {
  }
  ngOnInit(): void {
    this.cartService.getProducts().subscribe(res => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  emptyCart() {
    this.cartService.removeAllCart();
  }

  plata() {
    this.inProgess = true;
    this.cartService.checkout(this.products).subscribe(res => {
      this.inProgess = false;
      Swal.fire('Congrats!', 'Order successfully sent!', 'success')
      this.router.navigate([`/first`])
      this.cartService.removeAllCart();
    }, error => Swal.fire('Oops!', 'Cant send order', 'error'));
  }

  decrease(item:Cartitem) {
    item.quantity--;
    this.grandTotal = this.cartService.getTotalPrice();
  }

  increase(item:Cartitem) {
    item.quantity++;
    this.grandTotal = this.cartService.getTotalPrice();
  }

  exportExcel():void{
    let element = document.getElementById('excel-table');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb:XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');
    XLSX.writeFile(wb,this.fileName);
  }
}
