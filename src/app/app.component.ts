import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from '../services/auth.service';
import { CardsService } from '../services/cards.service'
import { Card } from 'src/models/Card';
import { ModalController } from '@ionic/angular';
import { CardsListPage } from '../app/pages/cards-list/cards-list.page';

import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  cards: Card[] = [];

  card: Card = {
    id_carta: 0,
    nombre: '',
    descripcion: '',
    horario: '',
    imagen: '',
    posicion: 0
  };
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private cardsService: CardsService,
    private modalController: ModalController,
    private router: Router
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  isLoggedIn$: Observable<boolean>;  
  isMesaOk$: Observable<boolean>;                // {1}

  ngOnInit() {
    
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isMesaOk$ = this.authService.isMesaOk; 
                                                    // {2}
  }

  onLogout(){
    this.authService.logout();                      // {3}
  }

  //Emite la variable id_carta, que será capturada después con un this.appComponent.subscriber$.subscribe(id_card => {}) en cards-list.page.ts
    
  observer = new Subject();
  public subscriber$ = this.observer.asObservable();

  emitData(id_carta: Number){
    this.observer.next(id_carta);
  }

  getCards(){
    this.cardsService.getCards().subscribe(
      res => {
        this.cards = res;
      },
      err => console.error(err)
    );
    return Boolean;
  }


  toggle(){
    if (this.cards.length > 0)
    return this.cards = [];
    else if (this.cards.length <= 0)
    return this.getCards();
  }

 /*  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Cards",
        url   : "/cards",
        icon  : "home"
      },
      {
        title : "Login",
        url   : "/login",
        icon  : "planet"
      },
      {
        title : "Contacts",
        url   : "/tab3",
        icon  : "contacts"
      },
    ]
  } */
}


