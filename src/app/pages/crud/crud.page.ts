import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AcessProviders} from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {
   senha: string
   is_senha : string	
   login :string 
   datastorage : any
   disabledButton;
   cpf;
   email;
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

   }
 
  async tryChange(){

    if(this.cpf ==""){
        this.presentToast('É nescessário informar o CPF');
    }else if(this.email==""){
        this.presentToast('É nescessário informar o email');
    }else{
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message : 'Aguarde...',
      })
      loader.present();
      return new Promise(resolve => {
        let body={
        aksi: 'proses_esqueci_senha',
        cpf: this.cpf,
        login: this.email
       
    
    
         

        }
     
        this.accsPrvdrs.postData(body,'proses_api_user.php').subscribe((res:any)=>{
           if(res.success == true){
             loader.dismiss();
            
             this.presentToast(res.msg);
             this.presentAlert();
             
            
        
           }else{
            loader.dismiss();

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

  backLogin(){
         
    this.router.navigate(['/login'])   
     
    
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
