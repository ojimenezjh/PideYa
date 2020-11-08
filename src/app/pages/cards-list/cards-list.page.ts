import { Component, OnInit } from "@angular/core";

import { ProductService } from "../../../services/product.service";
import { CartService } from "../../../services/cart.service";

import { ModalController } from "@ionic/angular";
import { ViewCardPage } from "./view-card/view-card.page";

import { Product } from "src/models/Product";
import { AppComponent } from "src/app/app.component";
import { CartProduct } from "src/models/Cart/CartProduct";
import { CartModalPage } from "../cart-modal/cart-modal.page";
import { AuthService } from "src/services/auth.service";

@Component({
  selector: "app-cards-list",
  templateUrl: "./cards-list.page.html",
  styleUrls: ["./cards-list.page.scss"],
})
export class CardsListPage implements OnInit {
  nombreCorp;

  logoCorp;

  id_carta;

  tipoVista: string = "General";

  countCartProducts: Number;

  searchBarOn: Boolean = true;

  products: Product[] = [];

  product: Product = {
    id_producto: 0,
    imagen: "",
    producto: "",
    familia: "",
    tipoveg: 0,
    gluten: false,
    precio: 0,
    descripcion: "",
    posicion: 0,
  };

  cartProducts: CartProduct[] = [];

  cartProduct: CartProduct = {
    id_detalles_pedidos: 0,
    id_pedido: 0,
    id_producto: 0,
    comentario: "",
  };

  constructor(
    private productService: ProductService,
    private modalController: ModalController,
    private appComponent: AppComponent,
    public cartModal: CartModalPage,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getProducts();
    //this.login.getImg();
    this.appComponent.subscriber$.subscribe((id_carta: Number) => {
      this.id_carta = id_carta;
      this.getDependingOnCart();
    });
    /*       this.cartModal.subscriber$.subscribe((countCartProducts:Number) => {
        this.countCartProducts = countCartProducts;       
      })    */
    /*      this.login.subscriber$.subscribe((corp: Corp) => {
        this.logoCorp = corp.logo;  
        this.nombreCorp = corp.name;   
      })   */
  }

  segmentChanged(ev: any) {
    this.tipoVista = ev.detail.value;
    console.log("Segment changed", ev.detail.value);
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (res) => {
        this.cartModal.getCart();
        this.products = res;
        return (this.searchBarOn = true);
      },
      (err) => console.error(err)
    );
  }

  getProduct(id_carta: Number) {
    //ESTE NO ES EL QUE SELECCIONA EL ID PARA EL MODAL, ESO ESTÁ DENTRO DEL MODAL. ESTE PODRÍA SERVIR PARA SELECCIONAR LOS PRODUCTOS A TRAVÉS DE LA CARTA SELECCIONADA.
    this.productService.getProductsByCard(id_carta).subscribe(
      (res) => {
        this.cartModal.getCart();
        console.log("carta", id_carta);
        this.products = res;
        console.log(this.products);
        return (this.searchBarOn = false);
      },

      (err) => {
        this.getProducts();
        console.error(err);
      }
    );
  }

  searchChanged(producto: String) {
    this.productService.searchProduct(producto).subscribe(
      (res) => {
        console.log("producto", producto);
        this.products = res;
        console.log(this.products);
      },

      (err) => {
        this.getProducts();
        console.error(err);
      }
    );
  }

  async viewModal(id_producto: number | String) {
    const modal = await this.modalController.create({
      component: ViewCardPage,
      componentProps: {
        id_producto: id_producto,
      },
    });
    console.log(id_producto);
    modal.onWillDismiss().then((data) => {
      this.getDependingOnCart();
    });

    return await modal.present();
  }

  getDependingOnCart() {
    if (this.id_carta != 0) {
      this.getProduct(this.id_carta);
    } else if (this.id_carta == 0) {
      this.getProducts();
    }
  }
}
