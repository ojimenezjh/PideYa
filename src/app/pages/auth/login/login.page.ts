import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { AlertController } from '@ionic/angular';

import { User } from '../../../../models/auth/User';
import { Router } from '@angular/router';
import { Corp } from 'src/models/auth/Corp';
import { Subject } from 'rxjs';

 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})

export class LoginPage implements OnInit {

  corps: Corp[] = [];

  corp: Corp = {
    id: 1,
    name: '',
    logo: ''
  };


  users: User[] = [];
  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    database: '',
    profile: ''
  }


  constructor(private AuthService: AuthService, private router: Router, private alertCtrl: AlertController, private authService: AuthService) { }
 
  ngOnInit() {}

    // Read NFC Tag - Android
  // Once the reader mode is enabled, any tags that are scanned are sent to the subscriber


  login() {
    //delete this.card.id; si quisieramos eliminar el id y configurarlo para que autoincrementará en postgres
    this.AuthService.login(this.user).subscribe(
      async res => {    
        this.router.navigateByUrl('/mesa');
        this.user.password = '';
      },
      async err => {
        console.error(err)
        const alert = await this.alertCtrl.create({
          header: 'Vuelvalo a intentar',
          message: 'Contraseña Incorrecta',
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }

getImg(){
  this.authService.imgNav(1).subscribe(
    res => { 
      this.corps = res; 
      this.data();
    },
    err => console.error(err)
  );
}

observer = new Subject();
public subscriber$ = this.observer.asObservable();

  data(){
  for (this.corp of this.corps){
      this.emitData(this.corp);
    }
}

emitData(corp: Corp){
  this.observer.next(corp);
}


}


