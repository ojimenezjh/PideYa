import { Injectable, Input } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import { Storage } from  '@ionic/storage';
import { User } from  '../models/auth/User';
import { Mesa } from  '../models/auth/Mesa';
import { Corp } from  '../models/auth/Corp'
import { AuthResponse } from  '../models/auth/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    database: '',
    profile: ''
  };
 
  mesa: Mesa = {
    id_mesa: 0,
    clave: ''
  };

  id_mesa = this.mesa.id_mesa;

  API_URI = 'http://82.223.128.240:3000/api';

  authSubject  =  new  BehaviorSubject<boolean>(false);

  authProfile  =  new  BehaviorSubject<boolean>(false);

  authMesa  =  new  BehaviorSubject<boolean>(false);

  constructor(private  http:  HttpClient, private  storage:  Storage) { }

  /*saveUser(user : User) {
    return this.http.post(`${this.API_URI}/register`, user);
  }*/

  saveUser(user: User): Observable<AuthResponse> {
    
    return this.http.post<AuthResponse>(`${this.API_URI}/register`, user).pipe(
      tap(async (res:  AuthResponse ) => {
        this.authSubject.next(true);
        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
        }
      })

    );
  }

   login(user: User): Observable<AuthResponse> {

    return this.http.post(`${this.API_URI}/login`, user).pipe(
      tap(async (res: AuthResponse) => {   
          
        if(res){
        var profile = JSON.stringify(res)
        console.log(profile);
        if (profile == `"ADMIN"`){
        this.admin();
            }
        if(res.user)  {  
        await this.storage.set("ACCESS_TOKEN", res.user.access_token);
        await this.storage.set("EXPIRES_IN", res.user.expires_in);  
        }
        this.authSubject.next(true); 
        }
        
       /* */
      })
    );
  }

  admin(){
    return this.authProfile.next(true);
  }

  imgNav(id: Number){
      return this.http.get<Corp[]>(`${this.API_URI}/navigation/${id}`);
  }

  mesas(mesa: Mesa): Observable<Mesa> {

    return this.http.post(`${this.API_URI}/mesa`, mesa).pipe(
      tap(async (res: Mesa) => {   
          
        if(res){
          console.log(res);
         this.authMesa.next(true); 
        }
        
       /* */
      })
    );
  }

  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("EXPIRES_IN");
    this.authSubject.next(false);
  }

  get isLoggedIn() {
    return this.authSubject.asObservable();
  }

  get isMesaOk() {
    return this.authMesa.asObservable();
  }

  get profileAdm(){
    return this.authProfile.asObservable();
  }

}
