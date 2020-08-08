import { Storage } from '@ionic/storage';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AcessProviders} from '../../providers/access-providers'


@Component({
  selector: 'app-home-apoio',
  templateUrl: './home-apoio.page.html',
  styleUrls: ['./home-apoio.page.scss'],
})
export class HomeApoioPage implements OnInit {
  datastorage:any;
  name: string;
  senhaPadrao: string;
  perfil;

  constructor(    private router : Router,
    private toastCtrl : ToastController,
    private loadingCtrl : LoadingController,
    private alertCtrl : AlertController,
    private accsPrvdrs: AcessProviders,
    private storage: Storage,
    private navCtrl: NavController,
    private alertController: AlertController) { }

  ngOnInit() {
    this.ionViewDidEnter();
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
       this.perfil = this.datastorage.perfil_apoio;
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

  openRegisterApoio(){
         
     this.router.navigate(['/register-apoio'])   
             
            
  }  
  
  cadastrar(){
         
    this.router.navigate(['/register-filiador-apoio'])   
            
           
 }  

  openPerfil(){
    this.router.navigate(['/perfil-apoio'])  

  }

  openMudarSenha(){
         
    this.router.navigate(['/mudar-senha'])   
         
        
  }
  
  openCadastroPendente(){
         
    this.router.navigate(['/cadastro-pendente'])   
         
        
  }
   sendMessage(){

    this.router.navigate(['/mensagem'])
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
