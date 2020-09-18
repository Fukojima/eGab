import { Storage } from '@ionic/storage';
import { ToastController, LoadingController, AlertController, NavController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AcessProviders} from '../../providers/access-providers';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';




@Component({
  selector: 'app-profile',
  templateUrl: './modal-apoio.page.html',
  styleUrls: ['./modal-apoio.page.scss'],
})
export class ModalApoioPage implements OnInit {
  cpf_cnpj_filiado : string
  nome_filiado : string	
  documento_verso_titulo: string
  documento_frente_titulo: string
  documento_comprovante: string 
  
  email_filiado 	: string
  telefone_filiado 	: string
  endereco : string 	
  numero : string	
  complemento : string	
  bairro: string 	
  cidade: string 	
  uf 	: string
  cep 	: string
  nr_titulo : string	
  id_zona : string	
  id_secao : string
  id_lideranca : string
  sn_biometria: string
  datastorage:any;	
  nome_mae: string
  situacao_cadastro: string
  sn_aprovado_automatico: string
  us_aprovacao: string
  sn_whatsapp: string
  image: any
  caminho_documento: string
  b: any
  disabledButton;
  documento_verso: string
  documento_frente: string
  documento_perfil: string 
  users: any=[];
  limit: number=13;
  start: number = 0;
  newNomeFiliado: string
  us_alteracao: string
  id_usuario: number
  id_filiado;
  x;
  data_nascimento: string;
  data_atual;
  dt;
  ms;
  ano;
  dtAtual;
  dt_alteracao;
  wpp;
  ip: string = ''
  enviarp :string ='displayedp'
  enviadop:string = 'nonep'
  zonas: any=[];
  id_filiador: string
  zonaaa : string 
  secoes: any = []
  inputImgp: string = 'displayimgp'
  sendImgp: string = 'noneImgp'
  us_reprovacao;
  nr_secao: any;
  nr_zona: any;
  obs: any;

  constructor(    private router : Router,
    private http: HttpClient,
    private toastCtrl : ToastController,
    private loadingCtrl : LoadingController,
    private alertCtrl : AlertController,
    private accsPrvdrs: AcessProviders,
    private storage: Storage,
    private navCtrl: NavController,

    private modalController: ModalController,
    private alertController: AlertController) { }

  ngOnInit() {
   
  }
  selectedFile(event){
    this.image = event.target.files[0];
   this.changeTextInput();
    }
  
    changeTextInput(){
  
       this.inputImgp = 'noneImgp',
       this.sendImgp= 'displayImgp'
  
      
   }


  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
       console.log('reees',res);
       this.datastorage = res;
       this.id_lideranca = this.datastorage.id_filiador_lid;
       this.us_aprovacao = this.datastorage.nome;
       this.us_reprovacao = this.datastorage.nome;
       console.log(this.x);
       this.start =0;
       this.users = [];
      
     

       this.loadUsers();
  
     
       
       
       
    });


   }

  async loadUsers(){
 

    return new Promise(resolve => {
      let body={
      aksi: 'proses_consulta_filiados_pendentes',
      id_filiado: this.id_filiado,
      start: this.start,
      limit: this.limit
      
      


      }
      this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
                  console.log(res);
               
                 this.nome_filiado = res.result[0].nome;
                 this.documento_perfil = res.result[0].perfil;
                 this.nome_mae = res.result[0].nome_mae;
                 this.cpf_cnpj_filiado = res.result[0].cpf_cnpj_filiado;
                 this.email_filiado = res.result[0].email_filiado;
                 this.endereco = res.result[0].endereco;
                 this.numero = res.result[0].numero;
                 this.bairro = res.result[0].bairro;
                 this.telefone_filiado = res.result[0].telefone_filiado;
                 this.us_aprovacao = res.result[0].us_aprovacao;
                 this.documento_frente = res.result[0].documento_frente;
                 this.documento_verso = res.result[0].documento_verso;
                 this.cidade = res.result[0].cidade;
                 this.documento_frente_titulo = res.result[0].documento_frente_titulo;
                 this.documento_verso_titulo = res.result[0].documento_verso_titulo
                 this.documento_comprovante = res.result[0].documento_comprovante;  
                 this.uf = res.result[0].uf;
                 this.cep = res.result[0].cep;
                 this.id_zona = res.result[0].id_zona;
                 this.id_secao = res.result[0].id_secao;
                 this.nr_titulo = res.result[0].nr_titulo;
                 this.obs = res.result[0].obs;
                 this.documento_frente_titulo = res.result[0].documento_frente_titulo,
                 this.documento_verso_titulo = res.result[0].documento_verso_titulo,
                 this.documento_comprovante = res.result[0].comprovante,
                 this.loadZonaSecao(this.id_zona, this.id_secao);
                 this.data_nascimento = moment(res.result[0].data_nascimento).format("DD/MM/YYYY");
                 if(res.result[0].dt_alteracao == null || ""){
                          this.dt_alteracao = 'Não houve alterações'

                 }else{
                  this.dt_alteracao = res.result[0].dt_alteracao;

                 }
                 if(res.result[0].sn_whatsapp == 'S'){
                  this.wpp = 'logo-whatsapp'

                 }else{
                 this.wpp = '';

                  }




         for(let datas of res.result){
           this.users.push(datas);

         }
         resolve(true);

       
  
      },(err)=>{

      
      })

    });
  }
  async loadZonaSecao(zona,secao){
 


    return new Promise(resolve => {
      let body={
      aksi: 'proses_consulta_zona_secao',
      zonaConsulta : zona,
      secaoConsulta : secao


      }
      this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
             this.nr_zona = res.result[0].nr_zona;
             this.nr_secao = res[0][0].nr_secao;
         resolve(true);
      },(err)=>{

           
      })

    });
  }

   async openFrente(){
    const alert = await this.alertController.create({
      cssClass: 'documento',
      header: 'Frente do documento',

      message:  `<img src="data:image/jpeg;base64,${this.documento_frente}">`,
      buttons: ['Fechar']
    });

    await alert.present();


   }
   async openFrenteTitulo(){
    const alert = await this.alertController.create({
      cssClass: 'documento',
      header: 'Verso do Título de eleitor',

      message:  `<img src="data:image/jpeg;base64,${this.documento_frente_titulo}">`,
      buttons: ['Fechar']
    });

    await alert.present();


   }


   async openVersoTitulo(){
    const alert = await this.alertController.create({
      cssClass: 'documento',
      header: 'Frente do Título de eleitor',

      message:  `<img class=""img-doc" src="data:image/jpeg;base64,${this.documento_verso_titulo}">`,
      buttons: ['Fechar']
    });

    await alert.present();


   }

   
   async openVerso(){
    const alert = await this.alertController.create({
      cssClass: 'documento',
      header: 'Verso do documento',

      message:  `<img src="data:image/jpeg;base64,${this.documento_verso}">`,
      buttons: ['Fechar']
    });

    await alert.present();


   }

   dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }
  
  openHome(){
        
    this.router.navigate(['/home-filiador'])    
      }

     async popupNovoNomeFiliado(){
        const alert = await this.alertController.create({
         
         
          message: 'Editar nome:',
          inputs:[{name:'novoNome', placeholder:'Digite o novo nome...'  }],
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              
            }, {
              text: 'Confirmar',
              handler: (alertData) => {
            
              
              this.editNomeFiliado(alertData.novoNome);
              }
            }
          ]
        });
    
        await alert.present();
      }



     async editNomeFiliado(a){
        const loader = await this.loadingCtrl.create({
          message : 'Aguarde...',
        })
        loader.present();
        this.dt = new Date().getDate();
        this.ms = new Date().getMonth()+1;
        this.ano = new Date().getFullYear();
        this.dtAtual = this.dt + '/'+ this.ms +'/'+ this.ano;
        return new Promise(resolve => {
          let body={
          aksi: 'proses_update_nome_filiado',
          novo_nome_filiado : a.toUpperCase(),
          us_alteracao: this.us_alteracao,
          id_filiado: this.id_filiado,
          data_atual: this.dtAtual
     
          }
          this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
             if(res.success == true){
               loader.dismiss();
               this.presentToast('Atualizado com sucesso');
               this.ionViewDidEnter();

             }else{
              loader.dismiss();
              this.presentToast('Erro na atualização');
           
             }
          },(err)=>{
            loader.dismiss();
            this.presentToast(err);
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


      async popupNovoNomeMaeFiliado(){
        const alert = await this.alertController.create({
         
         
          message: 'Editar nome da mãe:',
          inputs:[{name:'novoNomeMae', placeholder:'Digite o novo nome...'  }],
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              
            }, {
              text: 'Confirmar',
              handler: (alertData) => {
            
              
              this.editNomeMaeFiliado(alertData.novoNomeMae);
              }
            }
          ]
        });
    
        await alert.present();
      }



     async editNomeMaeFiliado(a){
        const loader = await this.loadingCtrl.create({
          message : 'Aguarde...',
        })
        loader.present();
        this.dt = new Date().getDate();
        this.ms = new Date().getMonth()+1;
        this.ano = new Date().getFullYear();
        this.dtAtual = this.dt + '/'+ this.ms +'/'+ this.ano;
     
        return new Promise(resolve => {
          let body={
          aksi: 'proses_update_nome_mae_filiado',
          novo_nome_mae_filiado : a.toUpperCase(),
          us_alteracao: this.us_alteracao,
          id_filiado: this.id_filiado,
          data_atual: this.dtAtual

          }
          this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
             if(res.success == true){
               loader.dismiss();
               this.presentToast('Atualizado com sucesso');
               this.ionViewDidEnter();

             }else{
              loader.dismiss();
              this.presentToast('Erro na atualização');
           
             }
          },(err)=>{
            loader.dismiss();
            this.presentToast(err);
          })
  
        });
      }


      async popupNovoEnderecoFiliado(){
        const alert = await this.alertController.create({
         
         
          message: 'Editar Endereco:',
          inputs:[{name:'novoNome', placeholder:'Digite o novo endereco...' }],
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              
            }, {
              text: 'Confirmar',
              handler: (alertData) => {
            
              
              this.editEnderecoFiliado(alertData.novoNome);
              }
            }
          ]
        });
    
        await alert.present();
      }



     async editEnderecoFiliado(a){
        const loader = await this.loadingCtrl.create({
          message : 'Aguarde...',
        })
        loader.present();
        this.dt = new Date().getDate();
        this.ms = new Date().getMonth()+1;
        this.ano = new Date().getFullYear();
        this.dtAtual = this.dt + '/'+ this.ms +'/'+ this.ano;
     
        return new Promise(resolve => {
          let body={
          aksi: 'proses_update_endereco_filiado',
          novo_endereco : a.toUpperCase(),
          us_alteracao: this.us_alteracao,
          id_filiado: this.id_filiado,
          data_atual: this.dtAtual

          }
          this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
             if(res.success == true){
               loader.dismiss();
               this.presentToast('Atualizado com sucesso');
               this.ionViewDidEnter();

             }else{
              loader.dismiss();
              this.presentToast('Erro na atualização');
           
             }
          },(err)=>{
            loader.dismiss();
            this.presentToast(err);
          })
  
        });
      }



      async popupNovoEmailFiliado(){
        const alert = await this.alertController.create({
         
         
          message: 'Editar email:',
          inputs:[{name:'novoNome', placeholder:'Digite o novo email...'  }],
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              
            }, {
              text: 'Confirmar',
              handler: (alertData) => {
            
              
              this.editEmailFiliado(alertData.novoNome);
              }
            }
          ]
        });
    
        await alert.present();
      }



     async editEmailFiliado(a){
        const loader = await this.loadingCtrl.create({
          message : 'Aguarde...',
        })
        loader.present();
        this.dt = new Date().getDate();
        this.ms = new Date().getMonth()+1;
        this.ano = new Date().getFullYear();
        this.dtAtual = this.dt + '/'+ this.ms +'/'+ this.ano;
     
        return new Promise(resolve => {
          let body={
          aksi: 'proses_update_email_filiado',
          novo_email_filiado : a.toLowerCase(),
          us_alteracao: this.us_alteracao,
          id_filiado: this.id_filiado,
          data_atual: this.dtAtual

          }
          this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
             if(res.success == true){
               loader.dismiss();
               this.presentToast('Atualizado com sucesso');
               this.ionViewDidEnter();

             }else{
              loader.dismiss();
              this.presentToast('Erro na atualização');
           
             }
          },(err)=>{
            loader.dismiss();
            this.presentToast(err);
          })
  
        });
      }

      async openComprovante(){
        const alert = await this.alertController.create({
          cssClass: 'documento',
          header: 'Comprovante de resiência',
    
          message:  `<img src="data:image/jpeg;base64,${this.documento_comprovante}">`,
          buttons: ['Fechar']
        });
    
        await alert.present();
    
    
       }

      
      async popupNovoTelefoneFiliado(){
        const alert = await this.alertController.create({
         
         
          message: 'Editar Telefone:',
          inputs:[{name:'novoNome', placeholder:'Digite o novo número de telefone...'  }],
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              
            }, {
              text: 'Confirmar',
              handler: (alertData) => {
            
              
              this.editTelefoneFiliado(alertData.novoNome);
              }
            }
          ]
        });
    
        await alert.present();
      }



     async editTelefoneFiliado(a){
        const loader = await this.loadingCtrl.create({
          message : 'Aguarde...',
        })
        loader.present();
        this.dt = new Date().getDate();
        this.ms = new Date().getMonth()+1;
        this.ano = new Date().getFullYear();
        this.dtAtual = this.dt + '/'+ this.ms +'/'+ this.ano;
     
        return new Promise(resolve => {
          let body={
          aksi: 'proses_update_telefone_filiado',
          novo_email_filiado : a,
          us_alteracao: this.us_alteracao,
          id_filiado: this.id_filiado,
          data_atual: this.dtAtual

          }
          this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
             if(res.success == true){
               loader.dismiss();
               this.presentToast('Atualizado com sucesso');
               this.ionViewDidEnter();

             }else{
              loader.dismiss();
              this.presentToast('Erro na atualização');
           
             }
          },(err)=>{
            loader.dismiss();
            this.presentToast(err);
          })
  
        });
      }


      async onClick(a){
  
        const formData = new FormData();
        formData.append('image',this.image);
        
      
        const loader = await this.loadingCtrl.create({
          message : 'Aguarde...',
          duration: 1500
        })
        loader.present();
        
      
         this.http.post('https://egab.app/api/camera.php', formData).subscribe((response: any) => {
           console.log('response:',response);
    
             this.persistImg(response.name)
             this.changeBut();
            
         })
    
        
         
      
      }
    
     async persistImg(a){
      const loader = await this.loadingCtrl.create({
        message : 'Aguarde...',
      })
      loader.present();
      this.dt = new Date().getDate();
      this.ms = new Date().getMonth()+1;
      this.ano = new Date().getFullYear();
      this.dtAtual = this.dt + '/'+ this.ms +'/'+ this.ano;
    
      return new Promise(resolve => {
        let body={
        aksi: 'proses_update_picture_filiado',
        new_picture: a,
        id_filiado: this.id_filiado,
        us_alteracao: this.us_alteracao,
        data_atual: this.dtAtual
    
        }
        this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
           if(res.success == true){
             loader.dismiss();
             this.presentToast('Atualizado com sucesso');
             this.ionViewDidEnter();
    
           }else{
            loader.dismiss();
            this.presentToast('Erro na atualização');
         
           }
        },(err)=>{
          loader.dismiss();
          this.presentToast(err);
        })
    
      });
    
    
      }
    
    
      changeBut(){
    
            this.ip = 'butp';
            this.enviarp = 'nonep'
            this.enviadop = 'displayedp'
        }



       async approve(){
        const loader = await this.loadingCtrl.create({
          message : 'Aguarde...',
        })
        loader.present();
        this.dt = new Date().getDate();
        this.ms = new Date().getMonth()+1;
        this.ano = new Date().getFullYear();
        this.dtAtual = this.dt + '/'+ this.ms +'/'+ this.ano;
     
        return new Promise(resolve => {
          let body={
          aksi: 'proses_aprovacao',
          us_aprovacao: this.us_aprovacao,
          id_filiado: this.id_filiado,
          data_atual: this.dtAtual

          }
          this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
             if(res.success == true){
               loader.dismiss();
               this.presentToast('Filiado Aprovado');
               this.openHome();
               this.dismiss();


             }else{
              loader.dismiss();
              this.presentToast('Erro na requisição');
           
             }
          },(err)=>{
            loader.dismiss();
            this.presentToast(err);
          })
  
        });

        }

        async popupReprovacao(){
          const alert = await this.alertController.create({
           
           
            message: 'Reprovar filiado:',
            inputs:[{name:'novoNome', placeholder:'Digite o motivo da reprovacao...'  }],
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                cssClass: 'secondary',
                
              }, {
                text: 'Reprovar',
                handler: (alertData) => {
              
                
                this.reprove(alertData.novoNome);
                }
              }
            ]
          });
      
          await alert.present();
        }


        async reprove(a){
          const loader = await this.loadingCtrl.create({
            message : 'Aguarde...',
          })
          loader.present();
          this.dt = new Date().getDate();
          this.ms = new Date().getMonth()+1;
          this.ano = new Date().getFullYear();
          var hrs = new Date().getHours();
          var min = new Date().getMinutes();
          var sec = new Date().getSeconds();
          //this.dtAtual = this.dt + '/'+ this.ms +'/'+ this.ano;
         this.dtAtual = this.ano + '-' + this.ms + '-' + this.dt + ' ' + hrs+':'+ min+':' + sec;
       
          return new Promise(resolve => {
            let body={
            aksi: 'proses_reprovacao',
            us_reprovacao: this.us_reprovacao,
            id_filiado: this.id_filiado,
            motivo_reprovacao:a.toUpperCase(),
            data_atual: this.dtAtual
  
            }
            this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
               if(res.success == true){
                 loader.dismiss();
                 this.presentToast('Filiado Reprovado');
                 this.openHome();
                 this.dismiss();
  
  
               }else{
                loader.dismiss();
                this.presentToast('Erro na requisição');
             
               }
            },(err)=>{
              loader.dismiss();
              this.presentToast(err);
            })
    
          });
  
          }
}
