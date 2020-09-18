import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController, LoadingController, AlertController, NavController, ModalController, IonRefresher } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalApoioPage } from './../modal-apoio/modal-apoio.page';
import { AcessProviders} from '../../providers/access-providers';

@Component({
  selector: 'app-cadastro-pendente',
  templateUrl: './cadastro-pendente.page.html',
  styleUrls: ['./cadastro-pendente.page.scss'],
})
export class CadastroPendentePage implements OnInit {

  datastorage:any;
  users: any=[];
  limit: number=13;
  start: number = 0;
  id_lideranca_pass;
  nome_lideranca;
  id_lideranca :number;
  id_filiado: number;
  id_filiador;
  wpp;


  constructor(private router : Router,
    private toastCtrl : ToastController,
    private loadingCtrl : LoadingController,
    private alertCtrl : AlertController,
    private accsPrvdrs: AcessProviders,
    private storage: Storage,
    private navCtrl: NavController,
    private alertController: AlertController,
    private modalController: ModalController) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
       console.log(res);
       this.datastorage = res;
       this.start =0;
       this.users = [];
       this.id_lideranca = this.id_lideranca_pass;
       if (this.datastorage.id_filiador == null){
         this.id_filiador = this.datastorage.id_filiador_apoio;
       }else{
       this.id_filiador = this.datastorage.id_filiador;}
      
       this.loadUsers();
  
  
       
       
       
    });


   }

   async doRefresh(event){
     const loader = await this.loadingCtrl.create({
       message: 'Por favor aguarde...'
     });
     loader.present();

     this.ionViewDidEnter();
     event.target.complete();

     loader.dismiss();
   }

   loadData(event){
     this.start += this.limit;
     setTimeout(() => { 
       this.loadUsers().then(() => { 
         event.target.complete();
        });
    
    },500)
   }

   async loadUsers(){
   

      return new Promise(resolve => {
        let body={
        aksi: 'proses_consulta_pendentes',
        id_lideranca: this.id_lideranca,
        
        id_filiador: this.id_filiador,
        start: this.start,
        limit: this.limit
        
 

        }
        this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{

   
           for(let datas of res.result){
             this.users.push(datas);

           }
           resolve(true);
         
           if (res.result == ''){
             this.emptyFiliados();
            
           }
        },(err)=>{

        
        })

      });
    }




    dismiss() {
      // using the injected ModalController this page
      // can "dismiss" itself and optionally pass back data
      this.modalController.dismiss({
        'dismissed': true
      });
    }

     
  openHome(){
    if (this.datastorage.id_filiador == null){
      this.router.navigate(['/home-apoio']) ;
    }else{
      this.router.navigate(['/home-filiador']) ;
       
      }
    }

   async openProfile(a){
    const loader = await this.loadingCtrl.create({
      message: 'Por favor aguarde...',
      duration:1500
    });
    loader.present();
    const modal = await this.modalController.create({
      component: ModalApoioPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'id_filiado': a
      }
    });
    console.log('a:',a);
    return await modal.present();
 
    this.dismiss();

   }

   async emptyFiliados() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cadastro vazio',
      
      message: 'Não existem filiados pendentes',
      buttons: [ 'Ok']
      
    });

    await alert.present();
    
  }
}
