import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductFullViewComponent } from './product-full-view/product-full-view.component';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuardGuard } from './auth-guard.guard';
import {UsersComponent} from './admin/users/users.component';
import {ProductsComponent} from './admin/products/products.component';
// import { NotFound404Component } from './not-found-404/not-found-404.component';

const routes: Routes = [
  {
    path: '',
    component: ProductViewComponent
  },
  {
    path: 'full-view/:id',
    component: ProductFullViewComponent
  },
  {
    path: 'cart-view',
    component: CartItemsComponent
  },
  {
    path: 'secure-checkout',
    component: CheckoutComponent
  },{
    path: 'thank-you',
    component: ThankyouComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'users',
    canActivate: [AuthGuardGuard],
    component: UsersComponent
  },
  {
    path: 'products',
    canActivate: [AuthGuardGuard],
    component: ProductsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardGuard]
})
export class AppRoutingModule { }
