import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AcessProviders} from '../../providers/access-providers';


@Component({
  selector: 'app-register',
  templateUrl: './register-filiador.page.html',
  styleUrls: ['./register-filiador.page.scss'],
})
export class RegisterFiliadorPage implements OnInit {
   cpf_cnpj_filiador : string
   nome_filiador : string	
   email_filiador 	: string
   telefone_filiador 	: string	
   id_municipio 	: string
   sn_whatsapp 	: string
   sn_validar_cadastro : string
   data_nascimento;
   disabledButton;
   i;
   msg_padrao_aniversario;

  constructor(

    private router : Router,
    private toastCtrl : ToastController,
    private loadingCtrl : LoadingController,
    private alertCtrl : AlertController,
    private accsPrvdrs: AcessProviders
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
   this.disabledButton = false;
  }
  async tryRegisterUser(){

    if(this.nome_filiador ==null){
        this.presentToast('O campo "nome" precisa ser preenchido');
    }else if(this.cpf_cnpj_filiador ==null){
        this.presentToast('O campo "CPF" precisa ser preenchido');
    }else if(this.email_filiador  ==null){
        this.presentToast('O campo "Email" precisa ser preenchido');
    }else if(this.telefone_filiador ==null){
        this.presentToast('O campo "Telefone" precisa ser preenchido');
    }else if(this.id_municipio  ==null){
        this.presentToast('O campo "Município" precisa ser preenchido');
    }else if(this.sn_whatsapp ==null){
        this.presentToast('É nescessário informar se o número é referente ao whatsapp.');
    }else if(this.sn_validar_cadastro  ==null){
        this.presentToast('É nescessário informar se o filiador deseja validar ou não os cadastros dos filiados.');
    }else if(this.data_nascimento  ==null){
      this.presentToast('É nescessário informar a data de nascimento.');
  }else{
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message : 'Aguarde...',
      })
      loader.present();
      return new Promise(resolve => {
        let body={
        aksi: 'proses_register_filiador',
        cpf_cnpj_filiador : this.cpf_cnpj_filiador.replace('.','').replace('-','').replace('.',''),
        nome_filiador : this.nome_filiador.toUpperCase(),
        email_filiador 	: this.email_filiador,
        telefone_filiador 	: this.telefone_filiador.replace('(','').replace(')','').replace('-',''),
        id_municipio : this.id_municipio,
        sn_whatsapp : this.sn_whatsapp,
        sn_validar_cadastro : this.sn_validar_cadastro,
        msg_padrao_aniversario: this.msg_padrao_aniversario
    
         

        }
     
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
 async tryRegister(){

    if(this.nome_filiador ==""){
        this.presentToast('O campo "nome" precisa ser preenchido');
    }else if(this.cpf_cnpj_filiador ==""){
        this.presentToast('O campo "CPF" precisa ser preenchido');
    }else if(this.email_filiador  ==""){
        this.presentToast('O campo "Email" precisa ser preenchido');
    }else if(this.telefone_filiador ==""){
        this.presentToast('O campo "Telefone" precisa ser preenchido');
    }else if(this.id_municipio  ==""){
        this.presentToast('O campo "Município" precisa ser preenchido');
    }else if(this.sn_whatsapp ==""){
        this.presentToast('É nescessário informar se o número é referente ao whatsapp.');
    }else if(this.sn_validar_cadastro  ==""){
        this.presentToast('É nescessário informar se o filiador deseja validar ou não os cadastros dos filiados.');
    }else if(this.testaCPF(this.cpf_cnpj_filiador.replace('.','').replace('-','').replace('.','')) == false){ 
      this.presentToast('CPF inválido.');}
    else{
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message : 'Aguarde...',
      })
      loader.present();
      return new Promise(resolve => {
        let body={
        aksi: 'proses_register_filiador',
        cpf_cnpj_filiador : this.cpf_cnpj_filiador.replace('.','').replace('-','').replace('.',''),
        nome_filiador : this.nome_filiador.toUpperCase(),
        email_filiador 	: this.email_filiador.toLowerCase(),
        telefone_filiador 	: this.telefone_filiador.replace('(','').replace(')','').replace('-',''),
        id_municipio : this.id_municipio,
        sn_whatsapp : this.sn_whatsapp,
        sn_validar_cadastro : this.sn_validar_cadastro,
        msg_padrao_aniversario: this.msg_padrao_aniversario
    
         

        }
     
        this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
           if(res.success == true){
             loader.dismiss();
             this.disabledButton = false;
             this.presentToast('Cadastro realizado com sucesso.');
             this.router.navigate(['/home-admin']);
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
      
        
          }
       },(err)=>{
         loader.dismiss();
         this.presentToast(err);
       
       })
        
      });
    }

    


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
  async presentToast(a){
    const toast = await this.toastCtrl.create({
     message:a,
     duration:3000,
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
  
  openHome(){
        
    this.router.navigate(['/home-admin'])    
      }

}
