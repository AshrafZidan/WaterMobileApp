import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from  "@angular/router";
import { AuthenticationService } from './../Auth/AuthService.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private  router:  Router,
    private alertCtrl:AlertController,
    private authService:AuthenticationService,

  ) { 

  }

  ngOnInit() {
  }

   login(form){

    let userName = form.value.userName;
    let password = form.value.password;

    if (userName == 'admin' && password == 'admin') {
              this.authService.authenticationState.next(true);

             this.router.navigateByUrl('home');

          
        } else {
           this.presentAlert(); 
        }
        // this.authService.login(userName , password).subscribe((res)=>{ 
        //      this.router.navigateByUrl('home');

        // }, err => {
        //   this.presentAlert(); 


        // });
  


  
}


  async presentAlert() {
  let alert = await this.alertCtrl.create({
        //  title: 'Login Error',
         message:  'Pls Check UserName and Password',
         buttons: ['OK']
       });
       await alert.present();
     
  }

}
