import { Component, OnInit, Input } from '@angular/core';

import { User } from '../../../../models/auth/User';

import { AuthService } from '../../../../services/auth.service';

import { ActivatedRoute, Router } from '@angular/router';

import { ModalController } from '@ionic/angular';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    database: '',
    profile: ''
  };

  constructor(private AuthService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private modalController: ModalController, private alertCtrl: AlertController) { }

  ngOnInit() {

     /* this.AuthService.getUser(String(this.idUser)).subscribe(
      res => {
        console.log(res);
        this.user = res[0];
        this.edit = true;
      },
      err => console.error(err)
    )  */
    
  }

  saveNewUser() {
    //delete this.card.id; si quisieramos eliminar el id y configurarlo para que autoincrementará en postgres
    
    this.AuthService.saveUser(this.user).subscribe(
      async res => {
        console.log(res.user);
        const alert = await this.alertCtrl.create({
          header: 'Bienvenido',
          message: 'Usuario registrado correctamente',
          buttons: ['OK']
        });
        await alert.present();
        this.router.navigateByUrl('/login');
      },
        async err => {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Usuario existente',
          buttons: ['OK']
        });
        await alert.present();
      }
    );

  }

}
