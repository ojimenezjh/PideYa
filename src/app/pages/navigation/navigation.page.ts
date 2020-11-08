import { Component, OnInit, SimpleChanges, Input } from "@angular/core";
import { Observable } from "rxjs";
import { PopoverController } from "@ionic/angular";
import { FilterPopoverPage } from "../navigation/filter-popover/filter-popover.page";
import { ModalController } from "@ionic/angular";
import { CardsListPage } from "../cards-list/cards-list.page";
import { CartModalPage } from "../cart-modal/cart-modal.page";
import { Corp } from "src/models/auth/Corp";
import { AuthService } from "src/services/auth.service";

@Component({
  selector: "app-navigation",
  templateUrl: "./navigation.page.html",
  styleUrls: ["./navigation.page.scss"],
})
export class NavigationPage implements OnInit {
  corps: Corp[] = [];

  corp: Corp = {
    id: 1,
    name: "",
    logo: "",
  };

  countCartProducts: Number;

  isLoggedIn$: Observable<boolean>; // {1}

  isProfileAdm$: Observable<boolean>;

  isMesaOk$: Observable<boolean>;

  toggleFabList: boolean = false;

  constructor(
    private authService: AuthService,
    private modalController: ModalController,
    private cardsList: CardsListPage,
    private cartModal: CartModalPage,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {
    //this.getImg();
    //this.isLoggedIn$ = this.authService.isLoggedIn;
    //this.isProfileAdm$ = this.authService.profileAdm;
    this.cartModal.subscriber$.subscribe((countCartProducts: Number) => {
      this.countCartProducts = countCartProducts;
    });
    // {2}
  }

  /*   getImg(){
    this.authService.imgNav(1).subscribe(
      res => { 
        this.corps = res; 
      },
      err => console.error(err)
    );
  } */
  /* user_Type(){

    
  } */

  async viewModalCart() {
    const modal = await this.modalController.create({
      component: CartModalPage,
      cssClass: "cart-modal",
    });
    modal.onWillDismiss().then((data) => {
      this.cardsList.getDependingOnCart();
    });

    return await modal.present();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: FilterPopoverPage,
      cssClass: "my-custom-class",
      event: ev,
      translucent: true,
    });
    return await popover.present();
  }

  activateFabList() {
    if (this.toggleFabList == false) {
      return (this.toggleFabList = true);
    } else if (this.toggleFabList == true) return (this.toggleFabList = false);
  }

  onLogout() {
    this.authService.logout(); // {3}
  }
}
