import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {StoreModule} from './store/store.module';
import {RouterModule} from '@angular/router';
import {StoreComponent} from './store/store.component';
import {CartDetailComponent} from './store/cartDetail.component';
import {CheckoutComponent} from './store/checkout.component';
import {StoreFirstGuard} from './storeFirst.guard';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, StoreModule, HttpClientModule,
    RouterModule.forRoot([
      {path: 'store', component: StoreComponent, canActivate: [StoreFirstGuard]},
      {path: 'cart', component: CartDetailComponent, canActivate: [StoreFirstGuard]},
      {path: 'checkout', component: CheckoutComponent, canActivate: [StoreFirstGuard]},
      {path: 'admin', loadChildren: 'src/app/admin/admin.module#AdminModule', canActivate: [StoreFirstGuard]},
      {path: '**', redirectTo: '/store'}
    ])
  ],
  providers: [StoreFirstGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
