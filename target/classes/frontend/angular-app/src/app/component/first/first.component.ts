import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {PopUpComponent} from "../pop-up/pop-up.component";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CartService} from "../../service/cart.service";
import {Book} from "../../model/book";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {
  books : Book[];
  products:any;
  fromValue:string;
  toValue:string;
  public totalItem : number = 0;
  searchText:string = '';
  constructor(private dialogRef:MatDialog,
              private httpClient:HttpClient,
              private router : Router,
              private cartService : CartService,
              public domSanitizer:DomSanitizer) { }

  ngOnInit() {
    let response = this.httpClient.get<Book[]>("http://localhost:8080/findAllBooks");
    response.subscribe(res => {
      res.forEach(book => {
        book.image = 'data:image/png;base64, ' + book.image;
      })
      this.books = res;
      this.books.forEach((a:any) => {
        Object.assign(a,{quantity:1,total:a.price});
      })
    });
    this.cartService.getProducts().subscribe(res=>{
      this.totalItem = res.length;
    })
  }
  sendData(event: any) {
    this.searchText = event.target.value;
  }

  goToPage(pageName: string):void {
    this.router.navigate([`${pageName}`]);
  }

  addToCart(book:any) {
    this.cartService.addToCart(book);
    return this.httpClient.post(`http://localhost:8080/cart`,book);
  }

  openDialogNew(book:any){
    this.dialogRef.open(PopUpComponent,{
      width:'600px',
      height:'400px',
      data:{
        book:book
      }
    })
  }
  getFromNumber(event: any) {
    this.fromValue=event.target.value
  }
  getToNumber(event: any) {
    this.toValue=event.target.value;
  }

  filterByPrice() {
    // @ts-ignore
    this.books = this.books.filter((book: { price: number; }) => book.price >= this.fromValue && book.price <= this.toValue);
  }

  sortByPrice() {
    this.books = this.books.sort(function (a: Book, b: Book){
      return a.price - b.price;
    });
  }

  sortByName() {
    this.books = this.books.sort(function (a:Book, b: Book){
      if (a.title < b.title) return -1;
      else if (a.title > b.title) return 1;
      else return 0;
    })
  }

  sortByNameReverse() {
    this.books = this.books.sort(function (a: Book, b: Book){
      if (a.title < b.title) return 1;
      else if (a.title > b.title) return -1;
      else return 0;
    })
  }

  sortByPriceDesc() {
    this.books = this.books.sort(function (a: Book, b: Book){
      if (a.price > b.price) return -1;
      else if (a.price < b.price) return 1;
      else return 0;
    });
  }

  refreshPage() {
    window.location.reload();
  }
}
