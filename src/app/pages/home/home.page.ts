import { Storage } from '@ionic/storage';
import { ToastController, LoadingController, AlertController, NavController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AcessProviders} from '../../providers/access-providers';
import { ModalFiliadosPage } from './../modal-filiados/modal-filiados.page';
import { PerfilLiderancaPage } from './../perfil-lideranca/perfil-lideranca.page';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  datastorage:any;
  name: string;
  senhaPadrao: string
  id_lideranca: string
  nome: string
  perfil: string

  constructor(
    private router : Router,
    private toastCtrl : ToastController,
    private loadingCtrl : LoadingController,
    private alertCtrl : AlertController,
    private accsPrvdrs: AcessProviders,
    private storage: Storage,
    private navCtrl: NavController,
    private modalController: ModalController,
    private alertController: AlertController


  ) { }

  ngOnInit() {

    this.ionViewDidEnter();
    this.storage.get('storage_xxx').then((res)=>{
                this.id_lideranca = res.id_filiador_lid,
                this.nome = res.nome

     });
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

  
  openMudarSenha(){
         
    this.router.navigate(['/mudar-senha'])   
         
        
  }

  async openModal() {
   
    const modal = await this.modalController.create({
      component: ModalFiliadosPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'id_lideranca_pass': this.id_lideranca,
        'nome_lideranca':this.nome
      }
    });
    console.log('a:',this.nome);
    return await modal.present();
  
  }



  ionViewDidEnter(){
   this.storage.get('storage_xxx').then((res)=>{
     
      this.datastorage = res;
      this.name = this.datastorage.nome;

      this.senhaPadrao = this.datastorage.sn_ainda_senha_padrao;
      this.perfil = this.datastorage.perfil_lid;
      if (this.senhaPadrao == "S"){

       this.presentAlert();
      }

   });
  }


  openRegister(){
        
    this.router.navigate(['/register'])    
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

  async presentModal(a,b) {
    const modal = await this.modalController.create({
      component: ModalFiliadosPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'id_lideranca_pass': a,
        'nome_lideranca':b
      }
    });
    console.log('a:',a);
    return await modal.present();
   
  }


  async openProfile(){
    const loader = await this.loadingCtrl.create({
      message: 'Por favor aguarde...',
      duration:1500
    });
    loader.present();
    const modal = await this.modalController.create({
      component: PerfilLiderancaPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'id_lideranca': this.id_lideranca
      }
    });

    return await modal.present();
 
    this.dismiss();

   }

   
   sendMessage(){

    this.router.navigate(['/mensagem'])
   }

   dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
