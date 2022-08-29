import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AdminService } from '../admin/admin.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isShow=false;
  isShowLogIn=true;
  isShowLogOut=false;
  constructor(private authService:AuthService, private adminService:AdminService) { 
    this.adminService.cartSubject.subscribe(data =>{
      this.totalItem=data;
      
    })
    this.adminService.productmini.subscribe(data =>{
      this.CartDetailheader=data;
      // console.log(this.getCartDetailheader)
    })
    this.adminService.qty.subscribe(data =>{
      this.qtyCart=data;
    })
  }
  public qtyCart:any;
  public totalItem:number=0;
  numberProduct:any=[];
  productCart:any=[];
  CartDetailheader:any=[];
  ngOnInit(): void {  
    this.adminService.loadCart();
    this.cartDetail();

    this.adminService.getProduct().subscribe((res:any)=>{
      this.numberProduct.push(res);
      this.cartItemFunc();
    })

    this.adminService.getProduct().subscribe((res :any)=>{
      this.productCart.push(res)
      this.productItemFunc();
    })

    // this.adminService.cartItemList().subscribe((res:any)=>{
    //   this.qtyCart.push(res);
      
    // })
    // console.log(this.numberProduct)
  }
  cartItemFunc(){
    this.totalItem= this.getCartItemFromLocal().length ?? 0;
  }
  productItemFunc(){
    this.CartDetailheader=this.getProductItemFromLocal();
  }
  // qtyCarts(){
  //   this
  // }
  getqtyItemFromLocal(): any {

  }
  getCartItemFromLocal(): any {
    const data = localStorage.getItem('cart-item');
    if (!data) return;
    return  JSON.parse(data)
  }
  getProductItemFromLocal():any {
    const data=localStorage.getItem('cart-item');
    if(!data)  return;
    return JSON.parse(data);
  }
  get Total(){
    return this.getCartDetail.reduce((sum:any,x:any) =>({
      qtyTotal: 1,
      priceold:sum.priceold +x.qtyTotal * x.priceold
    }),
    {qtyTotal:1, priceold:0}
    ).priceold;
  }
  get totalItems():number {
    return this.getCartItemFromLocal.length;
  }
  get productItems():any {
    return this.getProductItemFromLocal;
  }
  getCartDetail:any=[];
  cartDetail(){
    if(localStorage.getItem('cart-item')){
      this.getCartDetail=JSON.parse(localStorage.getItem('cart-item') || '{}') ;
      console.log(this.getCartDetail);
    }
  }



  // cartDetailHeader(){
  //   if(localStorage.getItem('cart-item')){
  //     this.getCartDetailheader=JSON.parse(localStorage.getItem('cart-item') || '{}') ;
  //     // console.log(this.getCartDetailheader);
  //   }
  // }








  // -----------------------Log In & Log Out--------------------------
  isDisplay=false;
  clickToggle(){
    this.isDisplay=!this.isDisplay;
  }

  logIn(){
    this.authService.logIn();
    this.isShow=true;
    this.isShowLogIn=false;
    this.isShowLogOut=true;
  }
  logOut(){
    this.authService.logOut();
    this.isShowLogOut=false;
    this.isShowLogIn=true;
    this.isShow=false;
  }
}



