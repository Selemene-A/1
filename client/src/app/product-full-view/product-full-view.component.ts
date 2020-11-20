import { Component, OnInit, AfterViewInit , PLATFORM_ID , Inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { ProductManagementService } from '../services/product-management.service';
import {CartManagementService}   from '../services/cart-management.service';
import $ from 'jquery/dist/jquery';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

declare var require: any;

const cartModule = require('../add-item-to-cart.module');
const usersModule = require('../manage-users-cart');

@Component({
  selector: 'app-product-full-view',
  templateUrl: './product-full-view.component.html',
  styleUrls: ['./product-full-view.component.scss'],
  providers: [ProductManagementService, CartManagementService]
})
export class ProductFullViewComponent implements OnInit, AfterViewInit {

category: String = '';
_id: String = '';
fetchedData: String[] = [];
slicedObject: any;
quantities: Number[] = [];
quantity: any;
selectedValue: any = 0;
qtyNotSelected: Boolean = false;
cartItem: any ;
itemAdded: Boolean = false ;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService:ProductManagementService,
    private cartManagementService :CartManagementService,
  private meta: Meta, private title: Title, @Inject(PLATFORM_ID) private platformId: Object) {

    // Sets the <title></title>
    title.setTitle('Shopping Cart: Product full view');

    // Sets the <meta> tag for the page
    meta.addTags([
      { name: 'author', content: 'Shopping Cart' },
      { name: 'description', content: 'Shopping Cart: view a product in full view mode.' },
    ]);

   }

    ngAfterViewInit(): void {
    
    }


addQuantities(product)
{
  for( let i = 1 ; i <= product.quantity; i++)
  {
      this.quantities.push( i );
  }
}

/************** add item to cart *******/
addToCart() {
  console.log("Attaching loader :: ");
    this.attach();
    // debugger;
   /***************** set error message if quantity not set *****/
   if (0 === this.selectedValue || '0' === this.selectedValue ) {
     this.qtyNotSelected = true ;
     this.itemAdded = false ;
     window.scroll(0, 0 );
     setTimeout(() => {
      this.qtyNotSelected = false ;
      window.scrollTo(0, document.body.scrollHeight);
     }, 2000);
     this.detach();
   }else {
      /******************** starts ******/
      let data;
      if ( isPlatformBrowser(this.platformId) ) {
          data = usersModule.getUserData(localStorage.getItem('user_data'));
       }
     /*********** extract the old values in the storage and append the new ones  ****/
     let _extract_data = [];
      if(!usersModule.isRegisteredUser(data)) {
        _extract_data = data.guest_cart ? data.guest_cart : new Array();
        _extract_data = _extract_data.filter (object => object._id !== this.slicedObject._id );
        this.slicedObject['quantity'] = this.selectedValue;
        _extract_data.unshift(this.slicedObject);
        data.guest_cart = _extract_data ;
        if ( isPlatformBrowser(this.platformId) ) {
          localStorage.setItem('guest_cart', JSON.stringify(_extract_data ));
          localStorage.setItem('user_data', JSON.stringify(data));
         }
        
        this.itemAddedToCart();
     }else {
      this.slicedObject['quantity'] = this.selectedValue;
      let token = localStorage.getItem('user_token'), body = {'item': {} , 'token': '','add':true};
      body.item = this.slicedObject;

      body.token = token;
      this.cartManagementService.getCustomerCart(token).subscribe(data => {
        console.log(data)
        if(data.cart) {
          this.cartManagementService.updateCustomerCart(body).subscribe(data => {
            console.log(data)
            this.itemAddedToCart();
          }, err => {
            console.log(err);
            this.detach();
          })
        }else if(!data.cart) {
          this.cartManagementService.addCustomerCart(body).subscribe(data => {
          console.log(data)
          this.itemAddedToCart();
          }, err => {
            console.log(err);
            this.detach();
          }); 
        }
      }, err => {
        console.log(err);
        this.detach();
      })
    }
   }
}
/*************** ends *****************/

setQty()
{

}
  ngOnInit() {
    this._id = this.route.snapshot.params['id'];
    this.productService.getProductById(this._id).subscribe(data=>{
      if(data.success){
        this.slicedObject = data.product
        this.addQuantities(data.product);
      }
    })
  }

   /**************** success ******/
   itemAddedToCart() {
    this.qtyNotSelected = false ;
    this.itemAdded = true ;
    window.scroll(0, 0 );
    setTimeout(() => {
     this.itemAdded = false ;
    }, 2000);
    // $('.trigger').click();
    this.detach();
  }
  /******************ends *********/

    /************ unload ****/
    detach() {
      // $('#loading').hide();
    }
    attach() {
      // $('#loading').show();
    }
}
