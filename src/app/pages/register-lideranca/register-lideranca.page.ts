import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AcessProviders} from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register-lideranca.page.html',
  styleUrls: ['./register-lideranca.page.scss'],
})
export class RegisterLiderancaPage implements OnInit {
   cpf_cnpj_lideranca : string
   nome_lideranca : string	
   email_lideranca 	: string
   telefone_lideranca 	: string	
   id_filiador	: string
   sn_whatsapp 	: string
   datastorage : any
   disabledButton;

  constructor(

    private router : Router,
    private toastCtrl : ToastController,
    private loadingCtrl : LoadingController,
    private storage: Storage,
    private alertCtrl : AlertController,
    private accsPrvdrs: AcessProviders
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
       console.log('liderança',res);
       this.datastorage = res;
       this.id_filiador = this.datastorage.id_filiador;
       
    });
   }
 
  async tryRegister(){

    if(this.nome_lideranca ==""){
        this.presentToast('O campo "nome" precisa ser preenchido');
    }else if(this.cpf_cnpj_lideranca ==""){
        this.presentToast('O campo "CPF" precisa ser preenchido');
    }else if(this.email_lideranca  ==""){
        this.presentToast('O campo "Email" precisa ser preenchido');
    }else if(this.telefone_lideranca ==""){
        this.presentToast('O campo "Telefone" precisa ser preenchido');
    }else if(this.sn_whatsapp ==""){
        this.presentToast('É nescessário informar se o número é referente ao whatsapp.');
    }else if(this.cpf_cnpj_lideranca.length < 11){
      this.presentToast('CPF em formato incorreto.');
  }else{
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message : 'Aguarde...',
      })
      loader.present();
      return new Promise(resolve => {
        let body={
        aksi: 'proses_register_lideranca',
        cpf_cnpj_lideranca : this.cpf_cnpj_lideranca,
        nome_lideranca : this.nome_lideranca,
        email_lideranca 	: this.email_lideranca,
        telefone_lideranca 	: this.telefone_lideranca,
        sn_whatsapp : this.sn_whatsapp,
        id_filiador: this.id_filiador
    
         

        }
     
        this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
           if(res.success == true){
             loader.dismiss();
             this.disabledButton = false;
             this.presentToast(res.msg);
             this.openHome();

        
           }else{
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);
         
           }
        },(err)=>{
          loader.dismiss();
          this.presentToast(err);
        
        })
        this.accsPrvdrs.postData(body,'proses_api_user.php').subscribe((res:any)=>{
          if(res.success == true){
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);
          
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
  openHome(){
         
    this.router.navigate(['/home-filiador'])   
         
        
  }

  async presentToast(a){
    const toast = await this.toastCtrl.create({
     message:a,
     duration:1500,
     position:'top'

    });
    toast.present();
  }
  async presentAlert(a) {
    const alert = await this.alertCtrl.create({
  
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Close',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Try Again',
          handler: () => {
            this.tryRegister();
          }
        }
      ]
    });

    await alert.present();
  }

 

}
