import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take,map } from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {AlertController} from '@ionic/angular';
import {TokenValidation} from '../../libs/verifyToken'


@Injectable({
  providedIn: 'root'
})
export class MesaGuard implements CanActivate {
  constructor (private auth:AuthService, private alertCtrl:AlertController, private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.auth.isMesaOk.pipe(
        map(mesa => {
          if (!mesa){
    
            this.router.navigateByUrl('/mesa');
            return false;
          }
          
          return true;
        } )
      );
  }

  
  
}
