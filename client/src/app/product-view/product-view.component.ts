import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { CartManagementService } from '../services/cart-management.service';
import { ProductManagementService } from '../services/product-management.service';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

declare var require: any;
const cartModule = require('../add-item-to-cart.module');
const usersModule = require('../manage-users-cart');

declare var $: any;

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
  providers: [ ProductManagementService, CartManagementService ]
})
export class ProductViewComponent implements OnInit {
  products: String[] = [];
  noItems: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ProductService: ProductManagementService,
    private CartService: CartManagementService,
  private meta: Meta, private title:Title,  @Inject(PLATFORM_ID) private platformId: Object) {

     // Sets the <title></title>
      title.setTitle('Shopping-Cart: Products View');

     // Sets the <meta> tag for the page
     meta.addTags([
       { name: 'author', content: 'Shopping Cart' },
       { name: 'description', content: 'Shopping Cart: quickly view our products and navigate them.' },
     ]);
   }
  ngOnInit() {
    this.products = [];
    $('#loading').show();
    /*************on route change ********/
    this.route.params.forEach(params => {
      window.scroll(0, 0 );
      this.ProductService.getAllProducts().subscribe(data=>{
        console.log(data)
        if(data.success){
          this.products = data.products;
        }
        $('#loading').hide();
      })
    });
  }
   detach() {
    $('#loading').hide();
  }
  attach() {
    $('#loading').show();
  }
}
