import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController, LoadingController, AlertController, NavController, ModalController, IonRefresher } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfilePage } from './../profile/profile.page';
import { AcessProviders} from '../../providers/access-providers';

@Component({
  selector: 'app-modal-filiados',
  templateUrl: './modal-filiados.page.html',
  styleUrls: ['./modal-filiados.page.scss'],
})
export class ModalFiliadosPage implements OnInit {

  datastorage:any;
  users: any=[];
  limit: number=13;
  start: number = 0;
  id_lideranca_pass;
  nome_lideranca;
  id_lideranca :number;
  id_filiado: number;
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
        aksi: 'proses_consulta_filiados',
        id_lideranca: this.id_lideranca,
        id_filiado: this.id_filiado,
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


   async openProfile(a){
    const loader = await this.loadingCtrl.create({
      message: 'Por favor aguarde...',
      duration:1500
    });
    loader.present();
    const modal = await this.modalController.create({
      component: ProfilePage,
      cssClass: 'my-custom-class',
     
      componentProps: {
        'id_filiado': a
      }
    });
    console.log('a:',a);
  
  
    return await modal.present();
 
   

   }

   async emptyFiliados() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cadastro vazio',
      
      message: 'Esse líder ainda não cadastrou nenhum filiado',
      buttons: [ 'Ok']
      
    });

    await alert.present();
    
  }
}
