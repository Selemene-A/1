import { Component, OnInit, AfterViewInit , PLATFORM_ID , Inject} from '@angular/core';
import $ from 'jquery/dist/jquery';
import { Address } from '../interfaces/address.interface';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { CartManagementService } from '../services/cart-management.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

var moment = require('moment');
declare var require: any;
const usersModule = require ('../manage-users-cart');

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [CartManagementService]
})
export class CheckoutComponent implements OnInit {



  constructor(private route: ActivatedRoute,
    private router: Router, private cartManagementService: CartManagementService,
     @Inject(PLATFORM_ID) private platformId: Object) { }


  ngOnInit() {
    localStorage.setItem('guest_cart',null);
    let user_data =  JSON.parse(localStorage.getItem('user_data'));
    user_data.guest_cart = [];
    localStorage.setItem('user_data',JSON.stringify(user_data))
    this.cartManagementService.deleteCart(localStorage.getItem('user_token')).subscribe(data=>{
      console.log(data)
    })
  }
}
