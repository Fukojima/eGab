import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import {timer} from 'rxjs/observable/timer';
import { Storage } from '@ionic/storage';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  showSplash = true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,

    private storage: Storage,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.splashScreen.hide();
      timer(2000).subscribe(() => this.showSplash = false);
    });
     this.storage.get('storage_xxx').then((res)=>{
     if(res==null){
     this.navCtrl.navigateRoot('/login');
     }else if(res.id_grupo_usuario == 1){
      this.navCtrl.navigateRoot(['/home-admin']);}
      else if(res.id_grupo_usuario == 2){
        this.navCtrl.navigateRoot(['/home-filiador']);}
        else if(res.id_grupo_usuario == 3){
          this.navCtrl.navigateRoot(['/home']);
        }else if(res.id_grupo_usuario == 4){
          this.navCtrl.navigateRoot(['/home-apoio']);
        }
     else{
     this.navCtrl.navigateRoot('/login');
     }
    });
  }
}