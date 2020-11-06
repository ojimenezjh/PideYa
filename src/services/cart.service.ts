import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CartProduct } from '../models/Cart/CartProduct';
import { CartDetail } from '../models/Cart/CartDetail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  API_URI = 'http://82.223.128.240:3000/api';

  constructor(private http: HttpClient) { }

  getCart() {
    return this.http.get<CartDetail[]>(`${this.API_URI}/cart`); 
  }

  /* getCard(id: Number) {
    return this.http.get<Card>(`${this.API_URI}/cards/${id}`);
  } */

/*   searchCard(nombre: String) {
    return this.http.get<Card[]>(`${this.API_URI}/cards/name/${nombre}`);
  } */

  removeProduct(id_detalles_pedidos: Number) {
    return this.http.delete(`${this.API_URI}/cart/${id_detalles_pedidos}`);
  }

  addProduct(CartProduct: CartProduct) {
    return this.http.post(`${this.API_URI}/cart`, CartProduct);
  }

  commentProduct(id_detalles_pedidos: Number, comentario: CartDetail) {
    return this.http.put<CartDetail>(`${this.API_URI}/cart/${id_detalles_pedidos}`, comentario);
  }

}
