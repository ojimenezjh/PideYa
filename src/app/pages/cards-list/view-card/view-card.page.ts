import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../../models/Product';

import { ProductService } from '../../../../services/product.service';

import { ActivatedRoute, Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { CartService } from 'src/services/cart.service';
import { CartProduct } from 'src/models/Cart/CartProduct';

@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.page.html',
  styleUrls: ['./view-card.page.scss'],
})
export class ViewCardPage implements OnInit {

  @Input() id_producto: Number | String;

  product: Product = {
    id_producto: 0,
    imagen:'',
    producto:'',
    familia:'',
    tipoveg: 0,
    gluten: false,
    precio: 0,
    descripcion:'',
    posicion: 0
  };

  cartProducts: CartProduct[] = [];

  cartProduct: CartProduct = {
    id_detalles_pedidos: 0,
    id_pedido: 1, //HABRÁ QUE HACER UNA CONSULTA PARA VER EL PEDIDO QUE ES
    id_producto: 0,
    comentario: ''
  };
  

  edit: boolean = false;

  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute, private modalController: ModalController, private cartService: CartService) { }

  ngOnInit() {

    this.productService.getProduct(Number(this.id_producto)).subscribe(
      res => {
        console.log(res);
        this.product = res[0];
        this.cartProduct.id_producto = this.product.id_producto;
      },
      err => console.error(err)
    )

   /* let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.cardsService.getCard(id).subscribe(result => 
      this.content = result);*/
    
  }

  addProductToCart() {
    
    this.cartService.addProduct(this.cartProduct).subscribe(
      res => {
        console.log(this.cartProduct)
        console.log(res)
        this.closeModal();
      },
      err => console.log(err) 
    )
  }


  async closeModal(){
    await this.modalController.dismiss();
  }

}
