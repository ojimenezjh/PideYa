import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { Corp } from 'src/models/auth/Corp';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.page.html',
  styleUrls: ['./navigation.page.scss'],
})

export class NavigationPage implements OnInit {

  corps: Corp[] = [];

  corp: Corp = {
    id: 1,
    name: '',
    logo: ''
  };

  isLoggedIn$: Observable<boolean>; // {1}

  isProfileAdm$: Observable<boolean>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.getImg();
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isProfileAdm$ = this.authService.profileAdm;
    // {2}
  }
  
  onLogout(){
    this.authService.logout();                      // {3}
  }

  getImg(){
    this.authService.imgNav(1).subscribe(
      res => { 
        this.corps = res; 
      },
      err => console.error(err)
    );
  }

  user_Type(){

    
  }
   
  }
   

