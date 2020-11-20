import { Injectable } from '@angular/core';
import {GlobalPaths} from '../global';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
const BASE_URL = 'http://localhost:8000/api'

@Injectable()
export class ProductManagementService {

  constructor(private http: Http) { }
  
  getAllProducts(){
    return this.http
    .get(BASE_URL+'/products')
    .map(resp => resp.json())
    .catch((error: any) => Observable.throw(error.json()));
  }
  getProductById(_id){
    return this.http
    .get(BASE_URL+'/products/'+_id)
    .map(resp => resp.json())
    .catch((error: any) => Observable.throw(error.json()));
  }
  addProduct(params){
    const formData: FormData = new FormData();
    formData.append('img', params.img_file, params.img_file.name);
    formData.append('name', params.name);
    formData.append('price', params.price);
    formData.append('quantity', params.quantity);
    return this.http
    .post(BASE_URL+'/products',formData)
    .map(resp => resp.json())
    .catch((error: any) => Observable.throw(error.json()));
  }
  updateProduct(params){
    const formData: FormData = new FormData();
    if(params.img_file){
      formData.append('img', params.img_file, params.img_file.name);
    }    
    formData.append('name', params.name);
    formData.append('price', params.price);
    formData.append('_id', params._id);
    formData.append('quantity', params.quantity);
    return this.http
    .post(BASE_URL+'/products/update',formData)
    .map(resp => resp.json())
    .catch((error: any) => Observable.throw(error.json()));
  }
  deleteProduct(product){
    return this.http
    .get(BASE_URL+'/products/delete/'+product._id)
    .map(resp => resp.json())
    .catch((error: any) => Observable.throw(error.json()));
  }
}
