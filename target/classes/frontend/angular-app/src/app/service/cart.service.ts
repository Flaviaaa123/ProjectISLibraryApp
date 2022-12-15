import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Cartitem} from "../model/cartitem";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl = "http://localhost:8080/cart"
  baseUrl2= "http://localhost:8080/email"
  public cartItemList: any = []
  public productList = new BehaviorSubject<any>([]);
  email = sessionStorage.getItem('email');

  constructor(private httpClient: HttpClient) {
  }

  getProducts() {
    return this.productList.asObservable();
  }

  addToCart(product: Cartitem){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    return this.httpClient.post<String>(`${this.baseUrl2}`,this.email);
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total * a.quantity;
    })
    return grandTotal;
  }

  removeCartItem(product: Cartitem) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.title == a.title) {
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }

  checkout(products: Cartitem[]): Observable<void> {
    return this.httpClient.post<void>(`${this.baseUrl}`, products);
  }
}
