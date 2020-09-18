import { Storage } from '@ionic/storage';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AcessProviders} from '../../providers/access-providers'


@Component({
  selector: 'app-home-filiador',
  templateUrl: './home-filiador.page.html',
  styleUrls: ['./home-filiador.page.scss'],
})
export class HomeFiliadorPage implements OnInit {
  datastorage:any;
  name: string;
  senhaPadrao: string;
  perfil;
  verificado;
  id_origem: any;
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
  async popupValidacao() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Termos de responsabilidade',
      
      message: "Bem vindo ao eGab, você está a um passo de ter seu gabinete na palma da mão! Ao clicar em 'Aceito os termos' você declara que leu e está ciente dos termos de uso e responsabilidade citados no email de boas vindas.",
      buttons: [{
        text: 'Aceito os Termos',
        handler: () => {
        this.presentAlert();
        }},{
          text: 'Não Aceito os Termos',
          handler: () => {
          this.logout();
          }
      }]
      

      
    });

    await alert.present();
    
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Acesso com senha padrão',
      
      message: 'Esse é seu primeiro acesso, vamos definir uma senha?',
      buttons: [{
        text: 'Redefinir senha.',
        handler: () => {
        this.openMudarSenha();
        }
      }]
      
    });

    await alert.present();
    
  }
  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
  
       this.datastorage = res;
       this.name = this.datastorage.nome;
       this.senhaPadrao = this.datastorage.sn_ainda_senha_padrao;
       this.perfil = this.datastorage.perfil_filiador;
       
       

       if (this.senhaPadrao == "S"){

        this.presentAlert();
       }



       
    });
   }

 
 
   openRegister(){
         
     this.router.navigate(['/register-lideranca'])   
      
     
  }  


  
  openConsulta(){
         
     this.router.navigate(['/consulta-cadastro'])   
         
        
  }    

  openConsultaApoio(){
         
    this.router.navigate(['/consulta-apoio'])   
        
       
 }    


  openRegisterApoio(){
         
     this.router.navigate(['/register-apoio'])   
             
            
  }  

  
  openProfile(){
         
    this.router.navigate(['/perfil-filiador'])   
            
           
 }  

  openMudarSenha(){
         
    this.router.navigate(['/mudar-senha'])   
         
        
  }
  sendMessage(){

    this.router.navigate(['/mensagem'])
    

   }


   
  openCadastroPendente(){
         
    this.router.navigate(['/cadastro-pendente'])   
         
        
  }

  openConsultaFiliado(){
         
    this.router.navigate(['/consulta-cadastro-lideranca'])   
         
        
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
