import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AcessProviders} from '../../providers/access-providers';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-register',
  templateUrl: './register-apoio.page.html',
  styleUrls: ['./register-apoio.page.scss'],
})
export class RegisterApoioPage implements OnInit {
   cpf_cnpj_apoio : string
   nome_apoio: string	
   email_apoio 	: string
   telefone_apoio 	: string
   sn_whatsapp 	: string
   datastorage: any
   id_filiador	: string
   disabledButton;
   i: any
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
   
  openHome(){

    this.router.navigate(['/home-filiador']);
  }
  async registerApoio(){

    if(this.nome_apoio ==null){
        this.presentToast('O campo "nome" precisa ser preenchido');
    }else if(this.cpf_cnpj_apoio ==null){
      this.presentToast('O campo "CPF" precisa ser preenchido');
  }else if(this.testaCPF(this.cpf_cnpj_apoio.replace('.','').replace('-','').replace('.','')) == false){ 
    this.presentToast('CPF inválido.');
}else if(this.email_apoio  ==null){
        this.presentToast('O campo "Email" precisa ser preenchido');
    }else if(this.telefone_apoio ==null){
        this.presentToast('O campo "Telefone" precisa ser preenchido');
    }else if(this.sn_whatsapp ==null){
        this.presentToast('É nescessário informar se o número é referente ao whatsapp.');
    }else{
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message : 'Aguarde...',
      })
      loader.present();
      return new Promise(resolve => {
        let body={
        aksi: 'proses_register_apoio',
        cpf_cnpj_apoio : this.cpf_cnpj_apoio.replace('.','').replace('-','').replace('.',''),
        nome_apoio : this.nome_apoio.toUpperCase(),
        email_apoio	: this.email_apoio.toLowerCase(),
        telefone_apoio 	: this.telefone_apoio.replace('(','').replace(')','').replace('-',''),
        id_filiador: this.id_filiador,
        sn_whatsapp : this.sn_whatsapp
       
    
         

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

  async presentToast(a){
    const toast = await this.toastCtrl.create({
     message:a,
     duration:1500,
     position:'top'

    });
    toast.present();
  }

  testaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;
     
  for (this.i=1; this.i<=9; this.i++) Soma = Soma + parseInt(strCPF.substring(this.i-1, this.i)) * (11 - this.i);
  Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
   
  Soma = 0;
    for (this.i = 1; this.i <= 10; this.i++) Soma = Soma + parseInt(strCPF.substring(this.i-1, this.i)) * (12 - this.i);
    Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
  
}

 

}
