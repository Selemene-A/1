import { Component, OnInit ,PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
// import { Categories } from '../enum/categories.enum';
import { ProductManagementService } from '../../services/product-management.service';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

declare var require: any;
declare var $: any;
const usersModule = require('../../manage-users-cart');

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ ProductManagementService ]
})
export class ProductsComponent implements OnInit {
  products: Object[] = [];
  img: String = '';
  _id:String = '';
  img_file: File = null;
  name: String = '';
  price: Number = 0;
  quantity: Number = 0;
  product: Object = {};
  addProduct: Boolean = false;
  noItems: Boolean = false;
  
  errmodal:String = '';
  err:String = '';
  success:String = '';

  constructor(
    private productService:ProductManagementService,
    private route: ActivatedRoute,
    private router: Router,
  private meta: Meta, private title:Title,  @Inject(PLATFORM_ID) private platformId: Object) {
    title.setTitle('Shopping-Cart: Products View');
     meta.addTags([
       { name: 'author', content: 'Shopping Cart' },
       { name: 'description', content: 'Shopping Cart: quickly view our products and navigate them.' },
     ]);
  }
  Saveproduct(){
    this.validateInputs();
    if(this.err||this.errmodal){
      return;
    }
    this.product = {
      name:this.name,
      price:this.price,
      img_file:this.img_file,
      quantity:this.quantity
    };
    if(this.addProduct){
      this.productService.addProduct(this.product).subscribe( data =>{
        if(data.success ===true){
          this.getAllProduct()
          this.detach()
        }
      })
    }else{
      this.product ={
        name:this.name,
        price:this.price,
        img_file:this.img_file,
        quantity:this.quantity,
        _id:this._id
      } 
      this.productService.updateProduct(this.product).subscribe(data => {
        if(data.success ===true){
          this.getAllProduct()
          this.detach()
        }
      })
    }
  }
  deleteProduct(product){
    this.productService.deleteProduct(product).subscribe(data=>{
      if(data.success ===true){
        this.getAllProduct()
        this.detach()
      }
    })
  }
  validateInputs() {
    if (this.img_file === null  &&this.addProduct) {
      this.errmodal = 'Please select Image file.';
    }
    if (this.price === 0) {
      this.errmodal = 'Please input correct price.';
    }
    if (this.name === '') {
      this.errmodal = 'Please input correct Name';
    }
    setTimeout(() => {
      this.errmodal = "";
    }, 3000);
  }
  showEditModal(product) {
    $('.ddd').val(null)
      if ( product) {
        this.product  = [];
        this._id = product._id;
        this.img = product.img;
        this.name = product.name;
        this.price = product.price;
        this.quantity = product.quantity;
        this.addProduct = false
        $('#quickView').modal('show');
        this.product = product ;
      }else{
        this._id ='';
        this.product  = [];
        this.img = '';
        this.name = '';
        this.price = 0;
        this.quantity = null;
        this.addProduct = true;
        $('#quickView').modal('show');
        this.product = product ;
      }
  }
  handleInputChange(name,value){
    switch (name) {
      case 'name':
        this.name = value
        break;
      case 'price':
        this.price = value
        break;
      case 'quantity':
        this.quantity = value
        break;
      case 'img_file':
        this.img_file = value[0]
        break;
          
      default:
        break;
    }
  }
  getAllProduct(){
    this.productService.getAllProducts().subscribe(data => {
      if(data.success === true)
      {
        this.products = data.products;
        this.noItems = false ;
      }else {
      this.noItems = true ;
      this.products = [];
      }
      this.closeModal();
    }, err => {
      console.log('dddddddddddddddddd !!!!');
    })

  }
  ngOnInit() {
    this.products = [];
    $('#loading').show();
    /*************on route change ********/
    this.route.params.forEach(params => {
      window.scroll(0, 0 );
      this.getAllProduct()
      $('#loading').hide();
    });
  }
  closeModal(){
    $('#quickView').modal('hide');
  }
  detach() {
    $('#loading').hide();
  }
  attach() {
    $('#loading').show();
  }

}