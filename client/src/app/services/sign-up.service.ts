import { Injectable } from '@angular/core';
import { Http,  Response, Headers, URLSearchParams, RequestOptions, QueryEncoder } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
const BASE_URL = 'http://localhost:8000/api'

@Injectable()
export class SignUpService {

  constructor(private http: Http) { }
  
  /*************** create new usere ******/
  createUser(requestParam) {

    if(requestParam) {
      let headers = new Headers({});
      let options = new RequestOptions({ headers: headers});

       let body = new URLSearchParams();
       body.set('name', requestParam.name);
       body.set('password', requestParam.password);
       body.set('email', requestParam.email);
       body.set('user_token', requestParam.user_token);
       
      return this.http.post(BASE_URL+'/users/register', body , options ).map(data => data.json()).catch(this.catch);
    }
  }
  updateUser(requestParam){
    if(requestParam) {
      let headers = new Headers({});
      let options = new RequestOptions({ headers: headers});

       let body = new URLSearchParams();
       body.set('_id', requestParam._id);
       body.set('name', requestParam.name);
       body.set('password', requestParam.password);
       body.set('email', requestParam.email);       
      return this.http.post(BASE_URL+'/users/update', body , options ).map(data => data.json()).catch(this.catch);
    }
  }
  deleteUser(requestParam){
    if(requestParam) {
      let headers = new Headers({});
      let options = new RequestOptions({ headers: headers});
       let body = new URLSearchParams();
       body.set('email', requestParam.email);       
      return this.http.post(BASE_URL+'/users/delete', body , options ).map(data => data.json()).catch(this.catch);
    }
  } 
  /*************** get all users ************/
  getAllUsers(){
    return this.http.get(BASE_URL+'/users')
          .map(data=>data.json())
          .catch(this.catch);
  }
  /*************** get users  by email************/

  getRegisteredUserByEmail(email) {
    if(email)
    {
      return this.http.get(BASE_URL+'/users?email='+email)
              .map(data => data.json())
              .catch(this.catch);
    } 
  }
  /******************* ends *****************/

  /******************** validate password *****/
  validateUserPassword(object) {
    if(object)
    {  
      let headers = new Headers({});
      let options = new RequestOptions({ headers: headers});
      let body = new URLSearchParams();
    
      if(object.hasOwnProperty('email')) {
          body.set('email', object.email);
      }

      if(object.hasOwnProperty('password')) {
        body.set('password', object.password);
      }
      return this.http.post(BASE_URL+'/users/login', body, options).map(data => data.json()).catch(this.catch);
    } 
  }
    /***************** catch error *****/
  catch(error) {
    return Observable.throw(error.json() || 'Error creating user');
  }
}
