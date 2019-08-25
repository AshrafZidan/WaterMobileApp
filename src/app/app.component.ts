import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { AuthenticationService } from './Auth/AuthService.service';
import { LanguageService } from './services/lang.service';


import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  dir:String;
  lang:String;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private network: Network,
    private authService: AuthenticationService,
    private languageService: LanguageService,
    private router: Router
  ) {
    this.initializeApp();
     this.lang = this.languageService.setInitialAppLanguage();

    if (this.lang == 'ar') {
      this.dir = 'rtl';
    } else {
      this.dir = 'ltr';
    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.checkNetwork();
    });

       this.authService.authenticationState.subscribe(state => {
       if (state) {
         this.router.navigate(['home']);
       } else {
         this.router.navigate(['login']);
       }
     });

  }

  checkNetwork() {
    this.network.onDisconnect().subscribe(() => {

     var iDiv = document.createElement('div');
     var iPar = document.createElement('p');
     iDiv.id = 'netOffInfo';
     iDiv.className = 'netOffInfo';
     iPar.className = 'netparagrap';
     document.getElementsByTagName('body')[0].appendChild(iDiv);
     document.getElementsByClassName('netOffInfo')[0].appendChild(iPar);
     iPar.innerHTML = "يتعذر الإتصال بالإنترنت";

     console.log('network was disconnected :-(');
   });

   /////////////////////////////////////////// watch network for a connection /////////////////////////////////////
   this.network.onConnect().subscribe(() => {
     var element = document.getElementById("netOffInfo");
     if (element) {
       element.parentNode.removeChild(element);
     }
     console.log('network connected!');
   });



 }

}
