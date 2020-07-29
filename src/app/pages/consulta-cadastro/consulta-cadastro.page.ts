import { ModalFiliadosPage } from './../modal-filiados/modal-filiados.page';
import { PerfilLiderancaFiliadorPage } from './../perfil-lideranca-filiador/perfil-lideranca-filiador.page';
import { Storage } from '@ionic/storage';
import { ToastController, LoadingController, AlertController, NavController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AcessProviders} from '../../providers/access-providers';



@Component({
  selector: 'app-consulta-cadastro',
  templateUrl: './consulta-cadastro.page.html',
  styleUrls: ['./consulta-cadastro.page.scss'],
})
export class ConsultaCadastroPage implements OnInit {
   
  public datastorage:any;
  users: any=[];
  limit: number=13;
  start: number = 0;
  id_filiador: number;
  count: number = 0;

  constructor( private router : Router,
    private toastCtrl : ToastController,
    private loadingCtrl : LoadingController,
    private alertCtrl : AlertController,
    private accsPrvdrs: AcessProviders,
    public storage: Storage,
    private navCtrl: NavController,
    private alertController: AlertController,
    private modalController: ModalController
    ) { }

  ngOnInit() {
  }

  


  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
       console.log(res);
       this.datastorage = res;
       
       this.id_filiador = res.id_filiador;
       
       this.start =0;
       this.users = [];
      
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
 
    const loader = await this.loadingCtrl.create({
      message : 'Aguarde...',
      duration:1000
    })
    loader.present();

      return new Promise(resolve => {
        let body={
        aksi: 'proses_consulta',
        id_filiador: this.id_filiador,
        start: this.start,
        limit: this.limit
        
 

        }
        this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
           for(let datas of res.result){
             this.users.push(datas);
             
           }
           resolve(true);
        },(err)=>{

        
        })

      });
    }



  


   openProfile(a){

    this.router.navigate(['/profile/'+a])
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

  async lidProfile(a,b) {
    const modal = await this.modalController.create({
      component: PerfilLiderancaFiliadorPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'id_lideranca': a,
        'nome_lideranca':b
      }
    });
    console.log('a:',a);
    return await modal.present();
   
  }

  openHome(){
         
    this.router.navigate(['/home-filiador'])   
         
        
  }
}
