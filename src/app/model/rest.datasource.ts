import {Injectable} from '@angular/core';
import {Observable, Operator} from 'rxjs';
import {Product} from './product.model';
import {HttpClient, HttpClientModule, HttpEvent, HttpHeaders, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Order} from './order.model';
import {map} from 'rxjs/internal/operators';
import {Http, Request, RequestMethod} from '@angular/http';


const PROTOCOL = 'http';
const PORT = '3500';

@Injectable()
export class RestDatasource {
  baseUrl: string;
  auth_token: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  // authenticate(user: string, pass: string): Observable<boolean> {
  //   return this.http.request(new Request({
  //     method: RequestMethod.Post,
  //     url: this.baseUrl + 'login',
  //     body: {name: user, password: pass}
  //   })).pipe(map(response => {
  //     let r = response.json();
  //     this.auth_token = r.success ? r.token : null;
  //     return r.success;
  //   }));
  // }

  getProducts(): Observable<Product[]> {
    //return this.http.get<Product>(this.baseUrl + 'products');
    return this.sendRequest('GET', 'products') as Observable<Product[]>;
  }

  saveOrder(order: Order): Observable<Order> {
    // return this.http.post<Order>(this.baseUrl + 'orders', order);
    return this.sendRequest('POST', 'orders', order) as Observable<Order>;
  }

  saveProduct(product: Product): Observable<Product> {
    return this.sendRequest('POST', 'products', product, true) as Observable<Product>;
  }

  updateProduct(product: Product): Observable<Product> {
    return this.sendRequest('PUT', `products/${product.id}`, product, true) as Observable<Product>;
  }

  deleteProduct(id: number): Observable<Product> {
    return this.sendRequest('DELETE', `products/${id}`, null, true) as Observable<Product>;
  }

  getOrders(): Observable<Order[]> {
    return this.sendRequest('GET', 'orders', null, true) as Observable<Order[]>;
  }

  deleteOrder(id: number): Observable<Order> {
    return this.sendRequest('DELETE', `orders/${id}`, null, true) as Observable<Order>;
  }

  updateOrder(order: Order): Observable<Order> {
    return this.sendRequest('PUT', `orders/${order.id}`, order, true) as Observable<Order>;
  }

  private sendRequest(verb: string, url: string, body?: Product | Order, auth: boolean = false): Observable<Product | Product[] | Order | Order[]> {
    let header;
    if (auth && this.auth_token != null) {
      header = new HttpHeaders({['Authorization']: `Bearer<${this.auth_token}>`});
    }
    return this.http.request(verb, this.baseUrl + url, {body: body, responseType: 'json', headers: header});
  }

  authenticate(user: string, pass: string): Observable<boolean> {
    return this.http.request('POST', this.baseUrl + 'login', {
      body: {name: user, password: pass},
    }).pipe(map((r: any) => {
      this.auth_token = r.success ? r.token : null;
      return r.success;
    }));
  }
}
