import { Storage } from '@ionic/storage';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AcessProviders} from '../../providers/access-providers'


@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {
  datastorage:any;
  name: string;
  constructor(    private router : Router,
    private toastCtrl : ToastController,
    private loadingCtrl : LoadingController,
    private alertCtrl : AlertController,
    private accsPrvdrs: AcessProviders,
    private storage: Storage,
    private navCtrl: NavController,
    private alertController: AlertController) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
 
       this.datastorage = res;
       this.name = this.datastorage.nome;
       
    });
   }
 
   openConsulta(){
    this.router.navigate(['/consulta-filiador'])   

   }
 
   openRegister(){
         
     this.router.navigate(['/register-filiador'])   
      
     
       }
   async logout(){
      this.storage.clear();
      this.navCtrl.navigateRoot(['/login']);
      const toast = await this.toastCtrl.create({
        message:'Seção encerrada.',
        duration:1500
      })
      toast.present();
    }
 
    async popLogout() {
     const alert = await this.alertController.create({
       cssClass: 'my-custom-class',
       header: 'Sair',
       message: 'Deseja encerrar a seção?',
       buttons: [
         {
           text: 'Não',
           role: 'cancel',
           cssClass: 'secondary',
           handler: (blah) => {
             console.log('Confirm Cancel: blah');
           }
         }, {
           text: 'Sim',
           handler: () => {
             this.logout();;
           }
         }
       ]
     });
 
     await alert.present();
   }

}
