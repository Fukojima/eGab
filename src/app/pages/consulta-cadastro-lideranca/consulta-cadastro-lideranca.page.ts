import { ModalFiliadosPage } from './../modal-filiados/modal-filiados.page';
import { PerfilLiderancaFiliadorPage } from './../perfil-lideranca-filiador/perfil-lideranca-filiador.page';
import { Storage } from '@ionic/storage';
import { ToastController, LoadingController, AlertController, NavController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AcessProviders} from '../../providers/access-providers';
import { ProfilePage } from './../profile/profile.page';


@Component({
  selector: 'app-consulta-cadastro-lideranca',
  templateUrl: './consulta-cadastro-lideranca.page.html',
  styleUrls: ['./consulta-cadastro-lideranca.page.scss'],
})
export class ConsultaCadastroLiderancaPage implements OnInit {
   
  public datastorage:any;
  users: any=[];
  limit: number=13;
  id_zona;
  id_secao;
  start: number = 0;
  id_filiador: number;
  count: number = 0;
  filtro_lider: any = '0';
  id_lideranca;
  filtro_secao: any= '0';
  filtro_zona: any = '0';
  zonas: any=[];
  secoes: any=[];
  lideres: any=[];
  modal;
  list:any = 'N';

  nr_zona: any;
  nr_secao: any;
  
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
       this.modal = '';
       this.list = 'N'
       this.id_filiador = res.id_filiador;
       this.loadZona();
       this.loadLider();
       this.start =0;
       this.users = [];
      
     

       
    
       
       
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

   async search(){
  
    
   const loader = await this.loadingCtrl.create({
      message : 'Aguarde...',
      duration:1000
    })
    loader.present();

      return new Promise(resolve => {
        let body={
        aksi: 'proses_pesquisa',
        id_zona: this.id_zona,
        id_secao: this.id_secao,
        id_lideranca: this.id_lideranca,
        start: this.start,
        limit: this.limit
        
 

        }
        this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
          if(res.sucess == true){
            this.modal = 'N'
           this.list = ''
           this.count = res.count;
           for(let datas of res.result){
             this.users.push(datas);
             resolve(true);
           
             
           }
           
          }else if(res.sucess == false){
            this.emptyFiliados();
           }
        },(err)=>{

        
        })

      });
    
    }

    async openFiliado(a){
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

   async loadUsers(){
    while(this.users.length > 0) {
      this.users.pop();
     }
    const loader = await this.loadingCtrl.create({
      message : 'Aguarde...',
      duration:1000
    })
    loader.present();

      return new Promise(resolve => {
        let body={
        aksi: 'proses_consulta',
       
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
    async loadSecao(){
         
            
      while(this.secoes.length > 0) {
        this.secoes.pop();
       }
      const loader = await this.loadingCtrl.create({
        message : 'Aguarde...',
        duration:1000
      })
      loader.present();
  
        return new Promise(resolve => {
          let body={
          aksi: 'proses_consulta_secao',
          id_con_zona: this.id_zona

          
   
  
          }
          this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
             for(let datas of res.result){

               this.secoes.push(datas);

               
  
             }
             resolve(true);
             
          },(err)=>{
  
          
          })
  
        });
      }

      async searchAll(){
  
        
       const loader = await this.loadingCtrl.create({
          message : 'Aguarde...',
          duration:1000
        })
        loader.present();
    
          return new Promise(resolve => {
            let body={
            aksi: 'proses_pesquisa_filiados_fil',
            
            id_filiador: this.id_filiador,
            start: this.start,
            limit: this.limit
            
     
    
            }
            this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
              if(res.sucess == true){
                this.modal = 'N'
               this.list = ''
               this.count = res.count;
               for(let datas of res.result){
                 this.users.push(datas);
                 resolve(true);
               
                 
               }
               
              }else if(res.sucess == false){
                this.emptyFiliados();
               }
            },(err)=>{
    
            
            })
    
          });
        
        }

    async loadZona(){
      while(this.zonas.length > 0) {
        this.zonas.pop();
       }
      const loader = await this.loadingCtrl.create({
        message : 'Aguarde...',
        duration:1000
      })
      loader.present();
  
        return new Promise(resolve => {
          let body={
          aksi: 'proses_pre_consulta_zona_lideranca',
         id_filiador: this.id_filiador
          
   
  
          }
          this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{

             for(let datas of res.result){
               this.zonas.push(datas);
  
             }
             resolve(true);
          },(err)=>{
  
          
          })
  
        });
      }

      async presentToast(a){
        const toast = await this.toastCtrl.create({
         message:a,
         duration:5000,
         position:'top'
    
        });
        toast.present();
      }
      async loadLider(){
        while(this.lideres.length > 0) {
          this.lideres.pop();
         }
        const loader = await this.loadingCtrl.create({
          message : 'Aguarde...',
          duration:1000
        })
        loader.present();
    
          return new Promise(resolve => {
            let body={
            aksi: 'proses_pre_consulta_lideranca',
           id_filiador: this.id_filiador
            
     
    
            }
            this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
  
               for(let datas of res.result){
                 this.lideres.push(datas);
    
               }
               resolve(true);
            },(err)=>{
    
            
            })
    
          });
        }

  backSearch(){

    this.modal = ''
    this.list = 'N'
    this.ionViewDidEnter()
     
    
  }


   openProfile(a){

    this.router.navigate(['/profile/'+a])
   }


   async emptyFiliados() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cadastro vazio',
      
      message: 'Não existem filiados cadastrados nessa configuração. Selecione outros dados.',
      buttons: [ 'Ok']
      
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

