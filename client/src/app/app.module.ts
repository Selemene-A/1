import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
// import { HomeComponent } from './home/home.component';
import { PartialsComponent } from './partials/partials.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { HttpModule } from '@angular/http';
import { ProductFullViewComponent } from './product-full-view/product-full-view.component';
import { BreadcrumbsComponent } from './partials/breadcrumbs/breadcrumbs.component';
import { FormsModule , ReactiveFormsModule  } from '@angular/forms';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminComponent } from './admin/admin.component';
import { UsersComponent } from './admin/users/users.component';
import { ProductsComponent } from './admin/products/products.component';
// import { AboutUsComponent } from './about-us/about-us.component';
// import { ContactUsComponent } from './contact-us/contact-us.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    // HomeComponent,
    PartialsComponent,
    ProductViewComponent,
    ProductFullViewComponent,
    BreadcrumbsComponent,
    CartItemsComponent,
    CheckoutComponent,
    ThankyouComponent,
    SignUpComponent,
    AdminComponent,
    UsersComponent,
    ProductsComponent,


  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'shopping-cart-master'}),
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
