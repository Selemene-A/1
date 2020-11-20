import { Injectable } from '@angular/core';
import { Http,  Response, Headers, URLSearchParams, RequestOptions, QueryEncoder } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
const BASE_URL = 'http://localhost:8000/api'

@Injectable()
export class CartManagementService {

  constructor(private http: Http) { }

  removeFromCart(product_id,token){
    let headers = new Headers({});
      let options = new RequestOptions({ headers: headers});
      return this.http.post(BASE_URL+'/carts/delete', {
        id:product_id,
        token:token,
      }, options).map(data => data.json()).catch(this.catch);
  }
  /*********************** ends ***************/
  deleteCart(token){
      let headers = new Headers({});
      let options = new RequestOptions({ headers: headers});
      return this.http.delete(BASE_URL+'/carts/'+token, options).map(data => data.json()).catch(this.catch);
  }
  /******************** post item to customer cart *****/
  addCustomerCart(requestBody) {
    if(requestBody)
    {  
      let headers = new Headers({});
      let options = new RequestOptions({ headers: headers});
      let body = new URLSearchParams();
      if(requestBody.hasOwnProperty('item')) {
        body.set('item',JSON.stringify(requestBody.item));
      }
    
      if(requestBody.hasOwnProperty('token')) {
        body.set('token', requestBody.token);
      }
      return this.http.post(BASE_URL+'/carts', body, options).map(data => data.json()).catch(this.catch);
    } 
  }
  /*********************** ends ***************/

  /******************** post item to customer cart *****/
  updateCustomerCart(requestBody) {
    if(requestBody)
    {  
      let headers = new Headers({});
      let options = new RequestOptions({ headers: headers});
      let body = new URLSearchParams();
      if(requestBody.hasOwnProperty('item')) {
        body.set('item',JSON.stringify(requestBody.item));
      }
    
      if(requestBody.hasOwnProperty('token')) {
        body.set('token', requestBody.token);
      }
      return this.http.put(BASE_URL+'/carts', body, options).map(data => data.json()).catch(this.catch);
    } 
  }
  /*********************** ends ***************/

  /******************** post item to customer cart *****/
  getCustomerCart(token) {
    if(token)
    {  
      return this.http.get(BASE_URL+'/carts/'+token).map(data => data.json()).catch(this.catch);
    } 
  }


/******************** post item to customer cart *****/
postItemToCustomerHistory(requestBody) {
  if(requestBody)
  {  
    let headers = new Headers({});
    let options = new RequestOptions({ headers: headers});
    let body = new URLSearchParams();
    if(requestBody.hasOwnProperty('item')) {
      body.set('item',JSON.stringify(requestBody.item));
    }
  
    if(requestBody.hasOwnProperty('token')) {
      body.set('token', requestBody.token);
    }

    return this.http.post('/postItemInHistory', body, options).map(data => data.json()).catch(this.catch);
  } 
}
/*********************** ends ***************/

/******************** post item to customer cart *****/
expandHistory(requestBody) {
  if(requestBody)
  {  
    let headers = new Headers({});
    let options = new RequestOptions({ headers: headers});
    let body = new URLSearchParams();
    if(requestBody.hasOwnProperty('item')) {
      body.set('item',JSON.stringify(requestBody.item));
    }
  
    if(requestBody.hasOwnProperty('token')) {
      body.set('token', requestBody.token);
    }
    return this.http.put('/expandUserOrderHistory', body, options).map(data => data.json()).catch(this.catch);
  } 
}
/*********************** ends ***************/
/******************** post item to customer cart *****/
getCustomerHistory(token) {
  if(token)
  {  
    return this.http.get('/getUserOrderHistory?token='+token).map(data => data.json()).catch(this.catch);
  } 
}
/***************** ends **********************/


    /***************** catch error *****/
    catch(error) {
      return Observable.throw(error.json() || 'Error processing cart, please try again.');
    }
  }