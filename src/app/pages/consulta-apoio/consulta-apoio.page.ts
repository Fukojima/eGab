import { PerfilApoioPage } from './../perfil-apoio/perfil-apoio.page';
import { Storage } from '@ionic/storage';
import { ToastController, LoadingController, AlertController, NavController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AcessProviders} from '../../providers/access-providers';



@Component({
  selector: 'app-consulta-apoio',
  templateUrl: './consulta-apoio.page.html',
  styleUrls: ['./consulta-apoio.page.scss'],
})
export class ConsultaApoioPage implements OnInit {
   
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
        aksi: 'proses_consulta_apoio',
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

    openRegisterApoio(){
      this.router.navigate(['/register-apoio'])
    }



    async emptyFiliados() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Cadastro vazio',
        
        message: 'Não existe nenhum apoio cadastrado, deseja realizar o cadastro?',
        buttons: [{
          text: 'Cadastrar',
          handler: () => {
          this.openRegisterApoio();
          }
        },
      'Cancelar']
        
      });
  
      await alert.present();
      
    }


   openProfile(a){

    this.router.navigate(['/profile/'+a])
   }

   async presentModal(a,b) {
    const modal = await this.modalController.create({
      component: PerfilApoioPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'id_apoio': a,
        'nome_apoio':b
      }
    });
    console.log('a:',a);
    return await modal.present();
   
  }

  openHome(){
         
    this.router.navigate(['/home-filiador'])   
         
        
  }
}
