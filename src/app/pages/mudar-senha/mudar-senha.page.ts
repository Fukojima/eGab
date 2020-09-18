import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AcessProviders} from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './mudar-senha.page.html',
  styleUrls: ['./mudar-senha.page.scss'],
})
export class MudarSenhaPage implements OnInit {
   senha: string
   is_senha : string	
   login :string 
   datastorage : any
   disabledButton;
  modalController: any;

  constructor(

    private router : Router,
    private toastCtrl : ToastController,
    private loadingCtrl : LoadingController,
    private storage: Storage,
    private alertCtrl : AlertController,
    private accsPrvdrs: AcessProviders,
    private navCtrl: NavController

  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
       console.log('liderança',res);
       this.datastorage = res;
       this.login = this.datastorage.login;
       
    });
   }
 
  async tryChange(){

    if(this.senha ==""){
        this.presentToast('O campo "senha" precisa ser preenchido');
    }else if(this.is_senha==""){
        this.presentToast('É nescessário confirmar a senha');
    }else{
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message : 'Aguarde...',
      })
      loader.present();
      return new Promise(resolve => {
        let body={
        aksi: 'proses_muda_senha',
        senha: this.senha,
        login: this.login
       
    
    
         

        }
     
        this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
           if(res.success == true){
             loader.dismiss();
             this.disabledButton = false;
             this.presentToast(res.msg);
             this.presentAlert();
             
            
        
           }else{
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);
         
           }
        },(err)=>{
          loader.dismiss();
          this.presentToast(err);
        
        })
     

      });
    }


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

  async presentToast(a){
    const toast = await this.toastCtrl.create({
     message:a,
     duration:1500,
     position:'top'

    });
    toast.present();
  }

  openHome(){
         
    this.router.navigate(['/home-filiador'])   
     
    
      }  

      async presentAlert() {
        const alert = await this.alertCtrl.create({
          cssClass: 'my-custom-class',
          header: 'Encerrar seção',
          
          message: 'É nescessário realizar o login novamente.',
          buttons: [{
            text: 'Ok.',
            handler: () => {
            this.logout();
            }
          }]
          
        });
    
        await alert.present();
        
      }

 


}
