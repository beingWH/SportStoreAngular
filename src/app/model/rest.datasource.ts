import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from './product.model';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import {Order} from './order.model';


const PROTOCOL = 'http';
const PORT = '3500';

@Injectable()
export class RestDatasource {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = '${PROTOCOL}://${location.hostname}:${PORT}/';
  }

  getProducts(): Observable<Product> {
    return this.sendRequest('GET', 'products');
  }

  saveOrder(order: Order): Observable<Order> {
    return this.sendRequest('POST', 'orders', order);
  }

  private sendRequest(verb: string, url: string, body?: Product | Order): Observable<Product | Order> {
    return this.http.request(new HttpRequest(verb, url, body)).map(response => response.json());
  }


}
