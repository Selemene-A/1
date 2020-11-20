import { Component, OnInit ,PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import {SignUpService} from '../../services/sign-up.service';
import { Meta, Title } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import SimpleCryptoJS from 'simple-crypto-js';
const USER_TOKEN  = SimpleCryptoJS.generateRandom();
const SECRET_KEY = 'XHER32985RTBDFMGNDKJS5643FAZQW' ;
const simpleCrypto = new SimpleCryptoJS(SECRET_KEY);
declare var require: any;
declare var $: any;



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [  SignUpService ]
})
export class UsersComponent implements OnInit {
  users: String[] = [];
  _id:String = "";
  name: String = '';
  email: String = '';
  password :String='';
  addUser: Boolean = false;
  fetchedData: any = {};
  noItems: Boolean = false;
  error:String = '';
  success:String = '';
  errormodal:String = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private SignUpService:SignUpService,
    private meta: Meta, private title:Title,  @Inject(PLATFORM_ID) private platformId: Object) {

    title.setTitle('Shopping-Cart:');
     meta.addTags([
       { name: 'author', content: 'Shopping Cart' },
       { name: 'description', content: '.' },
     ]);
   }
  saveUser(){
    this.validateInputs();
    if(this.error||this.errormodal){
      return;
    }
    let user = {
      'name': this.name,
      'email': this.email,
      'password': this.password,
      '_id':this._id,
      'user_token': USER_TOKEN,
      'items_in_cart': []
    };
    if(this.addUser){
      this.SignUpService.getRegisteredUserByEmail(this.email).subscribe(data => {
        if(data.users.length){
          this.emailIsInUse();
          return;
        }else{
          this.SignUpService.createUser(user).subscribe(data=>{
            console.log(data);
            if(data.success === true){
              this.userCreated();
              this.getAllUSer();
            }else{
              this.userNotCreated();
            }
            this.closeModal();
          })
        }
      }, err => {
        this.userNotCreated();
      });
      
    }else{
      console.log(user)
      this.SignUpService.updateUser(user).subscribe(data=>{
        if(data.success === true){
          this.userUpdated();
          this.getAllUSer()
        }else{
          this.userNotUpdated();
        }
        this.closeModal();
      })
    }
  }
  deleteUser(user){
    this.SignUpService.deleteUser(user).subscribe(data=>{
      if(data.success){
        this.success= "A User deleted";
        this.getAllUSer();
      }
    })
  }
  handleInputChange(name,value){
    console.log(name,value)
    switch (name) {
      case 'name':
        this.name = value;
        break;
      case 'email':
        this.email = value;
        break;
      case 'password':
        this.password = value;
        break;
    }
  }
  showEditModal(user) {
    $('.ddd').val('')
      if ( user) {
        this.fetchedData  = [];
        this.name = user.name;
        this.email = user.email;
        this._id = user._id;
        this.password = '';
        this.addUser = false;
        $('#quickView').modal('show');
        this.fetchedData = user ;
      }else{
        this._id = '';
        this.name = '';
        this.email = '';
        this.password = '';
        this.addUser = true;
        $('#quickView').modal('show');
        this.fetchedData = {} ;
      }
  }
  closeModal(){
    $('#quickView').modal('hide');
  }
  userCreated() {
    window.scroll( 0, 0);
    this.success = 'New account created.';
    setTimeout(() => {
      this.success = '';
    }, 3000);
  }
  emailIsInUse() {
        this.error = 'Sorry, (' + this.email + ') is already in use .';
        setTimeout(() => {
          this.error = '';
        }, 3000);   
  };
  userNotCreated() {
    this.error = "Error creating account, please try again !";
    setTimeout(() => {
      this.error = "";
    }, 3000);

  }
  userNotUpdated() {
    this.error = "Error updating account, please try again !";
    setTimeout(() => {
      this.error = "";
    }, 3000);

  }
  userUpdated(){
    window.scroll( 0, 0);
    this.success = 'Account updated.';
    setTimeout(() => {
      this.success = '';
    }, 3000);
  }
  validateInputs() {
    if ((this.password === '' || this.password.length < 5) &&this.addUser) {
      this.errormodal = 'Password is too short.';
    }
    if (this.email === '' || ! this.validateEmail(this.email)) {
      this.errormodal = 'Please input correct Email';
    }
    if (this.name === '') {
      this.errormodal = 'Please input correct name.';
    }
    setTimeout(() => {
      this.errormodal = "";
    }, 3000);
  }
  validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }
  getAllUSer(){
    this.SignUpService.getAllUsers().subscribe(data => {
      if(data.success === true){
        this.users = data.users;
      }
      $('#loading').hide();
    })
  }
  ngOnInit() {
    this.users = [];
    $('#loading').show();
    window.scroll(0, 0 );
     this.getAllUSer();
  }

   /************ unload ****/
   detach() {
    $('#loading').hide();
  }
  attach() {
    $('#loading').show();
  }

}