import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable , BehaviorSubject } from 'rxjs';
import { map } from  'rxjs/operators';

import { HttpClient } from  '@angular/common/http';

 
const TOKEN_KEY = 'auth-token';
let AUTH_SERVER_ADDRESS  =  'http://localhost:3000';

 
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  authenticationState = new BehaviorSubject(false);
 

  constructor(private storage: Storage, private plt: Platform ,private  httpClient:  HttpClient ) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
 
  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }
 
  login(name , password): Observable<any> {

      let user = {
        'name':name , 
        'password':password
    }
      return this.httpClient.post('/login', user).pipe(
      map(async (res) => {

        if (res) {
          // return this.storage.set("ACCESS_TOKEN", res.user.access_token).then(() => {
          //  this.authenticationState.next(true);
          //   });
        }
      })
    );


  }
 
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
}