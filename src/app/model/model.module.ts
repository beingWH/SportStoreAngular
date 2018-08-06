import {NgModule} from '@angular/core';
import {ProductRepository} from './product.repository';
import {StaticDatasource} from './static.datasource';
import {Cart} from './cart.model';
import {Order} from './order.model';
import {OrderRepository} from './order.repository';
import {HttpClientModule} from '@angular/common/http';
import {RestDatasource} from './rest.datasource';

@NgModule({
  imports: [HttpClientModule],
  providers: [ProductRepository, StaticDatasource, Cart, Order, OrderRepository, {provide: StaticDatasource, useClass: RestDatasource}]
})

export class ModelModule {
}
