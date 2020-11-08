import { CartService } from "./../../../services/cart.service";
import { Component, OnInit } from "@angular/core";
import { ModalController, AlertController } from "@ionic/angular";
import { CartDetail } from "src/models/Cart/CartDetail";
import { CartProduct } from "src/models/Cart/CartProduct";
import { Subject } from "rxjs";

@Component({
  selector: "app-cart-modal",
  templateUrl: "./cart-modal.page.html",
  styleUrls: ["./cart-modal.page.scss"],
})
export class CartModalPage implements OnInit {
  cartDetails: CartDetail[] = [];

  cartDetail: CartDetail = {
    id_detalles_pedidos: 0,
    id_producto: 0,
    producto: "",
    comentario: "",
    precio: 0,
  };

  countCartProducts: Number;

  constructor(
    private cartService: CartService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.getCart();
  }

  /*   decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }
 
  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }
  */
  // Variable para contador de cards-list page
  observer = new Subject();
  public subscriber$ = this.observer.asObservable();

  emitData(countCartProducts: Number) {
    this.observer.next(countCartProducts);
  }

  countProducts() {
    this.emitData(this.cartDetails.length);
  }

  commentProduct(id_producto: Number) {
    this.cartService.commentProduct(id_producto, this.cartDetail).subscribe(
      (res) => {
        this.getCart();
      },
      (err) => console.log(err)
    );
  }
  removeProduct(id_detalles_pedidos: Number) {
    this.cartService.removeProduct(id_detalles_pedidos).subscribe(
      (res) => {
        console.log(id_detalles_pedidos);
        this.getCart();
      },
      (err) => console.log(err)
    );
  }

  getCart() {
    this.cartService.getCart().subscribe(
      (res) => {
        this.cartDetails = res;
        console.log(res);
        this.countProducts();
        //console.log(this.cartDetail.id_producto);
      },
      (err) => console.error(err)
    );
  }

  getTotal() {
    const total = this.cartDetails.reduce(
      (suma, item) => suma + item.precio,
      0
    );
    return total;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async comment(id_detalles_pedidos: Number) {
    for (this.cartDetail of this.cartDetails) {
      if (this.cartDetail.id_detalles_pedidos == id_detalles_pedidos) {
        console.log(id_detalles_pedidos);

        let alert = await this.alertCtrl.create({
          header: "Escribe tu comentario sobre el producto",
          inputs: [
            {
              name: "Comentario",
              type: "textarea",
              value: this.cartDetail.comentario,
            },
          ],
          cssClass: "redtext",
          buttons: [
            {
              text: "Aceptar",
              cssClass: "accept-button",
              handler: (data) => {
                this.cartDetail.comentario = data.Comentario;
                this.commentProduct(id_detalles_pedidos);
              },
            },
            { text: "Cancelar", role: "cancel", cssClass: "cancel-button" },
          ],
        });
        alert.present().then(() => {
          //this.modalCtrl.dismiss();
        });
      }
    }
  }

  async checkout() {
    // Perfom PayPal or Stripe checkout process

    let alert = await this.alertCtrl.create({
      header: "¡Gracias por tu pedido!",
      message: "Te serviremos la comida lo más pronto posible",
      buttons: ["Aceptar"],
    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
  }
}
