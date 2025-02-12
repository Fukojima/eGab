import { Storage } from '@ionic/storage';
import { ToastController, LoadingController, AlertController, NavController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AcessProviders} from '../../providers/access-providers';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';
import { FileOpener} from '@ionic-native/file-opener/ngx';
import { Plugins, CameraResultType, CameraSource, FilesystemDirectory} from '@capacitor/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


const { Camera, FileSystem} = Plugins;
pdfMake.vfs = pdfFonts.pdfMake.vfs; 



@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  cpf_cnpj_filiado : string
  nome_filiado : string	
  zonaClass: string = "zona-none"
  base64Image: string;
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
  documento_verso_titulo: string
  documento_frente_titulo: string
  documento_comprovante: string 
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
  nr_caderno;
  ip: string = ''
  enviarp :string ='displayedp'
  enviadop:string = 'nonep'
  zonas: any=[];
  id_filiador: string
  zonaaa : string 
  secoes: any = []
  inputImgp: string = 'displayimgp'
  sendImgp: string = 'noneImgp'
  nr_zona: any;
  nr_secao: any;
  id_municipio: any;
  id_grupo_usuario: any;
  obs: any;
  popup: string = 'popup';
  pdfObj: any;
  nome_lideranca: string;
  lideres: any =[];
  nova_id_lideranca: any;


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
       this.us_alteracao = this.datastorage.nome;
       this.id_municipio = this.datastorage.id_municipio;
       this.id_grupo_usuario = this.datastorage.id_grupo_usuario;
       if (this.datastorage.id_filiador == null){
       this.id_filiador = this.datastorage.id_filiador_apoio}
       else{
         this.id_filiador = this.datastorage.id_filiador;
       }
     
       console.log(this.x);
       this.start =0;
       this.users = [];
      
     

       this.loadUsers();
       this.loadLider();
  
     
       
       
       
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

    async popupNovoNumeroFiliado(){
      const alert = await this.alertController.create({
       
       
        message: 'Editar número:',
        inputs:[{name:'novoNome', placeholder:'Digite o novo numero...'  }],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            
          }, {
            text: 'Confirmar',
            handler: (alertData) => {
          
            
            this.editNumeroFiliado(alertData.novoNome);
            }
          }
        ]
      });
  
      await alert.present();
    }



   async editNumeroFiliado(a){
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
        aksi: 'proses_update_numero_filiado',
        novo_numero_filiado : a,
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

  async loadUsers(){
 

    return new Promise(resolve => {
      let body={
      aksi: 'proses_consulta_filiados_aprovados',
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
                 this.documento_frente_titulo = res.result[0].documento_frente_titulo;
                 this.documento_verso_titulo = res.result[0].documento_verso_titulo
                 this.documento_comprovante = res.result[0].documento_comprovante;              
                 this.cidade = res.result[0].cidade;
                 this.uf = res.result[0].uf;
                 this.data_nascimento = moment(res.result[0].data_nascimento).format("DD/MM/YYYY");
                 this.cep = res.result[0].cep;
                 this.us_aprovacao = res.result[0].us_aprovacao;
                 this.nr_titulo = res.result[0].nr_titulo;
                 this.obs = res.result[0].obs;
                 this.nome_lideranca = res.result[0].nome_lideranca;
                 this.nr_caderno = res.result[0].nr_caderno;
                 this.nome_lideranca = res.result[0].nome_lideranca;
                 
                 this.id_zona = res.result[0].id_zona;
                 this.id_secao = res.result[0].id_secao;
                 this.loadZonaSecao(this.id_zona, this.id_secao);
                 

                 if(res.result[0].dt_alteracao != null){
                  this.dt_alteracao = moment(res.result[0].dt_alteracao).format("DD/MM/YYYY HH:mm:ss");
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
      header: 'Frente do Título de eleitor',

      message:  `<img src="data:image/jpeg;base64,${this.documento_frente_titulo}">`,
      buttons: ['Fechar']
    });

    await alert.present();


   }


   async openVersoTitulo(){
    const alert = await this.alertController.create({
      cssClass: 'documento',
      header: 'Verso do Título de eleitor',

      message:  `<img class=""img-doc" src="data:image/jpeg;base64,${this.documento_verso_titulo}">`,
      buttons: ['Fechar']
    });

    await alert.present();


   }
   async openComprovante(){
    const alert = await this.alertController.create({
      cssClass: 'documento',
      header: 'Comprovante de residência',

      message:  `<img src="data:image/jpeg;base64,${this.documento_comprovante}">`,
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
        if (this.id_grupo_usuario == 3){this.router.navigate(['/home'])}
        else if (this.id_grupo_usuario == 2){this.router.navigate(['/home-filiador'])}
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
        var hrs = new Date().getHours();
        var min = new Date().getMinutes();
        var sec = new Date().getSeconds();
        //this.dtAtual = this.dt + '/'+ this.ms +'/'+ this.ano;
       this.dtAtual = this.ano + '-' + this.ms + '-' + this.dt + ' ' + hrs+':'+ min+':' + sec;
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

      async editLideranca(){
        if (this.nova_id_lideranca == null || this.nova_id_lideranca == undefined){
          this.presentToast('Selecione uma liderança');
        }else{
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
          aksi: 'proses_update_lideranca',
          id_lideranca: this.nova_id_lideranca,   
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
      }
  
      
  

      

      async presentToast(a){
        const toast = await this.toastCtrl.create({
         message:a,
         duration:3000,
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
            aksi: 'proses_consulta_lider',
            id_filiador: this.id_filiador,
            start: this.start,
            limit: this.limit
            
     
    
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

      async popupNovaLideranca(){
        this.popup = '';
      }

     async editNomeMaeFiliado(a){
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
        console.log('data:', this.dtAtual);
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
      async popupNovoCadernoFiliado(){
        const alert = await this.alertController.create({
         
         
          message: 'Editar número do caderno:',
          inputs:[{name:'caderno', placeholder:'Digite o novo número..'  }],
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              
            }, {
              text: 'Confirmar',
              handler: (alertData) => {
            
              
              this.editCadernoFiliado(alertData.caderno);
              }
            }
          ]
        });
    
        await alert.present();
      }



     async editCadernoFiliado(a){
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
        console.log('data:', this.dtAtual);
        return new Promise(resolve => {
          let body={
          aksi: 'proses_update_caderno_filiado',
          nr_caderno : a,
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
        var hrs = new Date().getHours();
        var min = new Date().getMinutes();
        var sec = new Date().getSeconds();
        //this.dtAtual = this.dt + '/'+ this.ms +'/'+ this.ano;
       this.dtAtual = this.ano + '-' + this.ms + '-' + this.dt + ' ' + hrs+':'+ min+':' + sec;
     
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
        var hrs = new Date().getHours();
        var min = new Date().getMinutes();
        var sec = new Date().getSeconds();
        //this.dtAtual = this.dt + '/'+ this.ms +'/'+ this.ano;
       this.dtAtual = this.ano + '-' + this.ms + '-' + this.dt + ' ' + hrs+':'+ min+':' + sec;
     
        return new Promise(resolve => {
          let body={
          aksi: 'proses_update_email_filiado',
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
        var hrs = new Date().getHours();
        var min = new Date().getMinutes();
        var sec = new Date().getSeconds();
        //this.dtAtual = this.dt + '/'+ this.ms +'/'+ this.ano;
       this.dtAtual = this.ano + '-' + this.ms + '-' + this.dt + ' ' + hrs+':'+ min+':' + sec;
     
        return new Promise(resolve => {
          let body={
          aksi: 'proses_update_telefone_filiado',
          novo_telefone_filiado : a,
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


      async onClick(){
  
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
      var hrs = new Date().getHours();
      var min = new Date().getMinutes();
      var sec = new Date().getSeconds();
      //this.dtAtual = this.dt + '/'+ this.ms +'/'+ this.ano;
     this.dtAtual = this.ano + '-' + this.ms + '-' + this.dt + ' ' + hrs+':'+ min+':' + sec;


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


        async popupNovaDataFiliado(){
          const alert = await this.alertController.create({
           
           
            message: 'Editar data de nascimento:',
            inputs:[{name:'novoNome', placeholder:'Digite uma nova data...'  }],
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                cssClass: 'secondary',
                
              }, {
                text: 'Confirmar',
                handler: (alertData) => {
              
                
                this.editDataFiliado(alertData.novoNome);
                }
              }
            ]
          });
      
          await alert.present();
        }
  
  
  
       async editDataFiliado(a){
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
            aksi: 'proses_update_data_filiado',
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

        openNovaZona(){

          this.zonaClass = 'zona-on';
          this.loadZona();
        }

      

  
  
  
       async editZonaFiliado(){
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
            aksi: 'proses_update_zona_secao',
            novo_id_zona : this.id_zona,
            novo_id_secao: this.id_secao,
            us_alteracao: this.us_alteracao,
            id_filiado: this.id_filiado,
            data_atual: this.dtAtual
  
            }
            this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
               if(res.success == true){
                 loader.dismiss();
                 this.presentToast('Atualizado com sucesso');
                 this.ionViewDidEnter();
                 this.zonaClass = 'zona-none';
  
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
        async loadZona(){
 
          const loader = await this.loadingCtrl.create({
            message : 'Aguarde...',
            duration:1000
          })
          loader.present();
      
            return new Promise(resolve => {
              let body={
              aksi: 'proses_consulta_zonas',
              id_municipio: this.id_municipio,
              start: this.start,
              limit: this.limit
              
       
      
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

            async pegaCep(a){
              const loader = await this.loadingCtrl.create({
                message : 'Aguarde...',
              })
              loader.present();
          
              //this.dtAtual = this.dt + '/'+ this.ms +'/'+ this.ano;
          
              return new Promise(resolve => {
                let body={
                aksi: 'proses_cep',
                cep: a
          
                }
                this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
                   if(res.success == true){
                     loader.dismiss();
                   
                 
                  

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
                       aksi: 'proses_update_cep_filiado',
                       novo_cep_filiado : a,
                       nova_cidade : res.result.cidade,
                       novo_uf : res.result.uf,
                       novo_bairro : res.result.bairro,
                       novo_endereco : res.result.logradouro,
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
                           this.presentToast('CEP inválido');
                        
                          }
                       },(err)=>{
                         loader.dismiss();
                         this.presentToast(err);
                       })
               
                     });






          
                   }else{
                    loader.dismiss();
          
                 
                   }
                },(err)=>{
                  loader.dismiss();
                  this.presentToast(err);
                })
          
              });
            }
          



            async popupNovoCEPFiliado(){
              const alert = await this.alertController.create({
               
               
                message: 'Editar CEP:',
                inputs:[{name:'novoNome', placeholder:'Digite o novo CEP...'  }],
                buttons: [
                  {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    
                  }, {
                    text: 'Confirmar',
                    handler: (alertData) => {
                  
                    
                    this.pegaCep(alertData.novoNome);
                    }
                  }
                ]
              });
          
              await alert.present();
            }
      
      
            async popupDeletarFiliado(){
              const alert = await this.alertController.create({
               
                subHeader: 'Essa é uma ação permanente',
                message: 'Deseja realmente apagar o registro desse usuário?',
           
                buttons: [
                  {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    
                  }, {
                    text: 'Confirmar',
                    handler: () => {
                  
                    
                    this.deletFiliado();
                    }
                  }
                ]
              });
          
              await alert.present();
            }
      
      
      
           async deletFiliado(){
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
                aksi: 'proses_delet_filiado',
                nome_filiado:this.nome_filiado,
                cpf:this.cpf_cnpj_filiado,
                us_exclusao: this.us_alteracao,
                id_filiado: this.id_filiado,
                data_atual: this.dtAtual
      
                }
                this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
                   if(res.success == true){
                     loader.dismiss();
                     this.presentToast('Excluido com sucesso');
                    this.dismiss();
                   
                    
         
      
                   }else{
                    loader.dismiss();
                    this.presentToast('Erro na exclusão');
                 
                   }
                },(err)=>{
                  loader.dismiss();
                  this.presentToast(err);
                })
        
              });
            }
      
            createPDF(){
              var font64Normal = "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WhlaL1o8Wk9aXFp7WqFax1rqWw1bRFt/W5dbrlvaXAoAAQAAAAIAAEu9MYhfDzz1AAMD6AAAAADHljTNAAAAANqdKZX+E/7yBSsEPgAAAAYAAgAAAAAAAAKNADoCnwAnAp8AJwKfACcCnwAnAp8AJwKfACcCnwAnAp8AJwKfACcCnwAnAp8AJwKfACcCnwAnAp8AJwKfACcCnwAnAp8AJwKfACcCnwAnAp8AJwKfACcCnwAnAp8AJwKfACcCnwAnA74AJwO+ACcCVABRAlQAUQJDAD8CQwA/AkMAPwJDAD8CQwA/AkMAPwJDAD8CmgBRApoAEAKaAFECmgAQApoAUQKaAFECmgBRAkgAUQJIAFECSABRAkgAUQJIAFECSABRAkgAUQJIAFECSABOAkgAUQJIAFECSABRAkgAUQJIAFECSABRAkgAUQJIAFECSABRAkgAUQJIAFECSABRAkgAUQJIAFECMwBRAjMAUQKJAD8CiQA/AokAPwKJAD8CiQA/AokAPwKJAD8CowBRAqMAEAKjAFECowBRAqMAUQDdAFEA3QBRAN3/5wDd/94A3f+pAN3/0QDd/9EA3QBRAN0AUQDd/98A3QA/AN3/6QDd/+YA3QAmAN3/yAF7ABsBewAbAlEAUQJRAFECEwBRAhMAUQITAFECEwBRAhMAUQITAFECEwBRAhMAAwM1AD0DNQA9AzUAPQKkAGECpABhAqQAYQKkAGECpABhAqQAYQKiAGECpABhAqQAYQKqAD8CqgA/AqoAPwKqAD8CqgA/AqoAPwKqAD8CqgA/AqoAPwKqAD8CqgA/AqoAPwKqAD8CqgA/AqoAPwKqAD8CqgA/AqoAPwKqAD8CqgA/AqoAPwKqAD8CqgA/AqoAPwKqAD8CqgA/AqoAPwKqAD8CqgA/AqoAPwKqAD8CqgA/AqoAPwKqAD8EKAA/AlcAUQJXAFECKQBRAqoAPwJaAFECWgBRAloAUQJaAFECWgBRAloAUQJaAFECWgBRAj8AQQI/AEECPwBBAj8AQQI/AEECPwBBAj8AQQI/AEECPwBBAj8AQQI/AEECjwBRAl4AQwIwABACMAAQAjAAEAIwABACMAAQAjAAEAIwABACMAAQAqEARwKhAEcCoQBHAqEARwKhAEcCoQBHAqEARwKhAEcCoQBHAqEARwKhAEcCoQBHAqEARwKhAEcCoQBHAqEARwKhAEcCoQBHAqEARwKhAEcCoQBHAqEARwKhAEcCnwAnA98AJwPfACcD3wAnA98AJwPfACcCYwApAmcAKQJnACkCZwApAmcAKQJnACkCZwApAmcAKQJnACkCZwApAmcAKQIsAC0CLAAtAiwALQIsAC0CLAAtAh8AMAIfADACHwAwAh8AMAIfADACHwAwAh8AMAIfADACHwAwAh8AMAIfADACHwAlAh8AMAIfADACHwAwAh8AMAIfADACHwAwAh8AMAIfADACHwAwAh8AMAIfADACHwAwAh8AMAN6ADEDegAxAkAAUgJAAFIB6gA+AeoAPgHqAD4B6gA+AeoAPgHqAD4B6gA+AjwAPgJBAD4CPAA+AjwAPgI8AD4CPAA+AjwAPgIeAD4CHgA+Ah4APgIeAD4CHgA+Ah4APgIeAD4CHgA+Ah4AJQIeAD4CHgA+Ah4APgIeAD4CHgA+Ah4APgIeAD4CHgA+Ah4APgIeAD4CHgA+Ah4APgIeAD4CHgA+Ah4APgFoABkBaAAZAj4AIgI+ACICPgAiAj4AIgI+ACICPgAiAj4AIgJKAFICSgAGAkoAUgJKABYCSgBSAN0ATQDaAFIA2gBRANr/6ADa/94A2v+uANr/8QDa//EA2gBSAN0ATQDa/+8A2gBEANr/6gDa/+sA3QAmANr/zwDdAE0A3QBSAN3/3gHsAFIB7ABSAewAUgEgAFIBIABRASAAUgEgAE4BMQBSASAAUgEgABkBIAAGA7oAUgO6AFIDugBSAkoAUgJKAFICSgBSAkoAUgJKAFICSgBSAkoAUgJKAFICSgBSAkEAPgJBAD4CQQA+AkEAPgJBAD4CQQA+AkEANwJBAD4CQQA+AkEAPgJBAD4CQQA+AkEAPgJBAD4CQQA+AkEAPgJBAD4CQQA+AkEAPgJBAD4CQQA+AkEAPgJBAD4CQQA+AkEAPgJBAD4CQQA+AkEAPgJBADsCQQA7AkEAPgJBAD4CQQA+AkEAPgOmAD4CQABSAkAAUgJAAFICPAA+AZkAUgGZAFIBmQBGAZkAHQGZAA4BmQBQAZkASQGZ/+gB8gA1AfIANQHyADUB8gA1AfIANQHyADUB8gA1AfIANQHyADUB8gA1AfIANQJBAEgBaQAXAWkAFwFpABcBaQAXAWkAFwFpABcBaQAXAWkAFwFpABcCSgBRAkoAUQJKAFECSgBRAkoAUQJKAFECSgBRAkoAUQJKAFECSgBRAkoAUQJKAFECSgBRAkoAUQJKAFECSgBRAkoAUQJKAFECSgBRAkoAUQJKAFECSgBRAkoAUQIQABUDFAAVAxQAFQMUABUDFAAVAxQAFQHxABoCFQAVAhUAFQIVABUCFQAVAhUAFQIVABUCFQAVAhUAFQIVABUCFQAVAesALgHrAC4B6wAuAesALgHrAC4ELAA+A74APgM9AD4C+AAXA9UAFwQXABcC0QAZA4sAGQJZABcCmwAXA1cANQLRABcDfQAXAi8ATAI4ACoCOAAqAjgAKgI4ACoCOAAqAjgAKgI4ACoCOAAqAjgAKgI4ACoCOAAqAjgAKgI4ACoCOAAqAjgAKgI4ACoCOAAqAjgAKgI4ACoCOAAqAjgAKgI4ACoCOAAqAjgAKgI4ACoDIAAqAyAAKgH8AEwBngASAaUAGwH8AEwB7QA9Ae0APQHtAD0B7QA9Ae0APQHtAD0B7QA9AjMATAIzABkCMwBMAjMAGQIzAEwCMwBMAjMATAHxAEwB8QBMAfEATAHxAEwB8QBMAfEATAHxAEwB8QBMAfEAHgHxAEwB8QBMAfEARwHxAEwB8QBMAfEATAHxAEwB8QBMAfEATAHxAEwB8QBMAfEATAHxAEwB8QBMAgMAQAHhAEwB4QBMAiUAPQIlAD0CJQA9AiUAPQIlAD0CJQA9AiUAPQI8AEwCPAAZAjwATAI8AEwCPABMANAATADQAEoA0P/hAND/1wDQ/6cA0P/qAND/6gDQAEsA0ABJAND/6ADQAD0A0P/jAND/5ADQAB4A0P/IAUwAIgFMACIB/ABMAfwATAKqAEwBxQBMAcUASgHFAEwBxQBMAcUATAHFAEwBxQBMAcUADgK1ADwCtQA8ArUAPAI8AFgCPABYAjwAWAI8AFgCPABYAjwAWAI6AFgCPABYAjwAWAJBAD0CQQA9AkEAPQJBAD0CQQA9AkEAPQJBADcCQQA9AkEAPQJBAD0CQQA9AkEAPQJBAD0CQQA9AkEAPQJBAD0CQQA9AkEAPQJBAD0CQQA9AkEAPQJBAD0CQQA9AkEAPQJBAD0CQQA9AkEAPQJBAD0CQQA9AkEAPQJBAD0CQQA9AkEAPQJBAD0DcAA9Af4ATAH+AEwB2QBMAkEAPQIOAEwCDgBMAg4ATAIOAEwCDgA0Ag4ATAIOAEwCDgBMAeoAPgHqAD4B6gA+AeoAPgHqAD4B6gA+AeoAPgHqAD4B6gA+AeoAPgHqAD4B3wAZAd8AGQHfABkB3wAZAd8AGQHfABkB3wAZAd8AGQI5AEQCOQBEAjkARAI5AEQCOQBEAjkARAI5AEQCOQBEAjkARAI5AEQCOQBEAjkARAI5AEQCOQBEAjkARAI5AEQCOQBEAjkARAI5AEQCOQBEAjkARAI5AEQCOQBEAjgAKgM4ACoDOAAqAzgAKgM4ACoDOAAqAgsAKgIKACoCCgAqAgoAKgIKACoCCgAqAgoAKgIKACoCCgAqAgoAKgIKACoB2wAwAdsAMAHbADAB2wAwAdsAMAGXACMBsQAtAxEAPgJKAFECZAAYApIAUwFnADACUwA5AksALQJLABsCfgBbAnQATgIcACMCiABZAnQASAHCADIBwgAlAcIARwHCACoCkgBTAcIAMAHCAEcBwgAyAcIAMAHCAEcBwgAyAcIAKgHCACUBwgBEAcIAOQHCADQBwgA0AcIANAHCACoBwgAlAcIARAHCADkBwgA0AcIANAHCADQByAAwAcgARwHIADIByAAqAcgAJQHIAEQByAA5AcgANAHIADQByAA0AND/lAT7AE8E+wBPBPsANAIqAEwBPAAxAfcAOQHxADAB9gAhAhgAUgIRAEgBzQAoAiEAUQIRAEMCKgBMAcsAPAGAABgBBwBmAT4AZgC9AEEAvQBBAzAAagEHAGQBBwBnAqEAGQC9AEECEwAuAhMAVAD6ACkAjgApAL0AQQGAABgCYQAAAYAAGAEHAGYBPgBmAQcAZwAA/3YCEwBUAYAAGABY//4BNAAYATQAGAFKAGYBSgAYAU8AWQFOABgBNAAYATQAGAFKAGYBSgAYAU8AWQFOABgC6wAaAgwAGgJhAEQC6wAaAVUAGgFVABoBVQAaAusAGgIMABoBVQAaAW0AGgJgADwCYAA0AWYAPAFmADQBFgA3ARYAOQEWADcArgA5AK4ANwCuADcBeAA8AXgANAHLADwBBwBmARIAHgESAB4BIwBaASMAHgE+AGYC6wAaAgwAGgDuAFkA7gBZAVUAGgAQ/4MCPQAfASwAUQErAB4BxQAxAcUASQD6ACkBFgA3ARYAOQEWADcArgA5AK4ANwCtADcAjgApAW0AGgJhAAAAUAAAAL0AAAESAAABEgAAAIkAAAAAAAABEgAA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AdADKAOpAykDkgNqAxYDbwOBA3EDgwOqA6QEDQOlAs0DPwOTAzoDpgQRA6gDkAL3AvgECAOcA6MDEAQLAvYCzgNAAwEDAAMCAxoAEgACAAkAGQAQABcAGgAhADsALQAxADgAWgBSAFQAVgAmAHcAhgB5AHsAlgCCA4gAlADDAL0AvwDBANsAnQGeAPoA6gDxAQEA+AD/AQIBCQEjARUBGQEgAUQBPAE+AUABDgFjAXIBZQFnAYIBbgOJAYABrwGpAasBrQHHAYkByQAVAP0AAwDrABYA/gAfAQcAIwELACQBDAAgAQgAJwEPACgBEAA+ASYALgEWADkBIQBBASkALwEXAEgBMQBGAS8ASgEzAEkBMgBPATgATQE2AF8BSQBdAUcAUwE9AF4BSABYATsAYQFMAGMBTgFPAGUBUQBnAVMAZgFSAGgBVABrAVcAcAFcAHIBXgBxAV0AdQFhAJABfAB6AWYAjgF6AJoBhgCgAYwAogGOAKEBjQCoAZQArQGZAKwBmACqAZYAtwGiALYBoQC1AaAA0QG9AM0BuQC+AaoA0AG8AMsBtwDPAbsA1gHCANwByADdAOUB0QDnAdMA5gHSAIgBdADFAbEARwEwAJMBfwAYAQAAGwEDAJUBgQAPAPcAFAD8ADcBHwA9ASUAVQE/AFwBRgCBAW0AjwF7AKMBjwClAZEAwAGsAMwBuACuAZoAuAGjAIMBbwCZAYUAhAFwAOIBzgQCA/8D/gP9BAQEAwQMBAoEBwQABAUEAQQGBAkEDgQTBBIEFAQQA88D0APTA9cD2APVA84DzQPZA9YD0QPUAB0BBQAiAQoAKQERACoBEgArARMAQAEoAD8BJwAwARgARAEtAEsBNABQATkATgE3AFcBQQBpAVUAagFWAG0BWQBuAVoAcwFfAHQBYAB2AWIAlwGDAJgBhACSAX4AkQF9AJwBiACkAZAApgGSAK8BmwCwAZwAqQGVAKsBlwCxAZ0AuQGlALoBpgC7AacA0gG+AM4BugDYAcQA1QHBANcBwwDeAcoA6AHUABEA+QATAPsACgDyAAwA9AANAPUADgD2AAsA8wAEAOwABgDuAAcA7wAIAPAABQDtADoBIgA8ASQAQgEqADIBGgA0ARwANQEdADYBHgAzARsAWwFFAFkBQwCFAXEAhwFzAHwBaAB+AWoAfwFrAIABbAB9AWkAiQF1AIsBdwCMAXgAjQF5AIoBdgDCAa4AxAGwAMYBsgDIAbQAyQG1AMoBtgDHAbMA4AHMAN8BywDhAc0A4wHPA2YDaANrA2cDbAM2AzUDNAM3A0QDRQNDA6sDrQMRA3YDeQNzA3QDeAN+A3cDgAN6A3sDfwOVA5gDmgOHA4QDmwOPA44B2AHdAd4B2QHaAdu4Af+FsASNAAAAABAAxgADAAEECQAAAJoAAAADAAEECQABABIAmgADAAEECQACAA4ArAADAAEECQADACgAugADAAEECQAEABIAmgADAAEECQAFABoA4gADAAEECQAGABIA/AADAAEECQAIABoBDgADAAEECQAJABoBDgADAAEECQALADQBKAADAAEECQAMADQBKAADAAEECQANASABXAADAAEECQAOADQCfAADAAEECQAQAAYCsAADAAEECQARAAoCtgADAAEECQEAAAwCwABDAG8AcAB5AHIAaQBnAGgAdAAgADIAMAAxADcAIABUAGgAZQAgAEUAeABvACAAUAByAG8AagBlAGMAdAAgAEEAdQB0AGgAbwByAHMAIAAoAGgAdAB0AHAAcwA6AC8ALwBnAGkAdABoAHUAYgAuAGMAbwBtAC8ATgBEAEkAUwBDAE8AVgBFAFIALwBFAHgAbwAtADEALgAwACkARQB4AG8AIABMAGkAZwBoAHQAUgBlAGcAdQBsAGEAcgAyAC4AMAAwADAAOwBUAEkATgBZADsARQB4AG8ALQBMAGkAZwBoAHQAVgBlAHIAcwBpAG8AbgAgADIALgAwADAAMABFAHgAbwAtAEwAaQBnAGgAdABOAGEAdABhAG4AYQBlAGwAIABHAGEAbQBhAGgAdAB0AHAAOgAvAC8AdwB3AHcALgBuAGQAaQBzAGMAbwB2AGUAcgBlAGQALgBjAG8AbQBUAGgAaQBzACAARgBvAG4AdAAgAFMAbwBmAHQAdwBhAHIAZQAgAGkAcwAgAGwAaQBjAGUAbgBzAGUAZAAgAHUAbgBkAGUAcgAgAHQAaABlACAAUwBJAEwAIABPAHAAZQBuACAARgBvAG4AdAAgAEwAaQBjAGUAbgBzAGUALAAgAFYAZQByAHMAaQBvAG4AIAAxAC4AMQAuACAAVABoAGkAcwAgAGwAaQBjAGUAbgBzAGUAIABpAHMAIABhAHYAYQBpAGwAYQBiAGwAZQAgAHcAaQB0AGgAIABhACAARgBBAFEAIABhAHQAOgAgAGgAdAB0AHAAOgAvAC8AcwBjAHIAaQBwAHQAcwAuAHMAaQBsAC4AbwByAGcALwBPAEYATABoAHQAdABwADoALwAvAHMAYwByAGkAcAB0AHMALgBzAGkAbAAuAG8AcgBnAC8ATwBGAEwARQB4AG8ATABpAGcAaAB0AFcAZQBpAGcAaAB0AAAAAgAAAAAAAP+cADIAAAAAAAAAAAAAAAAAAAAAAAAAAAQdAAAAJADJAQIBAwEEAQUBBgEHAMcBCAEJAQoBCwEMAQ0AYgEOAK0BDwEQAREBEgBjARMArgCQARQAJQEVACYA/QD/AGQBFgEXARgAJwDpARkBGgEbARwBHQAoAGUBHgEfASAAyAEhASIBIwEkASUBJgDKAScBKADLASkBKgErASwBLQEuAS8AKQEwACoA+AExATIBMwE0ATUAKwE2ATcBOAE5ACwAzAE6AM0BOwDOATwA+gE9AM8BPgE/AUABQQFCAC0BQwAuAUQALwFFAUYBRwFIAUkBSgDiADABSwFMADEBTQFOAU8BUAFRAVIBUwBmADIA0AFUANEBVQFWAVcBWAFZAVoAZwFbAVwBXQDTAV4BXwFgAWEBYgFjAWQBZQFmAWcBaAFpAWoAkQFrAK8BbAFtAW4AsAAzAW8A7QA0ADUBcAFxAXIBcwF0AXUBdgA2AXcBeADkAXkA+wF6AXsBfAF9AX4BfwGAADcBgQGCAYMBhAGFAYYBhwA4ANQBiADVAYkAaAGKANYBiwGMAY0BjgGPAZABkQGSAZMBlAGVAZYBlwGYAZkAOQA6AZoBmwGcAZ0AOwA8AOsBngC7AZ8BoAGhAaIBowGkAD0BpQDmAaYBpwBEAGkBqAGpAaoBqwGsAa0AawGuAa8BsAGxAbIBswBsAbQAagG1AbYBtwG4AG4BuQBtAKABugBFAbsARgD+AQAAbwG8Ab0BvgBHAOoBvwEBAcABwQHCAEgAcAHDAcQBxQByAcYBxwHIAckBygHLAHMBzAHNAHEBzgHPAdAB0QHSAdMB1AHVAEkB1gBKAPkB1wHYAdkB2gHbAEsB3AHdAd4B3wBMANcAdAHgAHYB4QB3AeIB4wHkAHUB5QHmAecB6AHpAE0B6gHrAE4B7AHtAE8B7gHvAfAB8QHyAfMA4wBQAfQB9QBRAfYB9wH4AfkB+gH7AfwAeABSAHkB/QB7Af4B/wIAAgECAgIDAHwCBAIFAgYAegIHAggCCQIKAgsCDAINAg4CDwIQAhECEgITAKECFAB9AhUCFgIXALEAUwIYAO4AVABVAhkCGgIbAhwCHQIeAh8AVgIgAiEA5QIiAPwCIwIkAiUCJgInAIkAVwIoAikCKgIrAiwCLQIuAi8AWAB+AjAAgAIxAIECMgB/AjMCNAI1AjYCNwI4AjkCOgI7AjwCPQI+Aj8CQAJBAFkAWgJCAkMCRAJFAFsAXADsAkYAugJHAkgCSQJKAksCTABdAk0A5wJOAk8CUAJRAlICUwJUAlUCVgJXAMAAwQJYAlkCWgJbAlwCXQJeAl8CYAJhAmICYwJkAmUCZgJnAmgCaQJqAmsCbAJtAm4CbwJwAnECcgJzAnQCdQJ2AncCeAJ5AnoCewJ8An0CfgJ/AoACgQKCAoMChAKFAoYChwKIAokCigKLAowCjQKOAo8CkAKRApICkwKUApUClgKXApgCmQKaApsCnAKdAp4CnwKgAqECogKjAqQCpQKmAqcCqAKpAqoCqwKsAq0CrgKvArACsQKyArMCtAK1ArYCtwK4ArkCugK7ArwCvQK+Ar8CwALBAsICwwLEAsUCxgLHAsgCyQLKAssCzALNAs4CzwLQAtEC0gLTAtQC1QLWAtcC2ALZAtoC2wLcAt0C3gLfAuAC4QLiAuMC5ALlAuYC5wLoAukC6gLrAuwC7QLuAu8C8ALxAvIC8wL0AvUC9gL3AvgC+QL6AvsC/AL9Av4C/wMAAwEDAgMDAwQDBQMGAwcDCAMJAwoDCwMMAw0DDgMPAxADEQMSAxMDFAMVAxYDFwMYAxkDGgMbAxwDHQMeAx8DIAMhAyIDIwMkAyUDJgMnAygDKQMqAysDLAMtAy4DLwMwAzEDMgMzAzQDNQM2AzcDOAM5AzoDOwM8Az0DPgM/A0ADQQNCA0MDRANFAJ0AngNGA0cAmwATABQAFQAWABcAGAAZABoAGwAcA0gDSQNKA0sDTANNA04DTwNQA1EDUgNTA1QDVQNWA1cDWANZA1oDWwNcA10DXgNfA2ADYQNiA2MDZANlA2YDZwNoA2kDagC8APQA9QD2A2sDbANtA24DbwNwA3EDcgNzA3QDdQANAD8AwwCHAB0ADwCrAAQAowAGABEAIgCiAAUACgAeABIAQgN2A3cDeAN5A3oDewN8A30AXgBgAD4AQAALAAwDfgN/A4ADgQOCA4MAswCyA4QDhQAQA4YDhwOIA4kDigOLAKkAqgC+AL8AxQC0ALUAtgC3AMQDjAONA44DjwOQA5EDkgOTA5QDlQOWA5cDmAOZA5oDmwOcA50DngOfA6ADoQOiA6MDpAOlA6YDpwOoA6kDqgOrAAMDrAOtA64DrwOwAIQDsQC9AAcDsgOzAKYA9wO0A7UDtgO3A7gDuQO6A7sDvAO9AIUDvgCWA78DwAAOAO8A8AC4ACAAjwAhAB8AlQCUAJMApwBhAKQAkgPBAJwDwgPDAJoAmQClA8QAmAAIAMYAuQAjAAkAiACGAIsAigCMAIMAXwDoAIIDxQDCA8YDxwBBA8gDyQPKA8sDzAPNA84DzwPQA9ED0gPTA9QD1QPWA9cD2APZA9oD2wPcA90D3gPfA+AD4QPiA+MD5APlA+YD5wPoA+kD6gPrA+wD7QPuA+8D8APxA/ID8wP0A/UD9gP3A/gD+QP6A/sD/AP9A/4D/wQABAEEAgQDBAQEBQQGBAcECAQJBAoECwQMBA0EDgQPBBAEEQQSBBMEFAQVBBYEFwQYBBkEGgQbBBwEHQQeAI0A2wDhAN4A2ACOANwAQwDfANoA4ADdANkEHwQgBCEEIgQjBCQEJQQmBkFicmV2ZQd1bmkxRUFFB3VuaTFFQjYHdW5pMUVCMAd1bmkxRUIyB3VuaTFFQjQHdW5pMUVBNAd1bmkxRUFDB3VuaTFFQTYHdW5pMUVBOAd1bmkxRUFBB3VuaTAyMDAHdW5pMUVBMAd1bmkxRUEyB3VuaTAyMDIHQW1hY3JvbgdBb2dvbmVrCkFyaW5nYWN1dGUHQUVhY3V0ZQd1bmkxRTAyB3VuaTFFMDgLQ2NpcmN1bWZsZXgKQ2RvdGFjY2VudAZEY2Fyb24GRGNyb2F0B3VuaTFFMEEHdW5pMUUwQwd1bmkxRTBFBkVicmV2ZQZFY2Fyb24HdW5pMUUxQwd1bmkxRUJFB3VuaTFFQzYHdW5pMUVDMAd1bmkxRUMyB3VuaTFFQzQHdW5pMDIwNApFZG90YWNjZW50B3VuaTFFQjgHdW5pMUVCQQd1bmkwMjA2B0VtYWNyb24HdW5pMUUxNgd1bmkxRTE0B0VvZ29uZWsHdW5pMUVCQwd1bmkxRTFFBkdjYXJvbgtHY2lyY3VtZmxleAd1bmkwMTIyCkdkb3RhY2NlbnQHdW5pMUUyMARIYmFyB3VuaTFFMkELSGNpcmN1bWZsZXgHdW5pMUUyNAZJYnJldmUHdW5pMDIwOAd1bmkxRTJFB3VuaTFFQ0EHdW5pMUVDOAd1bmkwMjBBB0ltYWNyb24HSW9nb25lawZJdGlsZGULSmNpcmN1bWZsZXgHdW5pMDEzNgZMYWN1dGUGTGNhcm9uB3VuaTAxM0IETGRvdAd1bmkxRTM2B3VuaTFFM0EHdW5pMUU0MAd1bmkxRTQyBk5hY3V0ZQZOY2Fyb24HdW5pMDE0NQd1bmkxRTQ0B3VuaTFFNDYDRW5nB3VuaTFFNDgGT2JyZXZlB3VuaTFFRDAHdW5pMUVEOAd1bmkxRUQyB3VuaTFFRDQHdW5pMUVENgd1bmkwMjBDB3VuaTAyMkEHdW5pMDIzMAd1bmkxRUNDB3VuaTFFQ0UFT2hvcm4HdW5pMUVEQQd1bmkxRUUyB3VuaTFFREMHdW5pMUVERQd1bmkxRUUwDU9odW5nYXJ1bWxhdXQHdW5pMDIwRQdPbWFjcm9uB3VuaTFFNTIHdW5pMUU1MAd1bmkwMUVBC09zbGFzaGFjdXRlB3VuaTFFNEMHdW5pMUU0RQd1bmkwMjJDB3VuaTFFNTYGUmFjdXRlBlJjYXJvbgd1bmkwMTU2B3VuaTAyMTAHdW5pMUU1QQd1bmkwMjEyB3VuaTFFNUUGU2FjdXRlB3VuaTFFNjQHdW5pMUU2NgtTY2lyY3VtZmxleAd1bmkwMjE4B3VuaTFFNjAHdW5pMUU2Mgd1bmkxRTY4B3VuaTFFOUUHdW5pMDE4RgRUYmFyBlRjYXJvbgd1bmkwMTYyB3VuaTAyMUEHdW5pMUU2QQd1bmkxRTZDB3VuaTFFNkUGVWJyZXZlB3VuaTAyMTQHdW5pMUVFNAd1bmkxRUU2BVVob3JuB3VuaTFFRTgHdW5pMUVGMAd1bmkxRUVBB3VuaTFFRUMHdW5pMUVFRQ1VaHVuZ2FydW1sYXV0B3VuaTAyMTYHVW1hY3Jvbgd1bmkxRTdBB1VvZ29uZWsFVXJpbmcGVXRpbGRlB3VuaTFFNzgGV2FjdXRlC1djaXJjdW1mbGV4CVdkaWVyZXNpcwZXZ3JhdmULWWNpcmN1bWZsZXgHdW5pMUU4RQd1bmkxRUY0BllncmF2ZQd1bmkxRUY2B3VuaTAyMzIHdW5pMUVGOAZaYWN1dGUKWmRvdGFjY2VudAd1bmkxRTkyBmFicmV2ZQd1bmkxRUFGB3VuaTFFQjcHdW5pMUVCMQd1bmkxRUIzB3VuaTFFQjUHdW5pMUVBNQd1bmkxRUFEB3VuaTFFQTcHdW5pMUVBOQd1bmkxRUFCB3VuaTAyMDEHdW5pMUVBMQd1bmkxRUEzB3VuaTAyMDMHYW1hY3Jvbgdhb2dvbmVrCmFyaW5nYWN1dGUHYWVhY3V0ZQd1bmkxRTAzB3VuaTFFMDkLY2NpcmN1bWZsZXgKY2RvdGFjY2VudAZkY2Fyb24HdW5pMUUwQgd1bmkxRTBEB3VuaTFFMEYGZWJyZXZlBmVjYXJvbgd1bmkxRTFEB3VuaTFFQkYHdW5pMUVDNwd1bmkxRUMxB3VuaTFFQzMHdW5pMUVDNQd1bmkwMjA1CmVkb3RhY2NlbnQHdW5pMUVCOQd1bmkxRUJCB3VuaTAyMDcHZW1hY3Jvbgd1bmkxRTE3B3VuaTFFMTUHZW9nb25lawd1bmkxRUJEB3VuaTAyNTkHdW5pMUUxRgZnY2Fyb24LZ2NpcmN1bWZsZXgHdW5pMDEyMwpnZG90YWNjZW50B3VuaTFFMjEEaGJhcgd1bmkxRTJCC2hjaXJjdW1mbGV4B3VuaTFFMjUGaWJyZXZlB3VuaTAyMDkHdW5pMUUyRglpLmxvY2xUUksHdW5pMUVDQgd1bmkxRUM5B3VuaTAyMEIHaW1hY3Jvbgdpb2dvbmVrBml0aWxkZQd1bmkwMjM3C2pjaXJjdW1mbGV4B3VuaTAxMzcMa2dyZWVubGFuZGljBmxhY3V0ZQZsY2Fyb24HdW5pMDEzQwRsZG90B3VuaTFFMzcHdW5pMUUzQgd1bmkxRTQxB3VuaTFFNDMGbmFjdXRlBm5jYXJvbgd1bmkwMTQ2B3VuaTFFNDUHdW5pMUU0NwNlbmcHdW5pMUU0OQZvYnJldmUHdW5pMUVEMQd1bmkxRUQ5B3VuaTFFRDMHdW5pMUVENQd1bmkxRUQ3B3VuaTAyMEQHdW5pMDIyQgd1bmkwMjMxB3VuaTFFQ0QHdW5pMUVDRgVvaG9ybgd1bmkxRURCB3VuaTFFRTMHdW5pMUVERAd1bmkxRURGB3VuaTFFRTENb2h1bmdhcnVtbGF1dAd1bmkwMjBGB29tYWNyb24HdW5pMUU1Mwd1bmkxRTUxB3VuaTAxRUILb3NsYXNoYWN1dGUHdW5pMUU0RAd1bmkxRTRGB3VuaTAyMkQHdW5pMUU1NwZyYWN1dGUGcmNhcm9uB3VuaTAxNTcHdW5pMDIxMQd1bmkxRTVCB3VuaTAyMTMHdW5pMUU1RgZzYWN1dGUHdW5pMUU2NQd1bmkxRTY3C3NjaXJjdW1mbGV4B3VuaTAyMTkHdW5pMUU2MQd1bmkxRTYzB3VuaTFFNjkEdGJhcgZ0Y2Fyb24HdW5pMDE2Mwd1bmkwMjFCB3VuaTFFOTcHdW5pMUU2Qgd1bmkxRTZEB3VuaTFFNkYGdWJyZXZlB3VuaTAyMTUHdW5pMUVFNQd1bmkxRUU3BXVob3JuB3VuaTFFRTkHdW5pMUVGMQd1bmkxRUVCB3VuaTFFRUQHdW5pMUVFRg11aHVuZ2FydW1sYXV0B3VuaTAyMTcHdW1hY3Jvbgd1bmkxRTdCB3VvZ29uZWsFdXJpbmcGdXRpbGRlB3VuaTFFNzkGd2FjdXRlC3djaXJjdW1mbGV4CXdkaWVyZXNpcwZ3Z3JhdmULeWNpcmN1bWZsZXgHdW5pMUU4Rgd1bmkxRUY1BnlncmF2ZQd1bmkxRUY3B3VuaTAyMzMHdW5pMUVGOQZ6YWN1dGUKemRvdGFjY2VudAd1bmkxRTkzA2NfaANjX2sDY190A2ZfZgVmX2ZfaQVmX2ZfbANmX3QDZl95A3NfdAN0X3QDdF95D2dlcm1hbmRibHMuc21jcAZhLnNtY3ALYWFjdXRlLnNtY3ALYWJyZXZlLnNtY3AMdW5pMUVBRi5zbWNwDHVuaTFFQjcuc21jcAx1bmkxRUIxLnNtY3AMdW5pMUVCMy5zbWNwDHVuaTFFQjUuc21jcBBhY2lyY3VtZmxleC5zbWNwDHVuaTFFQTUuc21jcAx1bmkxRUFELnNtY3AMdW5pMUVBNy5zbWNwDHVuaTFFQTkuc21jcAx1bmkxRUFCLnNtY3AMdW5pMDIwMS5zbWNwDmFkaWVyZXNpcy5zbWNwDHVuaTFFQTEuc21jcAthZ3JhdmUuc21jcAx1bmkxRUEzLnNtY3AMdW5pMDIwMy5zbWNwDGFtYWNyb24uc21jcAxhb2dvbmVrLnNtY3AKYXJpbmcuc21jcA9hcmluZ2FjdXRlLnNtY3ALYXRpbGRlLnNtY3AHYWUuc21jcAxhZWFjdXRlLnNtY3AGYi5zbWNwEG9yZGZlbWluaW5lLnNtY3ARb3JkbWFzY3VsaW5lLnNtY3AMdW5pMUUwMy5zbWNwBmMuc21jcAtjYWN1dGUuc21jcAtjY2Fyb24uc21jcA1jY2VkaWxsYS5zbWNwDHVuaTFFMDkuc21jcBBjY2lyY3VtZmxleC5zbWNwD2Nkb3RhY2NlbnQuc21jcAZkLnNtY3AIZXRoLnNtY3ALZGNhcm9uLnNtY3ALZGNyb2F0LnNtY3AMdW5pMUUwQi5zbWNwDHVuaTFFMEQuc21jcAx1bmkxRTBGLnNtY3AGZS5zbWNwC2VhY3V0ZS5zbWNwC2VicmV2ZS5zbWNwC2VjYXJvbi5zbWNwDHVuaTFFMUQuc21jcBBlY2lyY3VtZmxleC5zbWNwDHVuaTFFQkYuc21jcAx1bmkxRUM3LnNtY3AMdW5pMUVDMS5zbWNwDHVuaTFFQzMuc21jcAx1bmkxRUM1LnNtY3AMdW5pMDIwNS5zbWNwDmVkaWVyZXNpcy5zbWNwD2Vkb3RhY2NlbnQuc21jcAx1bmkxRUI5LnNtY3ALZWdyYXZlLnNtY3AMdW5pMUVCQi5zbWNwDHVuaTAyMDcuc21jcAxlbWFjcm9uLnNtY3AMdW5pMUUxNy5zbWNwDHVuaTFFMTUuc21jcAxlb2dvbmVrLnNtY3AMdW5pMUVCRC5zbWNwDHVuaTAyNTkuc21jcAZmLnNtY3AMdW5pMUUxRi5zbWNwBmcuc21jcAtnYnJldmUuc21jcAtnY2Fyb24uc21jcBBnY2lyY3VtZmxleC5zbWNwDHVuaTAxMjMuc21jcA9nZG90YWNjZW50LnNtY3AMdW5pMUUyMS5zbWNwBmguc21jcAloYmFyLnNtY3AMdW5pMUUyQi5zbWNwEGhjaXJjdW1mbGV4LnNtY3AMdW5pMUUyNS5zbWNwBmkuc21jcAtpYWN1dGUuc21jcAtpYnJldmUuc21jcBBpY2lyY3VtZmxleC5zbWNwDHVuaTAyMDkuc21jcA5pZGllcmVzaXMuc21jcAx1bmkxRTJGLnNtY3AOaS5sb2NsVFJLLnNtY3AMdW5pMUVDQi5zbWNwC2lncmF2ZS5zbWNwDHVuaTFFQzkuc21jcAx1bmkwMjBCLnNtY3AMaW1hY3Jvbi5zbWNwDGlvZ29uZWsuc21jcAtpdGlsZGUuc21jcAZqLnNtY3AQamNpcmN1bWZsZXguc21jcAZrLnNtY3AMdW5pMDEzNy5zbWNwEWtncmVlbmxhbmRpYy5zbWNwBmwuc21jcAtsYWN1dGUuc21jcAtsY2Fyb24uc21jcAx1bmkwMTNDLnNtY3AJbGRvdC5zbWNwDHVuaTFFMzcuc21jcAx1bmkxRTNCLnNtY3ALbHNsYXNoLnNtY3AGbS5zbWNwDHVuaTFFNDEuc21jcAx1bmkxRTQzLnNtY3AGbi5zbWNwC25hY3V0ZS5zbWNwC25jYXJvbi5zbWNwDHVuaTAxNDYuc21jcAx1bmkxRTQ1LnNtY3AMdW5pMUU0Ny5zbWNwCGVuZy5zbWNwDHVuaTFFNDkuc21jcAtudGlsZGUuc21jcAZvLnNtY3ALb2FjdXRlLnNtY3ALb2JyZXZlLnNtY3AQb2NpcmN1bWZsZXguc21jcAx1bmkxRUQxLnNtY3AMdW5pMUVEOS5zbWNwDHVuaTFFRDMuc21jcAx1bmkxRUQ1LnNtY3AMdW5pMUVENy5zbWNwDHVuaTAyMEQuc21jcA5vZGllcmVzaXMuc21jcAx1bmkwMjJCLnNtY3AMdW5pMDIzMS5zbWNwDHVuaTFFQ0Quc21jcAtvZ3JhdmUuc21jcAx1bmkxRUNGLnNtY3AKb2hvcm4uc21jcAx1bmkxRURCLnNtY3AMdW5pMUVFMy5zbWNwDHVuaTFFREQuc21jcAx1bmkxRURGLnNtY3AMdW5pMUVFMS5zbWNwEm9odW5nYXJ1bWxhdXQuc21jcAx1bmkwMjBGLnNtY3AMb21hY3Jvbi5zbWNwDHVuaTFFNTMuc21jcAx1bmkxRTUxLnNtY3AMdW5pMDFFQi5zbWNwC29zbGFzaC5zbWNwEG9zbGFzaGFjdXRlLnNtY3ALb3RpbGRlLnNtY3AMdW5pMUU0RC5zbWNwDHVuaTFFNEYuc21jcAx1bmkwMjJELnNtY3AHb2Uuc21jcAZwLnNtY3AMdW5pMUU1Ny5zbWNwCnRob3JuLnNtY3AGcS5zbWNwBnIuc21jcAtyYWN1dGUuc21jcAtyY2Fyb24uc21jcAx1bmkwMTU3LnNtY3AMdW5pMDIxMS5zbWNwDHVuaTFFNUIuc21jcAx1bmkwMjEzLnNtY3AMdW5pMUU1Ri5zbWNwBnMuc21jcAtzYWN1dGUuc21jcAx1bmkxRTY1LnNtY3ALc2Nhcm9uLnNtY3AMdW5pMUU2Ny5zbWNwDXNjZWRpbGxhLnNtY3AQc2NpcmN1bWZsZXguc21jcAx1bmkwMjE5LnNtY3AMdW5pMUU2MS5zbWNwDHVuaTFFNjMuc21jcAx1bmkxRTY5LnNtY3AGdC5zbWNwCXRiYXIuc21jcAt0Y2Fyb24uc21jcAx1bmkwMTYzLnNtY3AMdW5pMDIxQi5zbWNwDHVuaTFFNkIuc21jcAx1bmkxRTZELnNtY3AMdW5pMUU2Ri5zbWNwBnUuc21jcAt1YWN1dGUuc21jcAt1YnJldmUuc21jcBB1Y2lyY3VtZmxleC5zbWNwDHVuaTAyMTUuc21jcA51ZGllcmVzaXMuc21jcAx1bmkxRUU1LnNtY3ALdWdyYXZlLnNtY3AMdW5pMUVFNy5zbWNwCnVob3JuLnNtY3AMdW5pMUVFOS5zbWNwDHVuaTFFRjEuc21jcAx1bmkxRUVCLnNtY3AMdW5pMUVFRC5zbWNwDHVuaTFFRUYuc21jcBJ1aHVuZ2FydW1sYXV0LnNtY3AMdW5pMDIxNy5zbWNwDHVtYWNyb24uc21jcAx1bmkxRTdCLnNtY3AMdW9nb25lay5zbWNwCnVyaW5nLnNtY3ALdXRpbGRlLnNtY3AMdW5pMUU3OS5zbWNwBnYuc21jcAZ3LnNtY3ALd2FjdXRlLnNtY3AQd2NpcmN1bWZsZXguc21jcA53ZGllcmVzaXMuc21jcAt3Z3JhdmUuc21jcAZ4LnNtY3AGeS5zbWNwC3lhY3V0ZS5zbWNwEHljaXJjdW1mbGV4LnNtY3AOeWRpZXJlc2lzLnNtY3AMdW5pMUU4Ri5zbWNwDHVuaTFFRjUuc21jcAt5Z3JhdmUuc21jcAx1bmkxRUY3LnNtY3AMdW5pMDIzMy5zbWNwDHVuaTFFRjkuc21jcAZ6LnNtY3ALemFjdXRlLnNtY3ALemNhcm9uLnNtY3APemRvdGFjY2VudC5zbWNwDHVuaTFFOTMuc21jcAd1bmkwM0E5B3VuaTAzQkMPdHdvLmRlbm9taW5hdG9yEGZvdXIuZGVub21pbmF0b3INb25lLm51bWVyYXRvcg90aHJlZS5udW1lcmF0b3IJemVyby56ZXJvCXplcm8uc3VicwhvbmUuc3Vicwh0d28uc3Vicwd1bmkyMDgwB3VuaTIwODEHdW5pMjA4Mgd1bmkyMDgzB3VuaTIwODQHdW5pMjA4NQd1bmkyMDg2B3VuaTIwODcHdW5pMjA4OAd1bmkyMDg5CnRocmVlLnN1YnMJZm91ci5zdWJzCWZpdmUuc3VicwhzaXguc3VicwpzZXZlbi5zdWJzCmVpZ2h0LnN1YnMJbmluZS5zdWJzB3VuaTIwNzAHdW5pMDBCOQd1bmkwMEIyB3VuaTAwQjMHdW5pMjA3NAd1bmkyMDc1B3VuaTIwNzYHdW5pMjA3Nwd1bmkyMDc4B3VuaTIwNzkJemVyby5zbWNwCG9uZS5zbWNwCHR3by5zbWNwCnRocmVlLnNtY3AJZm91ci5zbWNwCWZpdmUuc21jcAhzaXguc21jcApzZXZlbi5zbWNwCmVpZ2h0LnNtY3AJbmluZS5zbWNwDnplcm8uemVyby5zbWNwDmJhY2tzbGFzaC5jYXNlE3BlcmlvZGNlbnRlcmVkLmNhc2ULYnVsbGV0LmNhc2UPZXhjbGFtZG93bi5jYXNlG3BlcmlvZGNlbnRlcmVkLmxvY2xDQVQuY2FzZRFxdWVzdGlvbmRvd24uY2FzZQpzbGFzaC5jYXNlFnBlcmlvZGNlbnRlcmVkLmxvY2xDQVQOYnJhY2VsZWZ0LmNhc2UPYnJhY2VyaWdodC5jYXNlEGJyYWNrZXRsZWZ0LmNhc2URYnJhY2tldHJpZ2h0LmNhc2UOcGFyZW5sZWZ0LmNhc2UPcGFyZW5yaWdodC5jYXNlCmZpZ3VyZWRhc2gHdW5pMjAxNQd1bmkyMDEwB3VuaTAwQUQLZW1kYXNoLmNhc2ULZW5kYXNoLmNhc2ULaHlwaGVuLmNhc2UMdW5pMDBBRC5jYXNlEmd1aWxzaW5nbGxlZnQuY2FzZRNndWlsc2luZ2xyaWdodC5jYXNlDWFzdGVyaXNrLnNtY3ATcGVyaW9kY2VudGVyZWQuc21jcA5icmFjZWxlZnQuc21jcA9icmFjZXJpZ2h0LnNtY3AQYnJhY2tldGxlZnQuc21jcBFicmFja2V0cmlnaHQuc21jcAtidWxsZXQuc21jcAtlbWRhc2guc21jcAtlbmRhc2guc21jcAtleGNsYW0uc21jcA9leGNsYW1kb3duLnNtY3ALaHlwaGVuLnNtY3AbcGVyaW9kY2VudGVyZWQubG9jbENBVC5zbWNwD251bWJlcnNpZ24uc21jcA5wYXJlbmxlZnQuc21jcA9wYXJlbnJpZ2h0LnNtY3ANcXVlc3Rpb24uc21jcBFxdWVzdGlvbmRvd24uc21jcA1xdW90ZWRibC5zbWNwEXF1b3RlZGJsYmFzZS5zbWNwEXF1b3RlZGJsbGVmdC5zbWNwEnF1b3RlZGJscmlnaHQuc21jcA5xdW90ZWxlZnQuc21jcA9xdW90ZXJpZ2h0LnNtY3ATcXVvdGVzaW5nbGJhc2Uuc21jcBBxdW90ZXNpbmdsZS5zbWNwDHVuaTAwQUQuc21jcAd1bmkyMDA3B3VuaTIwMEEHdW5pMjAwOAd1bmkwMEEwB3VuaTIwMDkHdW5pMjAwQgJDUgd1bmkyMEI1DWNvbG9ubW9uZXRhcnkEZG9uZwRFdXJvB3VuaTIwQjIHdW5pMjBBRARsaXJhB3VuaTIwQkEHdW5pMjBCQwd1bmkyMEE2BnBlc2V0YQd1bmkyMEIxB3VuaTIwQkQHdW5pMjBCOQd1bmkyMEE5B3VuaTIyMTkHdW5pMjIxNQhlbXB0eXNldAd1bmkyMTI2B3VuaTIyMDYHdW5pMDBCNQd1bmkyMTEzB3VuaTIxMTYJZXN0aW1hdGVkBm1pbnV0ZQZzZWNvbmQHYXQuY2FzZQdhdC5zbWNwDmFtcGVyc2FuZC5zbWNwC2RlZ3JlZS5zbWNwDHVuaTIwQjUuc21jcBJjb2xvbm1vbmV0YXJ5LnNtY3ALZG9sbGFyLnNtY3AJZG9uZy5zbWNwCUV1cm8uc21jcApmcmFuYy5zbWNwDHVuaTIwQjIuc21jcAx1bmkyMEFELnNtY3AJbGlyYS5zbWNwDHVuaTIwQkEuc21jcAx1bmkyMEJDLnNtY3AMdW5pMjBBNi5zbWNwDHBlcmNlbnQuc21jcBBwZXJ0aG91c2FuZC5zbWNwC3Blc2V0YS5zbWNwDHVuaTIwQjEuc21jcAx1bmkyMEJELnNtY3AMdW5pMjBCOS5zbWNwDXN0ZXJsaW5nLnNtY3AMdW5pMjBBOS5zbWNwCHllbi5zbWNwC2Zsb3Jpbi5zbWNwB3VuaTAzMDgHdW5pMDMwNwlncmF2ZWNvbWIJYWN1dGVjb21iB3VuaTAzMEILdW5pMDMwQy5hbHQHdW5pMDMwMgd1bmkwMzBDB3VuaTAzMDYHdW5pMDMwQQl0aWxkZWNvbWIHdW5pMDMwNA1ob29rYWJvdmVjb21iB3VuaTAzMEYHdW5pMDMxMQd1bmkwMzEyB3VuaTAzMUIMZG90YmVsb3djb21iB3VuaTAzMjQHdW5pMDMyNgd1bmkwMzI3B3VuaTAzMjgHdW5pMDMyRQd1bmkwMzMxB3VuaTAzMzUMdW5pMDMwOC5jYXNlDHVuaTAzMDcuY2FzZQ5ncmF2ZWNvbWIuY2FzZQ5hY3V0ZWNvbWIuY2FzZQx1bmkwMzBCLmNhc2UMdW5pMDMwMi5jYXNlDHVuaTAzMEMuY2FzZQx1bmkwMzA2LmNhc2UMdW5pMDMwQS5jYXNlDnRpbGRlY29tYi5jYXNlDHVuaTAzMDQuY2FzZRJob29rYWJvdmVjb21iLmNhc2UMdW5pMDMwRi5jYXNlDHVuaTAzMTEuY2FzZQx1bmkwMzEyLmNhc2UMdW5pMDMxQi5jYXNlEWRvdGJlbG93Y29tYi5jYXNlDHVuaTAzMjQuY2FzZQx1bmkwMzI2LmNhc2UMdW5pMDMyNy5jYXNlDHVuaTAzMjguY2FzZQx1bmkwMzJFLmNhc2UMdW5pMDMzMS5jYXNlB3VuaTAyQkMHdW5pMDJCQgd1bmkwMkJBB3VuaTAyQzkHdW5pMDJDQgd1bmkwMkI5B3VuaTAyQkYHdW5pMDJCRQd1bmkwMkNBB3VuaTAyQ0MHdW5pMDJDOAt1bmkwMzA2MDMwMQt1bmkwMzA2MDMwMAt1bmkwMzA2MDMwOQt1bmkwMzA2MDMwMwt1bmkwMzAyMDMwMQt1bmkwMzAyMDMwMAt1bmkwMzAyMDMwOQt1bmkwMzAyMDMwMwAAAAABAAH//wAPAAEAAAAMAAAAAAAAAAIAVwABAAEAAQAaABoAAQAcABwAAQAeAB4AAQAlACUAAQAsACwAAQBDAEMAAQBFAEUAAQBMAEwAAQBRAFEAAQBgAGAAAQBiAGIAAQBkAGQAAQBsAGwAAQBvAG8AAQB4AHgAAQCIAIgAAQCUAJQAAQCbAJsAAQCfAJ8AAQCnAKcAAQC0ALQAAQC8ALwAAQDFAMUAAQDUANQAAQDZANoAAQDkAOQAAQDpAOkAAQECAQIAAQEEAQQAAQEGAQYAAQENAQ0AAQEUARQAAQEsASwAAQEuAS4AAQE1ATUAAQE6ATsAAQFLAUsAAQFNAU0AAQFQAVAAAQFYAVgAAQFbAVsAAQFkAWQAAQF0AXQAAQGAAYAAAQGHAYcAAQGLAYsAAQGTAZMAAQGfAZ8AAQGoAagAAQGxAbEAAQHAAcAAAQHGAcYAAQHQAdAAAQHjAeMAAQH8AfwAAQH+Af4AAQICAgIAAQIJAgkAAQIQAhAAAQIoAigAAQIqAioAAQIxAjEAAQI2AjYAAQJFAkUAAQJHAkcAAQJKAkoAAQJSAlIAAQJVAlUAAQJeAl4AAQJuAm4AAQJ6AnoAAQKBAoEAAQKFAoUAAQKNAo0AAQKYApgAAQKgAqAAAQKpAqkAAQK4ArgAAQK9Ar4AAQLIAsgAAQMkAyQAAwMnAycAAwPNA9EAAwPTA+QAAwPmA/wAAwQVBBwAAwAAAAEAAAAKACYAQAACREZMVAAObGF0bgAOAAQAAAAA//8AAgAAAAEAAmtlcm4ADm1hcmsAFAAAAAEAAAAAAAEAAQACAAY15gACAAgAAgAKHuYAAQKCAAQAAAE8A44DjgOOA44DjgOOA44DjgOOA44DjgOOA44DjgOOA44DjgOOA44DjgOOA44DjgOOA44DpAWmD3oPeg96D3oPeg96D3oI6AjoCPoP7g/uCTwJPAk8CTwJPAk8CTwJSg96D3oPeg96D3oPeg96D3oPeg96D3oPeg96D3oPeg96D3oPeg96D3oPeg96D3oPeg96D3oPeg96D3oPeg96D3oPeg96ET4RPg96D3QPdA90D3QPdA90D3QPdA90D3QPdA96D4gPiA+ID4gPiA+ID4gPog+iD6IPog+iD6IPog+iD6IPog+iD6IPog+iD6IPog+iD6IPog+iD6IPog+iD6gPqA+oD6gPqA+oD+4P+A/4D/gP+A/4D/gP+A/4D/gP+BAmET4RPhFSEVITeBN4E3gTeBN4E3gTeBBYEKYRPhE+ET4RPhE+ET4RPhE+ET4RPhE+ET4RPhE+ET4RPhE+ET4RPhE+ET4RPhE+E34TWhNaEHoQehB6EHoQehB6EHoQhBCmELQTfhN+E34TfhN+E34TfhN+E34TfhN+E34TfhN+E34TfhN+E34TfhN+E34TfhN+E34TfhN+E34TfhN+E34TfhN+ET4RUhFSEVIRRBFEEUQRRBFEEUQRRBFEEVIRUhFSEVIRUhFSEVIRUhFSEVIRUhFYE3gTeBN4E3gTeBN4E3gTeBN4EXoRehF6EXoRehF6EYQTfhN+E34TfhN+E34TfhN+E34TfhN4E1oTeBN+E3gTeBN+E4QUrhTsFSIWtBbaFuwXFhd4GcYesB6wGqAeNh6UHpQelB7GHpoexh7GHsYexh7GHsYexh6wHrAesB6wHsYexh7GHsYAAgAsAAEAGQAAABwAHAAZAB4AHgAaACUAKwAbAEMARQAiAGIAZwAlAGkAbAArAHgAmQAvAJsAnABRAJ4AngBTAKcAsQBUALMAtABfALYA5ABhAQIBDACQAQ4BDwCbARQBNACdAVABUAC+AVIBUgC/AVcBVwDAAWQBfwDBAYIBiQDdAYsBpwDlAb8BzwECAdcB2AETAdsB3AEVAd8B4QEXAgICAgEaAtYC1wEbAtkC2wEdAw8DDwEgAxIDEwEhAxgDGAEjAxsDHAEkAx4DHwEmAygDKAEoAyoDKgEpAywDLAEqAzQDNQErAzcDOQEtAzsDPgEwA0QDRwE0A1IDUwE4A1YDVgE6A2UDZQE7AAUBLP/2Akr/9gLZ/+wC2//2Axn/4gCAAS7/9gEv//YBMP/2ATH/9gEy//YBM//2ATT/9gHj/+wB5P/sAeX/7AHm/+wB5//sAej/7AHp/+wB6v/sAev/7AHs/+wB7f/sAe7/7AHv/+wB8P/sAfH/7AHy/+wB8//sAfT/7AH1/+wB9v/sAff/7AH4/+wB+f/sAfr/7AH7/+wB/P/sAf3/7AIC/+wCA//sAgT/7AIF/+wCBv/sAgf/7AII/+wCEP/2AhH/9gIS//YCE//2AhT/9gIV//YCFv/2Ahf/9gIY//YCGf/2Ahr/9gIb//YCHP/2Ah3/9gIe//YCH//2AiD/9gIh//YCIv/2AiP/9gIk//YCJf/2Aib/9gIo//YCKv/sAiv/7AIs/+wCLf/sAi7/7AIv/+wCMP/sAkr/9gJS/+wCXv/sAl//7AJg/+wCYf/sAmL/7AJj/+wCZP/sAmX/7AJm/+wCZ//sAmj/7AJp/+wCav/sAmv/7AJs/+wCbf/sAm7/7AJv/+wCcP/sAnH/7AJy/+wCc//sAnT/7AJ1/+wCdv/sAnf/7AJ4/+wCef/sAnr/7AJ7/+wCfP/sAn3/7AJ+/+wCf//sAoD/7AKE/+wCmP/2Apr/9gKb//YCnP/2Ap3/9gKe//YCn//2Ar3/9gK+//YCv//2AsD/9gLB//YCwv/2AsP/9gLE//YCxf/2Asb/9gLH//YA0AAe//YAH//2ACD/9gAh//YAIv/2ACP/9gAk//YALP/2AC3/9gAu//YAL//2ADD/9gAx//YAMv/2ADP/9gA0//YANf/2ADb/9gA3//YAOP/2ADn/9gA6//YAO//2ADz/9gA9//YAPv/2AD//9gBA//YAQf/2AEL/9gBD//YARf/2AEb/9gBH//YASP/2AEn/9gBK//YAS//2AHj/9gB5//YAev/2AHv/9gB8//YAff/2AH7/9gB///YAgP/2AIH/9gCC//YAg//2AIT/9gCF//YAhv/2AIf/9gCI//YAif/2AIr/9gCL//YAjP/2AI3/9gCO//YAj//2AJD/9gCR//YAkv/2AJP/9gCU//YAlf/2AJb/9gCX//YAmP/2AJn/9gCa//YAnv/2AQb/9gEH//YBCP/2AQn/9gEK//YBC//2AQz/9gFk//YBZf/2AWb/9gFn//YBaP/2AWn/9gFq//YBa//2AWz/9gFt//YBbv/2AW//9gFw//YBcf/2AXL/9gFz//YBdP/2AXX/9gF2//YBd//2AXj/9gF5//YBev/2AXv/9gF8//YBff/2AX7/9gF///YBgv/2AYP/9gGE//YBhf/2AYb/9gGK//YBv//2AcD/9gHB//YBwv/2AcP/9gHE//YBxv/2Acf/9gHI//YByf/2Acr/9gHL//YBzP/2Ac3/9gHO//YBz//2AdX/9gHW//YB1//2AgL/4gID/+ICBP/iAgX/4gIG/+ICB//iAgj/4gIQ//YCEf/2AhL/9gIT//YCFP/2AhX/9gIW//YCF//2Ahj/9gIZ//YCGv/2Ahv/9gIc//YCHf/2Ah7/9gIf//YCIP/2AiH/9gIi//YCI//2AiT/9gIl//YCJv/2Aij/9gIq/+ICK//iAiz/4gIt/+ICLv/iAi//4gIw/+ICXv/iAl//4gJg/+ICYf/iAmL/4gJj/+ICZP/iAmX/4gJm/+ICZ//iAmj/4gJp/+ICav/iAmv/4gJs/+ICbf/iAm7/4gJv/+ICcP/iAnH/4gJy/+ICc//iAnT/4gJ1/+ICdv/iAnf/4gJ4/+ICef/iAnr/4gJ7/+ICfP/iAn3/4gJ+/+ICf//iAoD/4gKE/+IABAJS/+cC0wAUAtb/4gLZABQAEAG//+wBwP/sAcH/7AHC/+wBw//sAcT/7AHG/+wBx//sAcj/7AHJ/+wByv/sAcv/7AHM/+wBzf/sAc7/7AHP/+wAAwEs/+wC2f/iAxn/4gGKAB7/7AAf/+wAIP/sACH/7AAi/+wAI//sACT/7AAs/+wALf/sAC7/7AAv/+wAMP/sADH/7AAy/+wAM//sADT/7AA1/+wANv/sADf/7AA4/+wAOf/sADr/7AA7/+wAPP/sAD3/7AA+/+wAP//sAED/7ABB/+wAQv/sAEP/7ABF/+wARv/sAEf/7ABI/+wASf/sAEr/7ABL/+wAeP/sAHn/7AB6/+wAe//sAHz/7AB9/+wAfv/sAH//7ACA/+wAgf/sAIL/7ACD/+wAhP/sAIX/7ACG/+wAh//sAIj/7ACJ/+wAiv/sAIv/7ACM/+wAjf/sAI7/7ACP/+wAkP/sAJH/7ACS/+wAk//sAJT/7ACV/+wAlv/sAJf/7ACY/+wAmf/sAJr/7ACe/+wAtP/iALb/4gC3/+IAuP/iALn/4gC6/+IAu//iALz/4gC9/+IAvv/iAL//4gDA/+IAwf/iAML/4gDD/+IAxP/iAMX/4gDG/+IAx//iAMj/4gDJ/+IAyv/iAMv/4gDM/+IAzf/iAM7/4gDP/+IA0P/iANH/4gDS/+IA0//iANT/4gDV/+IA1v/iANf/4gDY/+IA2v/YANv/2ADc/9gA3f/YAN7/2ADf/9gA4P/YAOH/2ADi/9gA4//YAOn/9gDq//YA6//2AOz/9gDt//YA7v/2AO//9gDw//YA8f/2APL/9gDz//YA9P/2APX/9gD2//YA9//2APj/9gD5//YA+v/2APv/9gD8//YA/f/2AP7/9gD///YBAP/2AQH/9gEG//YBB//2AQj/9gEJ//YBCv/2AQv/9gEM//YBDf/2AQ//9gEQ//YBEf/2ARL/9gET//YBFP/2ARX/9gEW//YBF//2ARj/9gEZ//YBGv/2ARv/9gEc//YBHf/2AR7/9gEf//YBIP/2ASH/9gEi//YBI//2AST/9gEl//YBJv/2ASf/9gEo//YBKf/2ASr/9gEs//YBLv/2AS//9gEw//YBMf/2ATL/9gEz//YBNP/2AWT/9gFl//YBZv/2AWf/9gFo//YBaf/2AWr/9gFr//YBbP/2AW3/9gFu//YBb//2AXD/9gFx//YBcv/2AXP/9gF0//YBdf/2AXb/9gF3//YBeP/2AXn/9gF6//YBe//2AXz/9gF9//YBfv/2AX//9gGC//YBg//2AYT/9gGF//YBhv/2AYr/9gGT//YBlP/2AZX/9gGW//YBl//2AZj/9gGZ//YBmv/2AZv/9gGc//YBnf/2AZ//7AGg/+wBof/sAaL/7AGj/+wBpP/sAaX/7AGm/+wBp//sAaj/9gGp//YBqv/2Aav/9gGs//YBrf/2Aa7/9gGv//YBsP/2AbH/9gGy//YBs//2AbT/9gG1//YBtv/2Abf/9gG4//YBuf/2Abr/9gG7//YBvP/2Ab3/9gG+//YBv//sAcD/7AHB/+wBwv/sAcP/7AHE/+wBxv/sAcf/7AHI/+wByf/sAcr/7AHL/+wBzP/sAc3/7AHO/+wBz//sAdX/9gHW//YB1//2Ad//9gHg/+wB4f/sAgL/7AID/+wCBP/sAgX/7AIG/+wCB//sAgj/7AIq/+wCK//sAiz/7AIt/+wCLv/sAi//7AIw/+wCSv/2Al7/7AJf/+wCYP/sAmH/7AJi/+wCY//sAmT/7AJl/+wCZv/sAmf/7AJo/+wCaf/sAmr/7AJr/+wCbP/sAm3/7AJu/+wCb//sAnD/7AJx/+wCcv/sAnP/7AJ0/+wCdf/sAnb/7AJ3/+wCeP/sAnn/7AJ6/+wCe//sAnz/7AJ9/+wCfv/sAn//7AKA/+wChP/sApj/7AKa/+wCm//sApz/7AKd/+wCnv/sAp//7AKg//YCof/2AqL/9gKj//YCpP/2AqX/9gKm//YCp//2Aqj/9gKp//YCqv/2Aqv/9gKs//YCrf/2Aq7/9gKv//YCsP/2ArH/9gKy//YCs//2ArT/9gK1//YCtv/2Arf/7AK4/+wCuf/sArr/7AK7/+wCvP/sAr7/7AK//+wCwP/sAsH/7ALC/+wCw//sAsT/7ALF/+wCxv/sAsf/7AMZ/+IDG//YAxz/2ANE/9gDRf/YA0b/2ANH/9gDsf/YA7L/2AABAxn/9gADAGz/7AJS//EDGf/2AAYAbP/iAf7/9gJS/84C0wAUAtb/zgLZABQAAQBs/+IAEQBs/+IBLP/2Af7/7AIJ/+wCNv/iAkf/4gJK/+ICUv/OAlX/9gKB/+IC0wAeAtb/xALY/+IC2QAeAtr/7ALb//YDB/+6AAIBLP/2Akr/9gALAGz/2AEs/+wBnv/YAf7/zgIJ/84CNv/OAkf/zgJK/84CUv+wAlX/zgKB/84ADAEs/+wBn//sAaD/7AGh/+wBov/sAaP/7AGk/+wBpf/sAab/7AGn/+wB4P/sAeH/7AAIAxv/9gMc//YDRP/2A0X/9gNG//YDR//2A7H/9gOy//YAAgFXABQDHwAKAAgDG//iAxz/4gNE/+IDRf/iA0b/4gNH/+IDsf/iA7L/4gADAFEAMAMVACgDGQBCACIBLAAKAVcADwGfABQBoAAUAaEAFAGiABQBowAUAaQAFAGlABQBpgAUAacAFAG/AAoBwAAKAcEACgHCAAoBwwAKAcQACgHGAAoBxwAKAcgACgHJAAoBygAKAcsACgHMAAoBzQAKAc4ACgHPAAoB0AAKAdEACgHSAAoB0wAKAdQACgHgABQB4QAUAAEBVwAKAAMBVwAUAx7/xAMf/+IAAQMe/+wACAMb/+wDHP/sA0T/7ANF/+wDRv/sA0f/7AOx/+wDsv/sAAIBVwAKAx7/ugB1AOn/9gDq//YA6//2AOz/9gDt//YA7v/2AO//9gDw//YA8f/2APL/9gDz//YA9P/2APX/9gD2//YA9//2APj/9gD5//YA+v/2APv/9gD8//YA/f/2AP7/9gD///YBAP/2AQH/9gEG/+IBB//iAQj/4gEJ/+IBCv/iAQv/4gEM/+IBDf/iAQ//4gEQ/+IBEf/iARL/4gET/+IBFP/iARX/4gEW/+IBF//iARj/4gEZ/+IBGv/iARv/4gEc/+IBHf/iAR7/4gEf/+IBIP/iASH/4gEi/+IBI//iAST/4gEl/+IBJv/iASf/4gEo/+IBKf/iASr/4gEu//EBL//xATD/8QEx//EBMv/xATP/8QE0//EBZP/iAWX/4gFm/+IBZ//iAWj/4gFp/+IBav/iAWv/4gFs/+IBbf/iAW7/4gFv/+IBcP/iAXH/4gFy/+IBc//iAXT/4gF1/+IBdv/iAXf/4gF4/+IBef/iAXr/4gF7/+IBfP/iAX3/4gF+/+IBf//iAYL/4gGD/+IBhP/iAYX/4gGG/+IBiv/iAZP/9gGU//YBlf/2AZb/9gGX//YBmP/2AZn/9gGa//YBm//2AZz/9gGd//YB1f/iAdb/4gHX/+IB3//2AAcBVwAeAw8AHgMVABQDGQAUAx7/zgMf/+IDqQAKAAEBVwAUAAEDHv/YAEoCAv/2AgP/9gIE//YCBf/2Agb/9gIH//YCCP/2AhD/9gIR//YCEv/2AhP/9gIU//YCFf/2Ahb/9gIX//YCGP/2Ahn/9gIa//YCG//2Ahz/9gId//YCHv/2Ah//9gIg//YCIf/2AiL/9gIj//YCJP/2AiX/9gIm//YCKP/2Air/9gIr//YCLP/2Ai3/9gIu//YCL//2AjD/9gJe//YCX//2AmD/9gJh//YCYv/2AmP/9gJk//YCZf/2Amb/9gJn//YCaP/2Amn/9gJq//YCa//2Amz/9gJt//YCbv/2Am//9gJw//YCcf/2AnL/9gJz//YCdP/2AnX/9gJ2//YCd//2Anj/9gJ5//YCev/2Anv/9gJ8//YCff/2An7/9gJ///YCgP/2AoT/9gAPAtn/7AMP/84DNAAUAzUAFAM3ABQDOAAUAzkAFAM7ABQDPAAUAz0AFAM+ABQDUgAUA1MAFANWABQDZQAUAA0DNAAKAzUACgM3AAoDOAAKAzkACgM7AAoDPAAKAz0ACgM+AAoDUgAKA1MACgNWAAoDZQAKAGQAAf/YAAL/2AAD/9gABP/YAAX/2AAG/9gAB//YAAj/2AAJ/9gACv/YAAv/2AAM/9gADf/YAA7/2AAP/9gAEP/YABH/2AAS/9gAE//YABT/2AAV/9gAFv/YABf/2AAY/9gAGf/YABr/2AAb/9gAHv/2AB//9gAg//YAIf/2ACL/9gAj//YAJP/2AEX/9gBG//YAR//2AEj/9gBJ//YASv/2AEv/9gBg/84AYf/OAHj/9gB5//YAev/2AHv/9gB8//YAff/2AH7/9gB///YAgP/2AIH/9gCC//YAg//2AIT/9gCF//YAhv/2AIf/9gCI//YAif/2AIr/9gCL//YAjP/2AI3/9gCO//YAj//2AJD/9gCR//YAkv/2AJP/9gCU//YAlf/2AJb/9gCX//YAmP/2AJn/9gCa//YAnv/2Atb/zgMPAAoDE/+mAxT/pgMY/6YDHv+SAzT/4gM1/+IDN//iAzj/4gM5/+IDO//iAzz/4gM9/+IDPv/iA0P/pgNI/6YDUv/iA1P/4gNW/+IDZf/iAAkDD//iAxv/7AMc/+wDRP/sA0X/7ANG/+wDR//sA7H/7AOy/+wABABg//YAYf/2Aw//9gMe/+IACgLT/7oC1v/YAtj/4gLZ/8QC2v/YAtv/zgMP/3QDKQAUAysAFAMtABQAGAC0//YAtv/2ALf/9gC4//YAuf/2ALr/9gC7//YA0//xANT/8QDV//EA1v/xANf/8QDY//EA2v/sANv/7ADc/+wA3f/sAN7/7ADf/+wA4P/sAOH/7ADi/+wA4//sAx7/7ACTALT/zgC2/84At//OALj/zgC5/84Auv/OALv/zgDT/9gA1P/YANX/2ADW/9gA1//YANj/2ADa/8QA2//EANz/xADd/8QA3v/EAN//xADg/8QA4f/EAOL/xADj/8QBv//EAcD/xAHB/8QBwv/EAcP/xAHE/8QBxv/EAcf/xAHI/8QByf/EAcr/xAHL/8QBzP/EAc3/xAHO/8QBz//EAgL/7AID/+wCBP/sAgX/7AIG/+wCB//sAgj/7AIq/+wCK//sAiz/7AIt/+wCLv/sAi//7AIw/+wCXv/sAl//7AJg/+wCYf/sAmL/7AJj/+wCZP/sAmX/7AJm/+wCZ//sAmj/7AJp/+wCav/sAmv/7AJs/+wCbf/sAm7/7AJv/+wCcP/sAnH/7AJy/+wCc//sAnT/7AJ1/+wCdv/sAnf/7AJ4/+wCef/sAnr/7AJ7/+wCfP/sAn3/7AJ+/+wCf//sAoD/7AKE/+wCmP+6Apr/ugKb/7oCnP+6Ap3/ugKe/7oCn/+6AqD/4gKh/+ICov/iAqP/4gKk/+ICpf/iAqb/4gKn/+ICqP/iAqn/4gKq/+ICq//iAqz/4gKt/+ICrv/iAq//4gKw/+ICsf/iArL/4gKz/+ICtP/iArX/4gK2/+ICt/+wArj/sAK5/7ACuv+wArv/sAK8/7ACvv+mAr//pgLA/6YCwf+mAsL/pgLD/6YCxP+mAsX/pgLG/6YCx/+mAtP/xALW//YC2f/EAtv/9gMb/7oDHP+6A0T/ugNF/7oDRv+6A0f/ugOx/7oDsv+6ADYAHv/sAB//7AAg/+wAIf/sACL/7AAj/+wAJP/sAEX/7ABG/+wAR//sAEj/7ABJ/+wASv/sAEv/7AB4/+wAef/sAHr/7AB7/+wAfP/sAH3/7AB+/+wAf//sAID/7ACB/+wAgv/sAIP/7ACE/+wAhf/sAIb/7ACH/+wAiP/sAIn/7ACK/+wAi//sAIz/7ACN/+wAjv/sAI//7ACQ/+wAkf/sAJL/7ACT/+wAlP/sAJX/7ACW/+wAl//sAJj/7ACZ/+wAmv/sAJ7/7ALT/7oDKf/sAyv/7AMt/+wA5QDp/8QA6v/EAOv/xADs/8QA7f/EAO7/xADv/8QA8P/EAPH/xADy/8QA8//EAPT/xAD1/8QA9v/EAPf/xAD4/8QA+f/EAPr/xAD7/8QA/P/EAP3/xAD+/8QA///EAQD/xAEB/8QBBv+6AQf/ugEI/7oBCf+6AQr/ugEL/7oBDP+6AQ3/sAEP/7ABEP+wARH/sAES/7ABE/+wART/ugEV/7oBFv+6ARf/ugEY/7oBGf+6ARr/ugEb/7oBHP+6AR3/ugEe/7oBH/+6ASD/ugEh/7oBIv+6ASP/ugEk/7oBJf+6ASb/ugEn/7oBKP+6ASn/ugEq/7oBLP/iAS7/nAEv/5wBMP+cATH/nAEy/5wBM/+cATT/nAFY/9gBWv/YAVv/2AFc/9gBXf/YAV7/2AFf/9gBYP/YAWH/2AFi/9gBY//YAWT/ugFl/7oBZv+6AWf/ugFo/7oBaf+6AWr/ugFr/7oBbP+6AW3/ugFu/7oBb/+6AXD/ugFx/7oBcv+6AXP/ugF0/7oBdf+6AXb/ugF3/7oBeP+6AXn/ugF6/7oBe/+6AXz/ugF9/7oBfv+6AX//ugGC/7oBg/+6AYT/ugGF/7oBhv+6AYf/2AGK/7ABi//YAYz/2AGN/9gBjv/YAY//2AGQ/9gBkf/YAZL/2AGT/8QBlP/EAZX/xAGW/8QBl//EAZj/xAGZ/8QBmv/EAZv/xAGc/8QBnf/EAZ//7AGg/+wBof/sAaL/7AGj/+wBpP/sAaX/7AGm/+wBp//sAaj/2AGp/9gBqv/YAav/2AGs/9gBrf/YAa7/2AGv/9gBsP/YAbH/2AGy/9gBs//YAbT/2AG1/9gBtv/YAbf/2AG4/9gBuf/YAbr/2AG7/9gBvP/YAb3/2AG+/9gBv//sAcD/7AHB/+wBwv/sAcP/7AHE/+wBxf/sAcb/7AHH/+wByP/sAcn/7AHK/+wBy//sAcz/7AHN/+wBzv/sAc//7AHQ/9gB0f/YAdL/2AHT/9gB1P/YAdX/ugHW/7oB1/+6Ad//xAHg/+wB4f/sAtb/sALZABQC2//2AxL/ugMT/5wDFP+cAxj/nAMbAAoDHAAKAx3/ugMe/3QDKQAUAysAFAMtABQDNP+6AzX/ugM3/7oDOP+6Azn/ugM7/7oDPP+6Az3/ugM+/7oDQ/+cA0QACgNFAAoDRgAKA0cACgNI/5wDUv+6A1P/ugNW/7oDZf+6A7EACgOyAAoAFwEuABQBLwAUATAAFAExABQBMgAUATMAFAE0ABQBv//iAcD/4gHB/+IBwv/iAcP/4gHE/+IBxv/iAcf/4gHI/+IByf/iAcr/4gHL/+IBzP/iAc3/4gHO/+IBz//iAAEBLP/2AAUC0//iAtT/7ALWAAoC2f/iAx7/2AAFAQ7/4gLW/7AC2P/2Atr/7AMe/5IABQLT/+IC1P/sAtYACgLZ/9gDHv/YAAISDgAEAAAS/BTsAC8AMQAAAAAAAP/2//b/7P/2AAAAAAAA//YAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//H/9gAAAAAAAP/7//YAAP/x//YAAAAA/+wAAAAAAAAAAAAA/+L/7AAAAAAAAAAA/+cAAAAAAAAAAAAAAAAAAP/2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//b/9gAAAAAAAP/7AAAAAP/2AAD/7AAAAAAAAAAA/7oAAAAAAAAAAP/xAAAAAAAA//QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+wAAAAAAAAAAAAAAAAAAAAAAAAAAP/iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4gAAAAAAAAAAAAAAAP/iAAAAAAAAAAAAAAAAAAAAAAAA//YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/2AAAAAAAAAAAAAAAAAAAAAAAAAAD/7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+IAAAAAAAAAAAAAAAD/7P/sAAAAAAAAAAAAAAAAAAAAAAAA//YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//b/4v/xAAAAAAAA/+z/9v/i//H/9v/sAAD/yf/2AAAAAAAA//b/9v/s/8n/7P/Y/7AAAP/O//b/2P/d//H/zgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//YAAAAAAAAAAAAA//EAAAAAAAD/5wAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/2P/OAAAAAAAA/9gAAAAA/+cAAAAAAAAAAAAAAAD/4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+L/7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/7AAAAAAAAAAA//YAAAAAAAAAAAAAAAAAAP/nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4gAAAAAAAAAA/9gAAAAAAAAAAP/xAAAAAAAAAAAAAAAAAAAAAP/2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/YAAAAAAAAAAD/3QAAAAD/5wAAAAAAAAAAAAAAAAAAAAD/7AAA/+IAAAAAAAAAAP/iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4gAAAAAAAAAAAAAAAAAA//YAAAAAAAAAAAAAAAAAAAAA//YADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9gAAAAAAAP/sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8QAAAAAAAAAAAAAAAAAAAAAAAAAA/+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/iAAAAAAAAAAAAAAAA/+z/9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/x/7D/uv/J/7D/xP/i/84AAP+6/87/zgAA/8T/2P/O/7oAAAAA/7D/2AAA/7r/4gAA/84AAP+w/84AAP+6/+IAAP/EAAD/zv/OAAAAAAAA/7oAAP/sAAAAAAAA/87/4gAAAAD/9gAAAAD/2AAAAAD/5wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/6YAAAAAAAAAAP/YAAAAAAAAAAD/yQAAAAAAAAAAAAAAAP/s//YAAAAA//YAAAAAAAD/9v/2AAAAAAAAAAAAAP/2AAAAAAAAAAAAAP/2AAAAAAAAAAD/9gAAAAD/9gAAAAAAAAAAAAAAAAAAAAAAAP/sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/TAAAAAAAAAAAAAAAAAAD/7AAAAAAAAP/YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8QAAAAAAAAAAAAD/+wAAAAAAAAAAAAAAAAAA//EAAAAAAAAAAP/OAAAAAAAAAAAAAAAA/+z/3QAA/8T/iAAA/90AAP/Y/+cAAP/YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7/87/zv/O/8T/2P/2//YAAP/O/+wAAAAA/9j/3f/s/84AAAAA/87/9gAA/84AAAAA/+wACv/EAAAAAP/OAAAAAP/OAAD/ugAAAAAAAAAA/78AAP/2AAAAAAAA/84AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAAAAAAAAAAAAA/+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sAAAAAAAAAAAAAAAAAAAAAAAD/9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/5/+wAAAAAAAA/+cAAAAA/+wAAAAAAAAAAAAAAAD/zgAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+wAAAAD/2AAAAAD/9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAAAAAAA/7oAAAAAAAAAAP/YAAAAAAAAAAD/zgAAAAAAAAAAAAD/9v/O/9j/3f/O/+L/5//YAAD/2P/i/+IAAP/s/+f/4v/Y/+wAAP/O//YAAP/Y//YAAP/iAAD/2P/iAAD/2P/sAAD/2AAA/+L/2AAAAAAAAP+6AAD/8QAAAAAAAP/2/+wAAAAA/+L/4v+w/7D/7AAAAAAAAP/iAAD/9gAAAAAAAAAA/+wAAAAAAAAAAAAA/+IAAAAAAAAAAP/OAAAAAP/iAAAAAP+6AAAAAAAAAAAAAAAA/5z/7AAAAAAAAAAAAAAAAAAAAAAAAP/sAAAAAP/sAAAAAAAA/+wAAAAAAAAAAAAAAAD/8QAAAAAAAAAAAAD/7AAAAAAAAAAA/+IAAAAA/+wAAAAA/8QAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9gAAAAAAAAAAP/2AAAAAP/nAAAAAP/sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/xAAAAAAAAAAA/9gAAAAAAAAAAP/JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+wAAAAAAAAAAAAAAAAAAAAAAAAAAP/iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4gAAAAAAAAAAAAAAAP/i/+IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/2AAAAAAAAAAD/8f/i/+cAAAAA//b/7P/2//b/5//x/+wAAP/Y/+IAAP/2AAAAAP/s/+wAAP/n/+IAAAAAAAD/7P/iAAD/5//YAAAAAAAA//YAAAAAAAAAAAAA/+wAAAAAAAAAAAAAAAAAAAAA/9gAAAAA/+IAAAAAAAAAAAAAAAD/2AAAAAD/4gAAAAAAAAAAAAAAAAAAAAD/2AAAAAAAAAAK/9gAAAAA/9gAAP/sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAeAAAAAAAAAAAAAAAAAAAAAP/sAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAUAAAAAAAAAAD/9gAAAAAAAAAAAAD/8QAAAAAAAP/2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//YAAAAAAAD/9v/YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/Y/+f/yf/Y/+L/9v/2AAD/5//2AAAAAAAA/+z/9v/nAAAAAP/2AAAAAP/iAAAAAP/2AAD/5wAAAAD/5wAAAAD/0wAAAAAAAAAAAAAAAP+1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/2/8n/2AAAAAAAAAAAAAAAAAAAAAAACgAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAA//YAAAAAAAAAAAAA/7oAAAAAAAAAAAAAAAD/zgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYAAAAAAAAAAAAAAAAAMgAAAAAAAAAUAAAAMgAAACQAAAAKAAAAVAAAAAAAAAAAAAAAAAAAADAAAAAyABQAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAA/9gAAAAA//YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/OAAAAAAAAAAD/ugAAAAAAAAAA/8kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9gAAAAAAAAAAAAAAAP/YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/zgAAAAAAAAAA/7oAAAAAAAAAAP/YAAAAAAAAAAAAAgAnAAEAGwAAACUARAAbAGAAZwA7AGkAawBDAHgAnABGAJ4AsQBrALMAtAB/ALYA4wCBAOkBDACvAQ8BDwDTARQBNADUAU0BTwD1AVIBUgD4AVgBiQD5AYsBnQErAb8BzwE+AdYB1gFPAdgB2AFQAdwB3AFRAeEB4QFSAeMB/QFTAgkCKQFuAkcCSAGPAkoCTQGRAk8CUQGVAl4CggGYAoQCmAG9ApoCxwHSAxsDHAIAAygDLgICAzADMAIJAzIDMgIKAzQDNQILAzcDOQINAzsDPgIQA0QDRwIUA1IDUwIYA1YDVgIaA2UDZQIbAAIAUgABABkABgAaABsAAwAsAEIAAwBDAEQAKABgAGEAKQBiAGMAIgBkAGcAFgBpAGsAFgCaAJoAAwCbAJwAKgCfAKYAEwCnALEADgC0ALQAFwC2ALsAFwC8ANIACQDTANgAHADZANkAIgDaAOMAEQDpAQEABwECAQMABAEEAQUAIAEGAQwAGAEPAQ8AKwEUASoABAErASsAAgEsAS0AJgEuATQAGQFNAU8AIQFSAVIAKwFYAWMADAFkAX8AAgGAAYEALQGCAYUAAgGGAYYABAGHAYkAIAGLAZIAFAGTAZ0ADwG/AcQAHgHFAcUAIQHGAc8ADQHWAdYAIQHYAdgAJgHcAdwADQHhAeEADQHjAfsACAH8Af0ABQIJAg8AAQIQAiYABQInAicAAQIoAikALAJHAkgAJwJKAk0AGgJPAlEAGgJeAn8AAQKAAoAABQKBAoIALgKEAoQAAQKFAowAFQKNApcAEAKYApgAGwKaAp8AGwKgArYACgK3ArwAHwK9Ar0AJwK+AscAEgMbAxwAHQMoAygAIwMpAykAJQMqAyoAIwMrAysAJQMsAywAIwMtAy0AJQMuAy4AJAMwAzAAJAMyAzIAJAM0AzUACwM3AzkACwM7Az4ACwNEA0cAHQNSA1MACwNWA1YACwNlA2UACwACAFcAAQAbAAQAHgAkAAEALABDAAcARQBLAAEATABQACEAYABhACkAeACaAAEAngCeAAEApwCxABIAtAC0ABsAtgC7ABsAvADSAAkA0wDYAB4A2QDZAC4A2gDjABYA6QEBAAYBAgEDACoBBAEEABMBBgEMABcBDQENAB8BDwETAB8BFAEqAAoBLgE0ABwBNQE5ACMBOgFJAA0BSgFKABMBTAFOABMBUAFTABMBVQFWABMBWAFYABABWgFjABABZAF/AAMBgAGBAC0BggGGAAMBhwGHABABigGKAAMBiwGSABoBkwGdABEBnwGnABUBqAG+AAsBvwHEAA4BxQHFAC8BxgHPAA4B0AHUACQB1QHXABcB3wHfABEB4AHhABUB4wH9AAUCAgIIAAICEAImAAgCKAIoAAgCKgIwAAICRQJGACwCXgKAAAIChAKEAAICjQKXABQCmAKYAB0CmgKfAB0CoAK2AAwCtwK8ACACvQK9ADACvgLHABgCyALMACUDEgMSACsDEwMUACIDGAMYACIDGwMcABkDHQMdACsDKAMoACYDKQMpACcDKgMqACYDKwMrACcDLAMsACYDLQMtACcDLwMvACgDMQMxACgDMwMzACgDNAM1AA8DNwM5AA8DOwM+AA8DQwNDACIDRANHABkDSANIACIDUgNTAA8DVgNWAA8DZQNlAA8DsQOyABkABAAAAAEACAABAAwANAAEAOACLgACAAYDJAMkAAADJwMnAAEDzQPRAAID0wPkAAcD5gP8ABkEFQQcADAAAQBUAAEAGgAcAB4AJQAsAEMARQBMAFEAYABiAGQAbABvAHgAiACUAJsAnwCnALQAvADFANQA2QDaAOQA6QECAQQBBgENARQBLAEuATUBOgE7AUsBTQFQAVgBWwFkAXQBgAGHAYsBkwGfAagBsQHAAcYB0AHjAfwB/gICAgkCEAIoAioCMQI2AkUCRwJKAlICVQJeAm4CegKBAoUCjQKYAqACqQK4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AA5sYXRuADIABAAAAAD//wANAAAAAQACAAMABQAGAAcAEAARABIAEwAUABUANAAIQVpFIABUQ0FUIAB2Q1JUIACYS0FaIAC6TU9MIADcUk9NIAD+VEFUIAEgVFJLIAFCAAD//wANAAAAAQACAAQABQAGAAcAEAARABIAEwAUABUAAP//AA4AAAABAAIAAwAFAAYABwAIABAAEQASABMAFAAVAAD//wAOAAAAAQACAAMABQAGAAcACQAQABEAEgATABQAFQAA//8ADgAAAAEAAgADAAUABgAHAAoAEAARABIAEwAUABUAAP//AA4AAAABAAIAAwAFAAYABwALABAAEQASABMAFAAVAAD//wAOAAAAAQACAAMABQAGAAcADAAQABEAEgATABQAFQAA//8ADgAAAAEAAgADAAUABgAHAA0AEAARABIAEwAUABUAAP//AA4AAAABAAIAAwAFAAYABwAOABAAEQASABMAFAAVAAD//wAOAAAAAQACAAMABQAGAAcADwAQABEAEgATABQAFQAWYWFsdACGYzJzYwCOY2FzZQCUY2NtcACaY2NtcACiZGxpZwCsZnJhYwCybGlnYQC4bG9jbAC+bG9jbADEbG9jbADKbG9jbADQbG9jbADWbG9jbADcbG9jbADibG9jbADob3JkbgDuc2luZgD2c21jcAD8c3VicwECc3VwcwEIemVybwEOAAAAAgAAAAEAAAABABoAAAABABwAAAACAAIABQAAAAMAAgAFAAgAAAABAB0AAAABABYAAAABAB4AAAABABIAAAABAAkAAAABABEAAAABAA4AAAABAA0AAAABAAwAAAABAA8AAAABABAAAAACABcAGQAAAAEAFAAAAAEAGwAAAAEAEwAAAAEAFQAAAAEAHwAgAEIFFga0B0QHRAegB9gH2AgkCIIIwAjOCOII4gkECQQJBAkECQQJGAkmCUgJVgmSCdoJ/AoeDPAP2hCKEPQROAABAAAAAQAIAAIEGgIKAeQB5QHmAecB6AHpAeoB6wHsAe0B7gHvAfAB8QHyAfMB9AH1AfYB9wH4AfkB+gH7AfwB/QH+AgECAgIDAgQCBQIGAgcCCAIJAgoCCwIMAg0CDgIPAhACEQISAhMCFAIVAhYCFwIYAhkCGgIbAhwCHQIeAh8CIAIhAiICIwIkAiUCJgIoAikCKgIrAiwCLQIuAi8CMAIxAjICMwI0AjUCNgI3AjgCOQI6AjsCPAI9Aj4CPwJAAkECQgJDAkQCRQJGAkcCSAJKAksCTAJNAk4CTwJQAlECUgJTAlQCVQJWAlcCWAJZAloCWwJcAl0CXwJgAmECYgJjAmQCZQJmAmcCaAJpAmoCawJsAm0CbgJvAnACcQJyAnMCdAJ1AnYCdwJ4AnkCegJ7AnwCfQJ+An8CgAKBAoICgwKEAoUChgKHAogCiQKKAosCjAKNAo4CjwKQApECkwKUApUClgKXAeICJwKYApkCmgKcAp0CngKfAqACoQKiAqMCpAKlAqYCpwKoAqkCqgKrAqwCrQKuAq8CsAKxArICswK0ArUCtgK3ArgCuQK6ArsCvAK9Ar4CvwLAAsECwgLDAsQCxQLGAscCyALJAsoCywLMAeQB5QHmAecB6AHpAeoB6wHsAe0B7gHvAfAB8QHyAfMB9AH1AfYB9wH4AfkB+gH7AfwB/QH+AgECAgIDAgQCBQIGAgcCCAIJAgoCCwIMAg0CDgIPAhACEQISAhMCFAIVAhYCFwIYAhkCGgIbAhwCHQIeAh8CIAIhAiICIwIkAiUCJgInAigCKQIqAisCLAItAi4CLwIwAjECMgIzAjQCNQI3AjgCOQI6AjsCPAI9Aj4CPwJAAkECQgJDAkQCRgJHAkgCSQJKAksCTAJNAk4CTwJQAlECUgJTAlQCVQJWAlcCWAJZAloCWwJcAl0CXwJgAmECYgJjAmQCZQJmAmcCaAJpAmoCawJsAm0CbgJvAnACcQJyAnMCdAJ1AnYCdwJ4AnkCegJ7AnwCfQJ+An8CgAKBAoICgwKEAoUChgKHAogCiQKKAosCjAKNAo4CjwKQApECkwKUApUClgKXAeICmAKZApoCnAKdAp4CnwKgAqECogKjAqQCpQKmAqcCqAKpAqoCqwKsAq0CrgKvArACsQKyArMCtAK1ArYCtwK4ArkCugK7ArwCvQK+Ar8CwALBAsICwwLEAsUCxgLHAsgCyQLKAssCzAH/AgADDQNLAyADVANYA1sDXQNkAyYDVwNJA0oDXgNfA2ADYQNiA2MDtwO4A7kDugO7A8wDvAO9A74DvwPAA8EDwgPFA8YDxwPIA8kDygPLA8MDxAO1A7YD5gPnA+gD6QPqA+sD7APtA+4D7wPwA/ED8gPzA/QD9QP2A/cD+AP5A/oD+wP8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AocCiAKJAooCiwKMAo0CjgKPApACkQKSApMClAKVApYClwHiAicCmAKZApoCmwKcAp0CngKfAqACoQKiAqMCpAKlAqYCpwKoAqkCqgKrAqwCrQKuAq8CsAKxArICswK0ArUCtgK3ArgCuQK6ArsCvAK9Ar4CvwLAAsECwgLDAsQCxQLGAscCyALJAsoCywLMAwMDBAMFAwYDBwMIAwkDCgMLAwwDDQNLA0wDUQNUA1UDWANbA1wDXQNkA1cDTQNOA08DUANZA1oDUgNTA1YDZQNeA18DYANhA2IDYwO3A7gDuQO6A7sDzAO8A70DvgO/A8ADwQPCA8UDxgPHA8gDyQPKA8sDwwPEA7QDtQO2AAIAEwABAOgAAALSAtsA6ALgAuAA8gMOAw4A8wMQAxEA9AMVAxcA9gMZAxwA+QMkAyQA/QMoAy0A/gM0AzUBBAM4AzgBBgM6AzoBBwNDA0gBCANuA24BDgNwA3ABDwNyA4MBEAOeA58BIgOhA6IBJAOoA6gBJgABAAAAAQAIAAICWgEqAeMB5AHlAeYB5wHoAekB6gHrAewB7QHuAe8B8AHxAfIB8wH0AfUB9gH3AfgB+QH6AfsB/AH9Af4CAQICAgMCBAIFAgYCBwIIAgkCCgILAgwCDQIOAg8CEAIRAhICEwIUAhUCFgIXAhgCGQIaAhsCHAIdAh4CHwIgAiECIgIjAiQCJQImAicCKAIpAioCKwIsAi0CLgIvAjACMQIyAjMCNAI1AjYCNwI4AjkCOgI7AjwCPQI+Aj8CQAJBAkICQwJEAkUCRgJHAkgCSQJKAksCTAJNAk4CTwJQAlECUgJTAlQCVQJWAlcCWAJZAloCWwJcAl0CXgJfAmACYQJiAmMCZAJlAmYCZwJoAmkCagJrAmwCbQJuAm8CcAJxAnICcwJ0AnUCdgJ3AngCeQJ6AnsCfAJ9An4CfwKAAoECggKDAoQChQKGAocCiAKJAooCiwKMAo0CjgKPApACkQKSApMClAKVApYClwHiApgCmQKaApsCnAKdAp4CnwKgAqECogKjAqQCpQKmAqcCqAKpAqoCqwKsAq0CrgKvArACsQKyArMCtAK1ArYCtwK4ArkCugK7ArwCvQK+Ar8CwALBAsICwwLEAsUCxgLHAsgCyQLKAssCzAH/AgADAwMEAwUDBgMHAwgDCQMKAwsDDAMNA0sDTANRA1QDVQNYA1sDXANdA2QDVwNNA04DTwNQA1kDWgNSA1MDVgNlA14DXwNgA2EDYgNjA7cDuAO5A7oDuwPMA7wDvQO+A78DwAPBA8IDxQPGA8cDyAPJA8oDywPDA8QDtAO1A7YAAgAWAOkBOgAAATwBSgBSAUwBowBhAaUB1AC5As0CzgDpAtIC2wDrAuAC4AD1Aw4DDgD2AxADEQD3AxUDFwD5AxkDHAD8AycDLQEAAzQDNQEHAzgDOAEJAzoDOgEKA0MDSAELA24DbgERA3ADcAESA3IDgwETA54DnwElA6EDogEnA6gDqAEpAAEAAAABAAgAAgBcACsDIAMhAyIDIwMlAyYDJAMuAy8DMAMxAzIDMwM7AzwDPQM+A0kDSgOzA+YD5wPoA+kD6gPrA+wD7QPuA+8D8APxA/ID8wP0A/UD9gP3A/gD+QP6A/sD/AACAAwDDwMRAAADFgMWAAMDGgMaAAQDHgMeAAUDJwMtAAYDNAM1AA0DOAM4AA8DOgM6ABADQQNCABEDoQOhABMDzQPRABQD0wPkABkABAAAAAEACAABAFYABAAOACgAOgBEAAMACAAOABQB1QACATUB1gACAU0B1wACAZ8AAgAGAAwB2wACAZ8B3AACAcYAAQAEAd8AAgGfAAIABgAMAeAAAgGfAeEAAgHGAAEABAEGASwBkwGfAAQAAAABAAgAAQA2AAEACAAFAAwAFAAcACIAKAHZAAMBLAE6AdoAAwEsAVAB2AACASwB3QACAToB3gACAVAAAQABASwAAQAAAAEACAABAAYADgABAAEC0gABAAEACAABAAAAFAAAAAAAAAACd2dodAEAAAA="
                   
              var font64Bold = "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A9ABigAA////7wAAAQADBQYmATsAAAAHA9UBigAA////5AAAARIDAgYmATsAAAAHA9MBigAA////ogAAAQgDAgYmATsAAAAHA9oBqAAA////6QAAAQsDBAYmATsAAAAHA80BigAA////6QAAAQ8DtQYmATsAAAAnA80BigAAAAcD0AGEALP//wA/AAAAuwMLBiYBOwAAAAcDzgGKAAD//wA8/yQAvwLuBiYBOgAAAAcD3gGIAAD////4AAAAuwMCBiYBOwAAAAcDzwGKAAD//wA/AAAA1AMQBiYBOwAAAAcD2QGzAAD////0AAABBgMHBiYBOwAAAAcD2wGKAAD////wAAABBALZBiYBOwAAAAcD2AGKAAD//wA8/0IA0ALuBiYBOgAAAAcD4gGtAAD////QAAABOgL5BiYBOwAAAAcD1wGZAAAAAgA8/xMAvgLuAAwAEwAAUyI1NTQzMzIWFRUUIwMRMxEUBgdPExNdCQkSbXwQDgJtElsUDAhbEvymAwX98UKFLwAAAQA//xMAuwIYAAYAAFcRMxEUBgc/fBAO7QMF/fFChS8A////5P8TARIDAgYmAUsAAAAHA9MBigAAAAEAPwAAAhIC+wAMAABzETMRMzczBxMjJyMVP3xEhn+quH+WQgL7/lnE/P7k5eUA//8AP/8tAhIC+wYmAU0AAAAHA+ACRQAAAAEAPwAAAhICHAAMAABzETMVMzczAxMjJyMVP3xAhoOquH+WQgIc0Mz+/P7s3d0AAAEAP//+AScC+wANAABXIiYmNREzERQWFhcXFd41RyN8DxwULQIkTD8CTv3DJCgRAwZaAP//AD///gEnA94GJgFQAAAABwPQAYoA3f//AD///gFkAw8GJgFQAAAABwPSASgAAP//AD//LQEnAvsGJgFQAAAABwPgAeoAAP//AD///gFpAvsGJgFQAAAABwMnAQsADP//AD//JAEnAvsGJgFQAAAABwPeAb0AAP//ACn/NAE8AvsGJgFQAAAABwPkAb8AAAAC/////gEnAvsABwAVAABDNT8CFQcHEyImJjURMxEUFhYXFxUBQHxdXXyfNUcjfA8cFC0BWUQZKCNEIyj+jCRMPwJO/cMkKBEDBloAAQA/AAADbQIhACoAAHMRMxc2NjMyFhc+AjMyFhYVESMRNCYmIyIGBxYWFREjETQmJiMiBgYHET9l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AqkAFwKpABcCqQAXAqkAFwKpABcCqQAXAqkAFwKpABcCqQAXAqkAFwKpABcCqQAXAqkAFwKpABcCqQAXAqkAFwKpABcCqQAXAqkAFwKpABcDzwAXA88AFwJrAEUCawBFAkgAMgJIADICSAAyAkgAMgJIADICSAAyAkgAMgKkAEUCpAANAqQARQKkAA0CpABFAqQARQKkAEUCUgBFAlIARQJSAEUCUgBFAlIARQJSAEUCUgBFAlIARQJSAD0CUgBFAlIARQJSAEUCUgBFAlIARQJSAEUCUgBFAlIARQJSAEUCUgBFAlIARQJSAEUCUgBFAlIARQJBAEUCQQBFApUAMgKVADIClQAyApUAMgKVADIClQAyApUAMgK4AEUCuAANArgARQK4AEUCuABFAQUARQEFAEUBBf/0AQX/6gEF/6QBBf/eAQX/3gEFAEUBBQBFAQX/9QEFAEUBBf/5AQX/8wEFAEUBBf/NAY0AGgGNABoCdwBFAncARQIWAEUCFgBFAhYARQIWAEUCFgBFAhYARQIWAEUCFv/+A2IAMQNiADEDYgAxArkATQK5AE0CuQBNArkATQK5AE0CuQBNArMATQK5AE0CuQBNArcAMgK3ADICtwAyArcAMgK3ADICtwAyArcAMgK3ADICtwAyArcAMgK3ADICtwAyArcAMgK3ADICtwAyArcAMgK3ADICtwAyArcAMgK3ADICtwAyArcAMgK3ADICtwAyArcAMgK3ADICtwAyArcAMgK3ADICtwAyArcAMgK3ADICtwAyArcAMgQWADICZwBFAmcARQJBAEUCtwAyAmwARQJsAEUCbABFAmwARQJsAEUCbABFAmwARQJsAEUCSQAzAkkAMwJJADMCSQAzAkkAMwJJADMCSQAzAkkAMwJJADMCSQAzAkkAMwLAAEUCbAAvAkMAEAJDABACQwAQAkMAEAJDABACQwAQAkMAEAJDABACqgA7AqoAOwKqADsCqgA7AqoAOwKqADsCqgA7AqoAOwKqADsCqgA7AqoAOwKqADsCqgA7AqoAOwKqADsCqgA7AqoAOwKqADsCqgA7AqoAOwKqADsCqgA7AqoAOwKpABcD3wAXA98AFwPfABcD3wAXA98AFwKJABgCcAAYAnAAGAJwABgCcAAYAnAAGAJwABgCcAAYAnAAGAJwABgCcAAYAjkAKAI5ACgCOQAoAjkAKAI5ACgCJAAmAiQAJgIkACYCJAAmAiQAJgIkACYCJAAmAiQAJgIkACYCJAAmAiQAJgIkABMCJAAmAiQAJgIkACYCJAAmAiQAJgIkACYCJAAmAiQAJgIkACYCJAAmAiQAJgIkACYCJAAmA14AKANeACgCRwA/AkcAPwHqAC4B6gAuAeoALgHqAC4B6gAuAeoALgHqAC4CRAAuAkAALgJEAC4CRAAuAkQALgJEAC4CRAAuAhsALgIbAC4CGwAuAhsALgIbAC4CGwAuAhsALgIbAC4CGwATAhsALgIbAC4CGwAuAhsALgIbAC4CGwAuAhsALgIbAC4CGwAuAhsALgIbAC4CGwAuAhsALgIbAC4CGwAuAYAAFAGAABQCRAAYAkQAGAJEABgCRAAYAkQAGAJEABgCRAAYAlEAPwJR//4CUQA/AlEAAQJRAD8A+wA8APkAPwD5AD8A+f/vAPn/5AD5/6IA+f/pAPn/6QD5AD8A+wA8APn/+AD5AD8A+f/0APn/8AD7ADwA+f/QAPsAPAD7AD8A+//kAhkAPwIZAD8CGQA/ATIAPwEyAD8BMgA/ATIAPwFlAD8BMgA/ATIAKQEy//8DqQA/A6kAPwOpAD8CUQA/AlEAPwJRAD8CUQA/AlEAPwJRAD8CUQA/AlEAPwJRAD8CQAAuAkAALgJAAC4CQAAuAkAALgJAAC4CQAAkAkAALgJAAC4CQAAuAkAALgJAAC4CQAAuAkAALgJAAC4CQAAuAkAALgJAAC4CQAAuAkAALgJAAC4CQAAuAkAALgJAAC4CQAAuAkAALgJAAC4CQAAuAkAAJQJAACUCQAAuAkAALgJAAC4CQAAuA3wALgJHAD8CRwA/AkcAPwJEAC4BowA/AaMAPwGjAD8BowAoAaP//gGjAD8BowA/AaP/9AH3ACgB9wAoAfcAKAH3ACgB9wAoAfcAKAH3ACgB9wAoAfcAKAH3ACgB9wAoAlYANQF9AA4BfQAOAX0ADgF9AA4BfQAOAX0ADgF9AA4BfQAOAX0ADgJRAD4CUQA+AlEAPgJRAD4CUQA+AlEAPgJRAD4CUQA+AlEAPgJRAD4CUQA+AlEAPgJRAD4CUQA+AlEAPgJRAD4CUQA+AlEAPgJRAD4CUQA+AlEAPgJRAD4CUQA+AioADwMwAA8DMAAPAzAADwMwAA8DMAAPAhEADQIvAA8CLwAPAi8ADwIvAA8CLwAPAi8ADwIvAA8CLwAPAi8ADwIvAA8B9QAmAfUAJgH1ACYB9QAmAfUAJgQ2AC4D9wAuA00ALgMOAA4ECQAOBEAADgL9ABQDtgAUAoIADgK5AA4DZAAoAvoADgOsAA4CWwA/Aj4AGgI+ABoCPgAaAj4AGgI+ABoCPgAaAj4AGgI+ABoCPgAaAj4AGgI+ABoCPgAaAj4AGgI+ABoCPgAaAj4AGgI+ABoCPgAaAj4AGgI+ABoCPgAaAj4AGgI+ABoCPgAaAj4AGgMqABoDKgAaAg8APwGZAA4BogAVAg8APwHuADEB7gAxAe4AMQHuADEB7gAxAe4AMQHuADECOgA/AjoAFgI6AD8COgAWAjoAPwI6AD8COgA/AfcAPwH3AD8B9wA/AfcAPwH3AD8B9wA/AfcAPwH3AD8B9wAMAfcAPwH3AD8B9wArAfcAPwH3AD8B9wA/AfcAPwH3AD8B9wA/AfcAPwH3AD8B9wA/AfcAPwH3AD8CDQAsAesAPwHrAD8CLgAxAi4AMQIuADECLgAxAi4AMQIuADECLgAxAkwAPwJMABYCTAA/AkwAPwJMAD8A9QA/APUAPwD1/+sA9f/hAPX/ngD1/+YA9f/mAPUAPwD1AD8A9f/1APUAPwD1//EA9f/tAPUAPwD1/80BXAAhAVwAIQIdAD8CHQA/AvAAPwHFAD8BxQA/AcUAPwHFAD8BxQA/AcUAPwHFAD8BxQAJAtwALwLcAC8C3AAvAk0ARAJNAEQCTQBEAk0ARAJNAEQCTQBEAkcARAJNAEQCTQBEAkkAMQJJADECSQAxAkkAMQJJADECSQAxAkkAKQJJADECSQAxAkkAMQJJADECSQAxAkkAMQJJADECSQAxAkkAMQJJADECSQAxAkkAMQJJADECSQAxAkkAMQJJADECSQAxAkkAMQJJADECSQAxAkkAMQJJADECSQAxAkkAMQJJADECSQAxAkkAMQNaADECCgA/AgoAPwHuAD8CSQAxAhMAPwITAD8CEwA/AhMAPwITACQCEwA/AhMAPwITAD8B8QAwAfEAMAHxADAB8QAwAfEAMAHxADAB8QAwAfEAMAHxADAB8QAwAfEAMAHuABkB7gAZAe4AGQHuABkB7gAZAe4AGQHuABkB7gAZAj4ANwI+ADcCPgA3Aj4ANwI+ADcCPgA3Aj4ANwI+ADcCPgA3Aj4ANwI+ADcCPgA3Aj4ANwI+ADcCPgA3Aj4ANwI+ADcCPgA3Aj4ANwI+ADcCPgA3Aj4ANwI+ADcCPgAaAzMAGgMzABoDMwAaAzMAGgMzABoCLAAaAg8AGgIPABoCDwAaAg8AGgIPABoCDwAaAg8AGgIPABoCDwAaAg8AGgHkACsB5AArAeQAKwHkACsB5AArAZoAGQGtAB8DAAAwAlEAPgJ3ABICigA+AXEAIwJNADECRQAoAmIAGAJoAEQCZQA6AiYAGgJ5AEICZQA1AcIALQHCABkBwgA8AcIAJwKKAD4BwgAkAcIAPAHCAC0BwgAkAcIAPAHCAC0BwgAnAcIAGQHCADYBwgAqAcIAJgHCACcBwgAkAcIAJwHCABkBwgA2AcIAKgHCACYBwgAnAcIAJAHFACQBxQA8AcUALQHFACcBxQAZAcUANgHFACoBxQAmAcUAJwHFACQBKv+wBPsAQAT7AEAE+wAxAh8AOAFDACUB7gAxAegAKwIIAB4CAAA8AgAANQHUAB8CEAA7AgAAMgIfADgBtwAsAbkAEgEEAEwBOQBMAN4AOQDeADkDMABRAQ4ASAEOAEoCxgASAN4AOQISACsCEgBBAWcAJADFACQA3gA5AbkAEgJhAAABuQASAQQATAE5AEwBDgBKAAD/XAISAEEBuQASAHL/8AE7ABIBOwASAVEATAFRABIBdQBCAXQAEgE7ABIBOwASAVEATAFRABIBdQBCAXQAEgLmABcCBwAXAmEARALmABcBWwAXAVsAFwFbABcC5gAXAgcAFwFbABcBaAAXAmkALAJpACkBbwAsAW8AKQFpAC0BaQAzAWkALQDTADMA0wAtANMALQF4ACwBeAApAbcALAEEAEwBFwAYARcAGAEoAEEBKAAYATkATALmABcCBwAXAPMAPwDzAD4BWwAXABD/cAJcABkBTgA7AU0AGAHBAC4BwQA7AWcAJAFpAC0BaQAzAWkALQDTADMA0wAtAM8ALQDFACQBaAAXAmEAAABQAAAA3gAAAQYAAAEGAAAAgwAAAAAAAAEGAAACYQA5AeYAIwJhADQCYQBFAmEAMwJhADcCYQASAmEAEQJhADsCYQAmAmEAEgJhADwCYQAKAmEAHwJhAB4CYQAOAmEACgJhAA4CYQA2AmEAPAJhAAUCYQAGAmEA9QJhAEECYQBQAmEAUAJhAG4CYQBQAmEAUAJhAFACYQBiAmEAYAJhAFACYQBRAmEAUAJhAFABsAAsAmEAUAMHACwCYQAJAcAAEgMAADACwgAXAnQAEgIyACMChwASAlEAPgKFADMDwgAmBWIAJgIFABIDbwA6ArEAJQI9AB8CHwAtAzYAMQM2ADECxwASAUIAFgD8AEwA/ABMAcIAEgHgABoB0wASBIYATQN6ACgBhgAsALQAHwFXAB8DbwA6AtwANQJIACEBFwAZAgEANgIBADICAQAwAgEAMAIBABgCAQA6AgEAJAIBABgCAQA7AgEAFAIBACECAQAkAx0AJgRqACYCAQAWAgEAFAIBABYCAQA2AgEAOwIBABACAQAaAgEAGAAA/l4AAP7CAAD+bgAA/swAAP5wAAD/ywAA/loAAP5fAAD+ZAAA/nwAAP43AAD+ZgAA/pcAAP35AAD+agAA/n0AAP78AAD+wQAA/lAAAP5zAAD+qgAA/psAAP5qAAD+aQAA/sQAAP5OAAD+wQAA/mUAAP7UAAD+cAAA/loAAP5fAAD+ZAAA/nwAAP43AAD+YwAA/pUAAP33AAD+aQAA/n0AAP8HAAD+xQAA/k8AAP5zAAD+qgAA/psAAP5qAAD+aQDZAC0AxgAtAUMAFQFNAB0A5AASAKAAFQDMAB8AzAAZAOQAEgCeAB4AngAeAOIAEgFhACgBhgAsAPoALAGGACwBlAA5ALgAKgDiABIBhAASAWwALADeACsBRwAsAbAAJgAA/mT+XP5k/k/+Wv34/lr+TwAAAAEAAAPq/rkAAAVj/hP/hwUrAAEAAAAAAAAAAAAAAAAAAAQWAAQCFQJYAAUAAAKKAlgAAABLAooCWAAAAV4AMgE/AAAAAAAAAAAAAAAAoAAA/0AAIEsAAAAAAAAAAFRJTlkAwAAN+wUD6v65AAAEbgEOIAABkwAAAAACEwLcAAAAIAADAAAAAgAAAAMAAAAUAAMAAQAAABQABAfQAAAAxACAAAYARAANAC8AOQB+ATEBSAF+AY8BkgGhAbAB5wHrAhsCLQIzAjcCWQK8Ar8CzALdAwQDDAMPAxIDGwMkAygDLgMxAzUDqQO8A8AeAx4PHhceIR4lHiseLx43HjseSR5THlceWx5vHnsehR6PHpMelx6eHvkgCyAQIBUgGiAeICIgJiAwIDMgOiBEIHAgeSCJIKEgpCCnIKkgrSCyILUguiC9IRMhFiEiISYhLiICIgYiDyISIhUiGiIeIisiSCJgImUlyvsF//8AAAANACAAMAA6AKABNAFKAY8BkgGgAa8B5gHqAfoCKgIwAjcCWQK5Ar4CxgLYAwADBgMPAxEDGwMjAyYDLgMxAzUDqQO8A8AeAh4IHhQeHB4kHioeLh42HjoeQB5MHlYeWh5eHngegB6OHpIelx6eHqAgByAQIBIgGCAcICAgJiAwIDIgOSBEIHAgdCCAIKEgoyCmIKkgqyCxILUguSC8IRMhFiEiISYhLiICIgUiDyIRIhUiGSIeIisiSCJgImQlyvsA//8DYAAAAqIAAAAAAAAAAP8kAeMAAAAAAAAAAAAAAAAAAP8U/tIAAAAAAAAAAAAAAAAAywDKAMIAuwC6ALUAswCw/yb/FP8RAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4w3iFAAAAADjKQAA4y4AAAAA4u7jb+N/4wjiu+KF4oXiZOLPAADi1uLZAAAAAOK5AAAAAOKZ4pjiheJx4oHhmwAA4YoAAOFwAADhduFr4UnhKwAA3dYAAAABAAAAwgAAAN4BZgKIArAAAAAAAxQDFgMYAxoDHANeA2QAAAAAA2YDbANuA3oDhAOMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOCA4QDkgOYA6IDpAOmA6gDqgOsA74DzAPOA9AD8gP4BAIEBAAAAAAEAgS0AAAEugAABL4EwgAAAAAAAAAAAAAAAAAAAAAAAAS0AAAAAASyBLYAAAS2BLgAAAAAAAAAAAAAAAAErgAABK4AAASuAAAAAAAAAAAEqAAABKgAAANpAxUDGwMXA3IDngOiAxwDLAMtAw4DhgMTAzgDGAMeAxIDHQONA4oDjAMZA6EAAQAcAB4AJQAsAEMARQBMAFEAYABiAGQAbABvAHgAmwCeAJ8ApwC0ALwA0wDUANkA2gDkAyoDDwMrA7ADHwQPAOkBBAEGAQ0BFAEsAS4BNQE6AUoBTQFQAVgBWwFkAYcBigGLAZMBnwGoAb8BwAHFAcYB0AMoA6kDKQOSA2oDFgNvA4EDcQODA6oDpAQNA6UCzQM/A5MDOgOmBBEDqAOQAvcC+AQIA5wDowMQBAsC9gLOA0ADAQMAAwIDGgASAAIACQAZABAAFwAaACEAOwAtADEAOABaAFIAVABWACYAdwCGAHkAewCWAIIDiACUAMMAvQC/AMEA2wCdAZ4A+gDqAPEBAQD4AP8BAgEJASMBFQEZASABRAE8AT4BQAEOAWMBcgFlAWcBggFuA4kBgAGvAakBqwGtAccBiQHJABUA/QADAOsAFgD+AB8BBwAjAQsAJAEMACABCAAnAQ8AKAEQAD4BJgAuARYAOQEhAEEBKQAvARcASAExAEYBLwBKATMASQEyAE8BOABNATYAXwFJAF0BRwBTAT0AXgFIAFgBOwBhAUwAYwFOAU8AZQFRAGcBUwBmAVIAaAFUAGsBVwBwAVwAcgFeAHEBXQB1AWEAkAF8AHoBZgCOAXoAmgGGAKABjACiAY4AoQGNAKgBlACtAZkArAGYAKoBlgC3AaIAtgGhALUBoADRAb0AzQG5AL4BqgDQAbwAywG3AM8BuwDWAcIA3AHIAN0A5QHRAOcB0wDmAdIAiAF0AMUBsQBHATAAkwF/ABgBAAAbAQMAlQGBAA8A9wAUAPwANwEfAD0BJQBVAT8AXAFGAIEBbQCPAXsAowGPAKUBkQDAAawAzAG4AK4BmgC4AaMAgwFvAJkBhQCEAXAA4gHOBAID/wP+A/0EBAQDBAwECgQHBAAEBQQBBAYECQQOBBMEEgQUBBADzwPQA9MD1wPYA9UDzgPNA9kD1gPRA9QAHQEFACIBCgApAREAKgESACsBEwBAASgAPwEnADABGABEAS0ASwE0AFABOQBOATcAVwFBAGkBVQBqAVYAbQFZAG4BWgBzAV8AdAFgAHYBYgCXAYMAmAGEAJIBfgCRAX0AnAGIAKQBkACmAZIArwGbALABnACpAZUAqwGXALEBnQC5AaUAugGmALsBpwDSAb4AzgG6ANgBxADVAcEA1wHDAN4BygDoAdQAEQD5ABMA+wAKAPIADAD0AA0A9QAOAPYACwDzAAQA7AAGAO4ABwDvAAgA8AAFAO0AOgEiADwBJABCASoAMgEaADQBHAA1AR0ANgEeADMBGwBbAUUAWQFDAIUBcQCHAXMAfAFoAH4BagB/AWsAgAFsAH0BaQCJAXUAiwF3AIwBeACNAXkAigF2AMIBrgDEAbAAxgGyAMgBtADJAbUAygG2AMcBswDgAcwA3wHLAOEBzQDjAc8DZgNoA2sDZwNsAzYDNQM0AzcDRANFA0MDqwOtAxEDdgN5A3MDdAN4A34DdwOAA3oDewN/A5UDmAOaA4cDhAObA48DjgHYAd0B3gHZAdoB27gB/4WwBI0AAAAAEADGAAMAAQQJAAAAmgAAAAMAAQQJAAEAGACaAAMAAQQJAAIADgCyAAMAAQQJAAMALgDAAAMAAQQJAAQAGACaAAMAAQQJAAUAGgDuAAMAAQQJAAYAGAEIAAMAAQQJAAgAGgEgAAMAAQQJAAkAGgEgAAMAAQQJAAsANAE6AAMAAQQJAAwANAE6AAMAAQQJAA0BIAFuAAMAAQQJAA4ANAKOAAMAAQQJABAABgLCAAMAAQQJABEAEALIAAMAAQQJAQAADALYAEMAbwBwAHkAcgBpAGcAaAB0ACAAMgAwADEANwAgAFQAaABlACAARQB4AG8AIABQAHIAbwBqAGUAYwB0ACAAQQB1AHQAaABvAHIAcwAgACgAaAB0AHQAcABzADoALwAvAGcAaQB0AGgAdQBiAC4AYwBvAG0ALwBOAEQASQBTAEMATwBWAEUAUgAvAEUAeABvAC0AMQAuADAAKQBFAHgAbwAgAFMAZQBtAGkAQgBvAGwAZABSAGUAZwB1AGwAYQByADIALgAwADAAMAA7AFQASQBOAFkAOwBFAHgAbwAtAFMAZQBtAGkAQgBvAGwAZABWAGUAcgBzAGkAbwBuACAAMgAuADAAMAAwAEUAeABvAC0AUwBlAG0AaQBCAG8AbABkAE4AYQB0AGEAbgBhAGUAbAAgAEcAYQBtAGEAaAB0AHQAcAA6AC8ALwB3AHcAdwAuAG4AZABpAHMAYwBvAHYAZQByAGUAZAAuAGMAbwBtAFQAaABpAHMAIABGAG8AbgB0ACAAUwBvAGYAdAB3AGEAcgBlACAAaQBzACAAbABpAGMAZQBuAHMAZQBkACAAdQBuAGQAZQByACAAdABoAGUAIABTAEkATAAgAE8AcABlAG4AIABGAG8AbgB0ACAATABpAGMAZQBuAHMAZQAsACAAVgBlAHIAcwBpAG8AbgAgADEALgAxAC4AIABUAGgAaQBzACAAbABpAGMAZQBuAHMAZQAgAGkAcwAgAGEAdgBhAGkAbABhAGIAbABlACAAdwBpAHQAaAAgAGEAIABGAEEAUQAgAGEAdAA6ACAAaAB0AHQAcAA6AC8ALwBzAGMAcgBpAHAAdABzAC4AcwBpAGwALgBvAHIAZwAvAE8ARgBMAGgAdAB0AHAAOgAvAC8AcwBjAHIAaQBwAHQAcwAuAHMAaQBsAC4AbwByAGcALwBPAEYATABFAHgAbwBTAGUAbQBpAEIAbwBsAGQAVwBlAGkAZwBoAHQAAAACAAAAAAAA/5wAMgAAAAAAAAAAAAAAAAAAAAAAAAAABB0AAAAkAMkBAgEDAQQBBQEGAQcAxwEIAQkBCgELAQwBDQBiAQ4ArQEPARABEQESAGMBEwCuAJABFAAlARUAJgD9AP8AZAEWARcBGAAnAOkBGQEaARsBHAEdACgAZQEeAR8BIADIASEBIgEjASQBJQEmAMoBJwEoAMsBKQEqASsBLAEtAS4BLwApATAAKgD4ATEBMgEzATQBNQArATYBNwE4ATkALADMAToAzQE7AM4BPAD6AT0AzwE+AT8BQAFBAUIALQFDAC4BRAAvAUUBRgFHAUgBSQFKAOIAMAFLAUwAMQFNAU4BTwFQAVEBUgFTAGYAMgDQAVQA0QFVAVYBVwFYAVkBWgBnAVsBXAFdANMBXgFfAWABYQFiAWMBZAFlAWYBZwFoAWkBagCRAWsArwFsAW0BbgCwADMBbwDtADQANQFwAXEBcgFzAXQBdQF2ADYBdwF4AOQBeQD7AXoBewF8AX0BfgF/AYAANwGBAYIBgwGEAYUBhgGHADgA1AGIANUBiQBoAYoA1gGLAYwBjQGOAY8BkAGRAZIBkwGUAZUBlgGXAZgBmQA5ADoBmgGbAZwBnQA7ADwA6wGeALsBnwGgAaEBogGjAaQAPQGlAOYBpgGnAEQAaQGoAakBqgGrAawBrQBrAa4BrwGwAbEBsgGzAGwBtABqAbUBtgG3AbgAbgG5AG0AoAG6AEUBuwBGAP4BAABvAbwBvQG+AEcA6gG/AQEBwAHBAcIASABwAcMBxAHFAHIBxgHHAcgByQHKAcsAcwHMAc0AcQHOAc8B0AHRAdIB0wHUAdUASQHWAEoA+QHXAdgB2QHaAdsASwHcAd0B3gHfAEwA1wB0AeAAdgHhAHcB4gHjAeQAdQHlAeYB5wHoAekATQHqAesATgHsAe0ATwHuAe8B8AHxAfIB8wDjAFAB9AH1AFEB9gH3AfgB+QH6AfsB/AB4AFIAeQH9AHsB/gH/AgACAQICAgMAfAIEAgUCBgB6AgcCCAIJAgoCCwIMAg0CDgIPAhACEQISAhMAoQIUAH0CFQIWAhcAsQBTAhgA7gBUAFUCGQIaAhsCHAIdAh4CHwBWAiACIQDlAiIA/AIjAiQCJQImAicAiQBXAigCKQIqAisCLAItAi4CLwBYAH4CMACAAjEAgQIyAH8CMwI0AjUCNgI3AjgCOQI6AjsCPAI9Aj4CPwJAAkEAWQBaAkICQwJEAkUAWwBcAOwCRgC6AkcCSAJJAkoCSwJMAF0CTQDnAk4CTwJQAlECUgJTAlQCVQJWAlcAwADBAlgCWQJaAlsCXAJdAl4CXwJgAmECYgJjAmQCZQJmAmcCaAJpAmoCawJsAm0CbgJvAnACcQJyAnMCdAJ1AnYCdwJ4AnkCegJ7AnwCfQJ+An8CgAKBAoICgwKEAoUChgKHAogCiQKKAosCjAKNAo4CjwKQApECkgKTApQClQKWApcCmAKZApoCmwKcAp0CngKfAqACoQKiAqMCpAKlAqYCpwKoAqkCqgKrAqwCrQKuAq8CsAKxArICswK0ArUCtgK3ArgCuQK6ArsCvAK9Ar4CvwLAAsECwgLDAsQCxQLGAscCyALJAsoCywLMAs0CzgLPAtAC0QLSAtMC1ALVAtYC1wLYAtkC2gLbAtwC3QLeAt8C4ALhAuIC4wLkAuUC5gLnAugC6QLqAusC7ALtAu4C7wLwAvEC8gLzAvQC9QL2AvcC+AL5AvoC+wL8Av0C/gL/AwADAQMCAwMDBAMFAwYDBwMIAwkDCgMLAwwDDQMOAw8DEAMRAxIDEwMUAxUDFgMXAxgDGQMaAxsDHAMdAx4DHwMgAyEDIgMjAyQDJQMmAycDKAMpAyoDKwMsAy0DLgMvAzADMQMyAzMDNAM1AzYDNwM4AzkDOgM7AzwDPQM+Az8DQANBA0IDQwNEA0UAnQCeA0YDRwCbABMAFAAVABYAFwAYABkAGgAbABwDSANJA0oDSwNMA00DTgNPA1ADUQNSA1MDVANVA1YDVwNYA1kDWgNbA1wDXQNeA18DYANhA2IDYwNkA2UDZgNnA2gDaQNqALwA9AD1APYDawNsA20DbgNvA3ADcQNyA3MDdAN1AA0APwDDAIcAHQAPAKsABACjAAYAEQAiAKIABQAKAB4AEgBCA3YDdwN4A3kDegN7A3wDfQBeAGAAPgBAAAsADAN+A38DgAOBA4IDgwCzALIDhAOFABADhgOHA4gDiQOKA4sAqQCqAL4AvwDFALQAtQC2ALcAxAOMA40DjgOPA5ADkQOSA5MDlAOVA5YDlwOYA5kDmgObA5wDnQOeA58DoAOhA6IDowOkA6UDpgOnA6gDqQOqA6sAAwOsA60DrgOvA7AAhAOxAL0ABwOyA7MApgD3A7QDtQO2A7cDuAO5A7oDuwO8A70AhQO+AJYDvwPAAA4A7wDwALgAIACPACEAHwCVAJQAkwCnAGEApACSA8EAnAPCA8MAmgCZAKUDxACYAAgAxgC5ACMACQCIAIYAiwCKAIwAgwBfAOgAggPFAMIDxgPHAEEDyAPJA8oDywPMA80DzgPPA9AD0QPSA9MD1APVA9YD1wPYA9kD2gPbA9wD3QPeA98D4APhA+ID4wPkA+UD5gPnA+gD6QPqA+sD7APtA+4D7wPwA/ED8gPzA/QD9QP2A/cD+AP5A/oD+wP8A/0D/gP/BAAEAQQCBAMEBAQFBAYEBwQIBAkECgQLBAwEDQQOBA8EEAQRBBIEEwQUBBUEFgQXBBgEGQQaBBsEHAQdBB4AjQDbAOEA3gDYAI4A3ABDAN8A2gDgAN0A2QQfBCAEIQQiBCMEJAQlBCYGQWJyZXZlB3VuaTFFQUUHdW5pMUVCNgd1bmkxRUIwB3VuaTFFQjIHdW5pMUVCNAd1bmkxRUE0B3VuaTFFQUMHdW5pMUVBNgd1bmkxRUE4B3VuaTFFQUEHdW5pMDIwMAd1bmkxRUEwB3VuaTFFQTIHdW5pMDIwMgdBbWFjcm9uB0FvZ29uZWsKQXJpbmdhY3V0ZQdBRWFjdXRlB3VuaTFFMDIHdW5pMUUwOAtDY2lyY3VtZmxleApDZG90YWNjZW50BkRjYXJvbgZEY3JvYXQHdW5pMUUwQQd1bmkxRTBDB3VuaTFFMEUGRWJyZXZlBkVjYXJvbgd1bmkxRTFDB3VuaTFFQkUHdW5pMUVDNgd1bmkxRUMwB3VuaTFFQzIHdW5pMUVDNAd1bmkwMjA0CkVkb3RhY2NlbnQHdW5pMUVCOAd1bmkxRUJBB3VuaTAyMDYHRW1hY3Jvbgd1bmkxRTE2B3VuaTFFMTQHRW9nb25lawd1bmkxRUJDB3VuaTFFMUUGR2Nhcm9uC0djaXJjdW1mbGV4B3VuaTAxMjIKR2RvdGFjY2VudAd1bmkxRTIwBEhiYXIHdW5pMUUyQQtIY2lyY3VtZmxleAd1bmkxRTI0BklicmV2ZQd1bmkwMjA4B3VuaTFFMkUHdW5pMUVDQQd1bmkxRUM4B3VuaTAyMEEHSW1hY3JvbgdJb2dvbmVrBkl0aWxkZQtKY2lyY3VtZmxleAd1bmkwMTM2BkxhY3V0ZQZMY2Fyb24HdW5pMDEzQgRMZG90B3VuaTFFMzYHdW5pMUUzQQd1bmkxRTQwB3VuaTFFNDIGTmFjdXRlBk5jYXJvbgd1bmkwMTQ1B3VuaTFFNDQHdW5pMUU0NgNFbmcHdW5pMUU0OAZPYnJldmUHdW5pMUVEMAd1bmkxRUQ4B3VuaTFFRDIHdW5pMUVENAd1bmkxRUQ2B3VuaTAyMEMHdW5pMDIyQQd1bmkwMjMwB3VuaTFFQ0MHdW5pMUVDRQVPaG9ybgd1bmkxRURBB3VuaTFFRTIHdW5pMUVEQwd1bmkxRURFB3VuaTFFRTANT2h1bmdhcnVtbGF1dAd1bmkwMjBFB09tYWNyb24HdW5pMUU1Mgd1bmkxRTUwB3VuaTAxRUELT3NsYXNoYWN1dGUHdW5pMUU0Qwd1bmkxRTRFB3VuaTAyMkMHdW5pMUU1NgZSYWN1dGUGUmNhcm9uB3VuaTAxNTYHdW5pMDIxMAd1bmkxRTVBB3VuaTAyMTIHdW5pMUU1RQZTYWN1dGUHdW5pMUU2NAd1bmkxRTY2C1NjaXJjdW1mbGV4B3VuaTAyMTgHdW5pMUU2MAd1bmkxRTYyB3VuaTFFNjgHdW5pMUU5RQd1bmkwMThGBFRiYXIGVGNhcm9uB3VuaTAxNjIHdW5pMDIxQQd1bmkxRTZBB3VuaTFFNkMHdW5pMUU2RQZVYnJldmUHdW5pMDIxNAd1bmkxRUU0B3VuaTFFRTYFVWhvcm4HdW5pMUVFOAd1bmkxRUYwB3VuaTFFRUEHdW5pMUVFQwd1bmkxRUVFDVVodW5nYXJ1bWxhdXQHdW5pMDIxNgdVbWFjcm9uB3VuaTFFN0EHVW9nb25lawVVcmluZwZVdGlsZGUHdW5pMUU3OAZXYWN1dGULV2NpcmN1bWZsZXgJV2RpZXJlc2lzBldncmF2ZQtZY2lyY3VtZmxleAd1bmkxRThFB3VuaTFFRjQGWWdyYXZlB3VuaTFFRjYHdW5pMDIzMgd1bmkxRUY4BlphY3V0ZQpaZG90YWNjZW50B3VuaTFFOTIGYWJyZXZlB3VuaTFFQUYHdW5pMUVCNwd1bmkxRUIxB3VuaTFFQjMHdW5pMUVCNQd1bmkxRUE1B3VuaTFFQUQHdW5pMUVBNwd1bmkxRUE5B3VuaTFFQUIHdW5pMDIwMQd1bmkxRUExB3VuaTFFQTMHdW5pMDIwMwdhbWFjcm9uB2FvZ29uZWsKYXJpbmdhY3V0ZQdhZWFjdXRlB3VuaTFFMDMHdW5pMUUwOQtjY2lyY3VtZmxleApjZG90YWNjZW50BmRjYXJvbgd1bmkxRTBCB3VuaTFFMEQHdW5pMUUwRgZlYnJldmUGZWNhcm9uB3VuaTFFMUQHdW5pMUVCRgd1bmkxRUM3B3VuaTFFQzEHdW5pMUVDMwd1bmkxRUM1B3VuaTAyMDUKZWRvdGFjY2VudAd1bmkxRUI5B3VuaTFFQkIHdW5pMDIwNwdlbWFjcm9uB3VuaTFFMTcHdW5pMUUxNQdlb2dvbmVrB3VuaTFFQkQHdW5pMDI1OQd1bmkxRTFGBmdjYXJvbgtnY2lyY3VtZmxleAd1bmkwMTIzCmdkb3RhY2NlbnQHdW5pMUUyMQRoYmFyB3VuaTFFMkILaGNpcmN1bWZsZXgHdW5pMUUyNQZpYnJldmUHdW5pMDIwOQd1bmkxRTJGCWkubG9jbFRSSwd1bmkxRUNCB3VuaTFFQzkHdW5pMDIwQgdpbWFjcm9uB2lvZ29uZWsGaXRpbGRlB3VuaTAyMzcLamNpcmN1bWZsZXgHdW5pMDEzNwxrZ3JlZW5sYW5kaWMGbGFjdXRlBmxjYXJvbgd1bmkwMTNDBGxkb3QHdW5pMUUzNwd1bmkxRTNCB3VuaTFFNDEHdW5pMUU0MwZuYWN1dGUGbmNhcm9uB3VuaTAxNDYHdW5pMUU0NQd1bmkxRTQ3A2VuZwd1bmkxRTQ5Bm9icmV2ZQd1bmkxRUQxB3VuaTFFRDkHdW5pMUVEMwd1bmkxRUQ1B3VuaTFFRDcHdW5pMDIwRAd1bmkwMjJCB3VuaTAyMzEHdW5pMUVDRAd1bmkxRUNGBW9ob3JuB3VuaTFFREIHdW5pMUVFMwd1bmkxRUREB3VuaTFFREYHdW5pMUVFMQ1vaHVuZ2FydW1sYXV0B3VuaTAyMEYHb21hY3Jvbgd1bmkxRTUzB3VuaTFFNTEHdW5pMDFFQgtvc2xhc2hhY3V0ZQd1bmkxRTREB3VuaTFFNEYHdW5pMDIyRAd1bmkxRTU3BnJhY3V0ZQZyY2Fyb24HdW5pMDE1Nwd1bmkwMjExB3VuaTFFNUIHdW5pMDIxMwd1bmkxRTVGBnNhY3V0ZQd1bmkxRTY1B3VuaTFFNjcLc2NpcmN1bWZsZXgHdW5pMDIxOQd1bmkxRTYxB3VuaTFFNjMHdW5pMUU2OQR0YmFyBnRjYXJvbgd1bmkwMTYzB3VuaTAyMUIHdW5pMUU5Nwd1bmkxRTZCB3VuaTFFNkQHdW5pMUU2RgZ1YnJldmUHdW5pMDIxNQd1bmkxRUU1B3VuaTFFRTcFdWhvcm4HdW5pMUVFOQd1bmkxRUYxB3VuaTFFRUIHdW5pMUVFRAd1bmkxRUVGDXVodW5nYXJ1bWxhdXQHdW5pMDIxNwd1bWFjcm9uB3VuaTFFN0IHdW9nb25lawV1cmluZwZ1dGlsZGUHdW5pMUU3OQZ3YWN1dGULd2NpcmN1bWZsZXgJd2RpZXJlc2lzBndncmF2ZQt5Y2lyY3VtZmxleAd1bmkxRThGB3VuaTFFRjUGeWdyYXZlB3VuaTFFRjcHdW5pMDIzMwd1bmkxRUY5BnphY3V0ZQp6ZG90YWNjZW50B3VuaTFFOTMDY19oA2NfawNjX3QDZl9mBWZfZl9pBWZfZl9sA2ZfdANmX3kDc190A3RfdAN0X3kPZ2VybWFuZGJscy5zbWNwBmEuc21jcAthYWN1dGUuc21jcAthYnJldmUuc21jcAx1bmkxRUFGLnNtY3AMdW5pMUVCNy5zbWNwDHVuaTFFQjEuc21jcAx1bmkxRUIzLnNtY3AMdW5pMUVCNS5zbWNwEGFjaXJjdW1mbGV4LnNtY3AMdW5pMUVBNS5zbWNwDHVuaTFFQUQuc21jcAx1bmkxRUE3LnNtY3AMdW5pMUVBOS5zbWNwDHVuaTFFQUIuc21jcAx1bmkwMjAxLnNtY3AOYWRpZXJlc2lzLnNtY3AMdW5pMUVBMS5zbWNwC2FncmF2ZS5zbWNwDHVuaTFFQTMuc21jcAx1bmkwMjAzLnNtY3AMYW1hY3Jvbi5zbWNwDGFvZ29uZWsuc21jcAphcmluZy5zbWNwD2FyaW5nYWN1dGUuc21jcAthdGlsZGUuc21jcAdhZS5zbWNwDGFlYWN1dGUuc21jcAZiLnNtY3AQb3JkZmVtaW5pbmUuc21jcBFvcmRtYXNjdWxpbmUuc21jcAx1bmkxRTAzLnNtY3AGYy5zbWNwC2NhY3V0ZS5zbWNwC2NjYXJvbi5zbWNwDWNjZWRpbGxhLnNtY3AMdW5pMUUwOS5zbWNwEGNjaXJjdW1mbGV4LnNtY3APY2RvdGFjY2VudC5zbWNwBmQuc21jcAhldGguc21jcAtkY2Fyb24uc21jcAtkY3JvYXQuc21jcAx1bmkxRTBCLnNtY3AMdW5pMUUwRC5zbWNwDHVuaTFFMEYuc21jcAZlLnNtY3ALZWFjdXRlLnNtY3ALZWJyZXZlLnNtY3ALZWNhcm9uLnNtY3AMdW5pMUUxRC5zbWNwEGVjaXJjdW1mbGV4LnNtY3AMdW5pMUVCRi5zbWNwDHVuaTFFQzcuc21jcAx1bmkxRUMxLnNtY3AMdW5pMUVDMy5zbWNwDHVuaTFFQzUuc21jcAx1bmkwMjA1LnNtY3AOZWRpZXJlc2lzLnNtY3APZWRvdGFjY2VudC5zbWNwDHVuaTFFQjkuc21jcAtlZ3JhdmUuc21jcAx1bmkxRUJCLnNtY3AMdW5pMDIwNy5zbWNwDGVtYWNyb24uc21jcAx1bmkxRTE3LnNtY3AMdW5pMUUxNS5zbWNwDGVvZ29uZWsuc21jcAx1bmkxRUJELnNtY3AMdW5pMDI1OS5zbWNwBmYuc21jcAx1bmkxRTFGLnNtY3AGZy5zbWNwC2dicmV2ZS5zbWNwC2djYXJvbi5zbWNwEGdjaXJjdW1mbGV4LnNtY3AMdW5pMDEyMy5zbWNwD2dkb3RhY2NlbnQuc21jcAx1bmkxRTIxLnNtY3AGaC5zbWNwCWhiYXIuc21jcAx1bmkxRTJCLnNtY3AQaGNpcmN1bWZsZXguc21jcAx1bmkxRTI1LnNtY3AGaS5zbWNwC2lhY3V0ZS5zbWNwC2licmV2ZS5zbWNwEGljaXJjdW1mbGV4LnNtY3AMdW5pMDIwOS5zbWNwDmlkaWVyZXNpcy5zbWNwDHVuaTFFMkYuc21jcA5pLmxvY2xUUksuc21jcAx1bmkxRUNCLnNtY3ALaWdyYXZlLnNtY3AMdW5pMUVDOS5zbWNwDHVuaTAyMEIuc21jcAxpbWFjcm9uLnNtY3AMaW9nb25lay5zbWNwC2l0aWxkZS5zbWNwBmouc21jcBBqY2lyY3VtZmxleC5zbWNwBmsuc21jcAx1bmkwMTM3LnNtY3ARa2dyZWVubGFuZGljLnNtY3AGbC5zbWNwC2xhY3V0ZS5zbWNwC2xjYXJvbi5zbWNwDHVuaTAxM0Muc21jcAlsZG90LnNtY3AMdW5pMUUzNy5zbWNwDHVuaTFFM0Iuc21jcAtsc2xhc2guc21jcAZtLnNtY3AMdW5pMUU0MS5zbWNwDHVuaTFFNDMuc21jcAZuLnNtY3ALbmFjdXRlLnNtY3ALbmNhcm9uLnNtY3AMdW5pMDE0Ni5zbWNwDHVuaTFFNDUuc21jcAx1bmkxRTQ3LnNtY3AIZW5nLnNtY3AMdW5pMUU0OS5zbWNwC250aWxkZS5zbWNwBm8uc21jcAtvYWN1dGUuc21jcAtvYnJldmUuc21jcBBvY2lyY3VtZmxleC5zbWNwDHVuaTFFRDEuc21jcAx1bmkxRUQ5LnNtY3AMdW5pMUVEMy5zbWNwDHVuaTFFRDUuc21jcAx1bmkxRUQ3LnNtY3AMdW5pMDIwRC5zbWNwDm9kaWVyZXNpcy5zbWNwDHVuaTAyMkIuc21jcAx1bmkwMjMxLnNtY3AMdW5pMUVDRC5zbWNwC29ncmF2ZS5zbWNwDHVuaTFFQ0Yuc21jcApvaG9ybi5zbWNwDHVuaTFFREIuc21jcAx1bmkxRUUzLnNtY3AMdW5pMUVERC5zbWNwDHVuaTFFREYuc21jcAx1bmkxRUUxLnNtY3ASb2h1bmdhcnVtbGF1dC5zbWNwDHVuaTAyMEYuc21jcAxvbWFjcm9uLnNtY3AMdW5pMUU1My5zbWNwDHVuaTFFNTEuc21jcAx1bmkwMUVCLnNtY3ALb3NsYXNoLnNtY3AQb3NsYXNoYWN1dGUuc21jcAtvdGlsZGUuc21jcAx1bmkxRTRELnNtY3AMdW5pMUU0Ri5zbWNwDHVuaTAyMkQuc21jcAdvZS5zbWNwBnAuc21jcAx1bmkxRTU3LnNtY3AKdGhvcm4uc21jcAZxLnNtY3AGci5zbWNwC3JhY3V0ZS5zbWNwC3JjYXJvbi5zbWNwDHVuaTAxNTcuc21jcAx1bmkwMjExLnNtY3AMdW5pMUU1Qi5zbWNwDHVuaTAyMTMuc21jcAx1bmkxRTVGLnNtY3AGcy5zbWNwC3NhY3V0ZS5zbWNwDHVuaTFFNjUuc21jcAtzY2Fyb24uc21jcAx1bmkxRTY3LnNtY3ANc2NlZGlsbGEuc21jcBBzY2lyY3VtZmxleC5zbWNwDHVuaTAyMTkuc21jcAx1bmkxRTYxLnNtY3AMdW5pMUU2My5zbWNwDHVuaTFFNjkuc21jcAZ0LnNtY3AJdGJhci5zbWNwC3RjYXJvbi5zbWNwDHVuaTAxNjMuc21jcAx1bmkwMjFCLnNtY3AMdW5pMUU2Qi5zbWNwDHVuaTFFNkQuc21jcAx1bmkxRTZGLnNtY3AGdS5zbWNwC3VhY3V0ZS5zbWNwC3VicmV2ZS5zbWNwEHVjaXJjdW1mbGV4LnNtY3AMdW5pMDIxNS5zbWNwDnVkaWVyZXNpcy5zbWNwDHVuaTFFRTUuc21jcAt1Z3JhdmUuc21jcAx1bmkxRUU3LnNtY3AKdWhvcm4uc21jcAx1bmkxRUU5LnNtY3AMdW5pMUVGMS5zbWNwDHVuaTFFRUIuc21jcAx1bmkxRUVELnNtY3AMdW5pMUVFRi5zbWNwEnVodW5nYXJ1bWxhdXQuc21jcAx1bmkwMjE3LnNtY3AMdW1hY3Jvbi5zbWNwDHVuaTFFN0Iuc21jcAx1b2dvbmVrLnNtY3AKdXJpbmcuc21jcAt1dGlsZGUuc21jcAx1bmkxRTc5LnNtY3AGdi5zbWNwBncuc21jcAt3YWN1dGUuc21jcBB3Y2lyY3VtZmxleC5zbWNwDndkaWVyZXNpcy5zbWNwC3dncmF2ZS5zbWNwBnguc21jcAZ5LnNtY3ALeWFjdXRlLnNtY3AQeWNpcmN1bWZsZXguc21jcA55ZGllcmVzaXMuc21jcAx1bmkxRThGLnNtY3AMdW5pMUVGNS5zbWNwC3lncmF2ZS5zbWNwDHVuaTFFRjcuc21jcAx1bmkwMjMzLnNtY3AMdW5pMUVGOS5zbWNwBnouc21jcAt6YWN1dGUuc21jcAt6Y2Fyb24uc21jcA96ZG90YWNjZW50LnNtY3AMdW5pMUU5My5zbWNwB3VuaTAzQTkHdW5pMDNCQw90d28uZGVub21pbmF0b3IQZm91ci5kZW5vbWluYXRvcg1vbmUubnVtZXJhdG9yD3RocmVlLm51bWVyYXRvcgl6ZXJvLnplcm8JemVyby5zdWJzCG9uZS5zdWJzCHR3by5zdWJzB3VuaTIwODAHdW5pMjA4MQd1bmkyMDgyB3VuaTIwODMHdW5pMjA4NAd1bmkyMDg1B3VuaTIwODYHdW5pMjA4Nwd1bmkyMDg4B3VuaTIwODkKdGhyZWUuc3Vicwlmb3VyLnN1YnMJZml2ZS5zdWJzCHNpeC5zdWJzCnNldmVuLnN1YnMKZWlnaHQuc3VicwluaW5lLnN1YnMHdW5pMjA3MAd1bmkwMEI5B3VuaTAwQjIHdW5pMDBCMwd1bmkyMDc0B3VuaTIwNzUHdW5pMjA3Ngd1bmkyMDc3B3VuaTIwNzgHdW5pMjA3OQl6ZXJvLnNtY3AIb25lLnNtY3AIdHdvLnNtY3AKdGhyZWUuc21jcAlmb3VyLnNtY3AJZml2ZS5zbWNwCHNpeC5zbWNwCnNldmVuLnNtY3AKZWlnaHQuc21jcAluaW5lLnNtY3AOemVyby56ZXJvLnNtY3AOYmFja3NsYXNoLmNhc2UTcGVyaW9kY2VudGVyZWQuY2FzZQtidWxsZXQuY2FzZQ9leGNsYW1kb3duLmNhc2UbcGVyaW9kY2VudGVyZWQubG9jbENBVC5jYXNlEXF1ZXN0aW9uZG93bi5jYXNlCnNsYXNoLmNhc2UWcGVyaW9kY2VudGVyZWQubG9jbENBVA5icmFjZWxlZnQuY2FzZQ9icmFjZXJpZ2h0LmNhc2UQYnJhY2tldGxlZnQuY2FzZRFicmFja2V0cmlnaHQuY2FzZQ5wYXJlbmxlZnQuY2FzZQ9wYXJlbnJpZ2h0LmNhc2UKZmlndXJlZGFzaAd1bmkyMDE1B3VuaTIwMTAHdW5pMDBBRAtlbWRhc2guY2FzZQtlbmRhc2guY2FzZQtoeXBoZW4uY2FzZQx1bmkwMEFELmNhc2USZ3VpbHNpbmdsbGVmdC5jYXNlE2d1aWxzaW5nbHJpZ2h0LmNhc2UNYXN0ZXJpc2suc21jcBNwZXJpb2RjZW50ZXJlZC5zbWNwDmJyYWNlbGVmdC5zbWNwD2JyYWNlcmlnaHQuc21jcBBicmFja2V0bGVmdC5zbWNwEWJyYWNrZXRyaWdodC5zbWNwC2J1bGxldC5zbWNwC2VtZGFzaC5zbWNwC2VuZGFzaC5zbWNwC2V4Y2xhbS5zbWNwD2V4Y2xhbWRvd24uc21jcAtoeXBoZW4uc21jcBtwZXJpb2RjZW50ZXJlZC5sb2NsQ0FULnNtY3APbnVtYmVyc2lnbi5zbWNwDnBhcmVubGVmdC5zbWNwD3BhcmVucmlnaHQuc21jcA1xdWVzdGlvbi5zbWNwEXF1ZXN0aW9uZG93bi5zbWNwDXF1b3RlZGJsLnNtY3ARcXVvdGVkYmxiYXNlLnNtY3ARcXVvdGVkYmxsZWZ0LnNtY3AScXVvdGVkYmxyaWdodC5zbWNwDnF1b3RlbGVmdC5zbWNwD3F1b3RlcmlnaHQuc21jcBNxdW90ZXNpbmdsYmFzZS5zbWNwEHF1b3Rlc2luZ2xlLnNtY3AMdW5pMDBBRC5zbWNwB3VuaTIwMDcHdW5pMjAwQQd1bmkyMDA4B3VuaTAwQTAHdW5pMjAwOQd1bmkyMDBCAkNSB3VuaTIwQjUNY29sb25tb25ldGFyeQRkb25nBEV1cm8HdW5pMjBCMgd1bmkyMEFEBGxpcmEHdW5pMjBCQQd1bmkyMEJDB3VuaTIwQTYGcGVzZXRhB3VuaTIwQjEHdW5pMjBCRAd1bmkyMEI5B3VuaTIwQTkHdW5pMjIxOQd1bmkyMjE1CGVtcHR5c2V0B3VuaTIxMjYHdW5pMjIwNgd1bmkwMEI1B3VuaTIxMTMHdW5pMjExNgllc3RpbWF0ZWQGbWludXRlBnNlY29uZAdhdC5jYXNlB2F0LnNtY3AOYW1wZXJzYW5kLnNtY3ALZGVncmVlLnNtY3AMdW5pMjBCNS5zbWNwEmNvbG9ubW9uZXRhcnkuc21jcAtkb2xsYXIuc21jcAlkb25nLnNtY3AJRXVyby5zbWNwCmZyYW5jLnNtY3AMdW5pMjBCMi5zbWNwDHVuaTIwQUQuc21jcAlsaXJhLnNtY3AMdW5pMjBCQS5zbWNwDHVuaTIwQkMuc21jcAx1bmkyMEE2LnNtY3AMcGVyY2VudC5zbWNwEHBlcnRob3VzYW5kLnNtY3ALcGVzZXRhLnNtY3AMdW5pMjBCMS5zbWNwDHVuaTIwQkQuc21jcAx1bmkyMEI5LnNtY3ANc3Rlcmxpbmcuc21jcAx1bmkyMEE5LnNtY3AIeWVuLnNtY3ALZmxvcmluLnNtY3AHdW5pMDMwOAd1bmkwMzA3CWdyYXZlY29tYglhY3V0ZWNvbWIHdW5pMDMwQgt1bmkwMzBDLmFsdAd1bmkwMzAyB3VuaTAzMEMHdW5pMDMwNgd1bmkwMzBBCXRpbGRlY29tYgd1bmkwMzA0DWhvb2thYm92ZWNvbWIHdW5pMDMwRgd1bmkwMzExB3VuaTAzMTIHdW5pMDMxQgxkb3RiZWxvd2NvbWIHdW5pMDMyNAd1bmkwMzI2B3VuaTAzMjcHdW5pMDMyOAd1bmkwMzJFB3VuaTAzMzEHdW5pMDMzNQx1bmkwMzA4LmNhc2UMdW5pMDMwNy5jYXNlDmdyYXZlY29tYi5jYXNlDmFjdXRlY29tYi5jYXNlDHVuaTAzMEIuY2FzZQx1bmkwMzAyLmNhc2UMdW5pMDMwQy5jYXNlDHVuaTAzMDYuY2FzZQx1bmkwMzBBLmNhc2UOdGlsZGVjb21iLmNhc2UMdW5pMDMwNC5jYXNlEmhvb2thYm92ZWNvbWIuY2FzZQx1bmkwMzBGLmNhc2UMdW5pMDMxMS5jYXNlDHVuaTAzMTIuY2FzZQx1bmkwMzFCLmNhc2URZG90YmVsb3djb21iLmNhc2UMdW5pMDMyNC5jYXNlDHVuaTAzMjYuY2FzZQx1bmkwMzI3LmNhc2UMdW5pMDMyOC5jYXNlDHVuaTAzMkUuY2FzZQx1bmkwMzMxLmNhc2UHdW5pMDJCQwd1bmkwMkJCB3VuaTAyQkEHdW5pMDJDOQd1bmkwMkNCB3VuaTAyQjkHdW5pMDJCRgd1bmkwMkJFB3VuaTAyQ0EHdW5pMDJDQwd1bmkwMkM4C3VuaTAzMDYwMzAxC3VuaTAzMDYwMzAwC3VuaTAzMDYwMzA5C3VuaTAzMDYwMzAzC3VuaTAzMDIwMzAxC3VuaTAzMDIwMzAwC3VuaTAzMDIwMzA5C3VuaTAzMDIwMzAzAAAAAAEAAf//AA8AAQAAAAwAAAAAAAAAAgBXAAEAAQABABoAGgABABwAHAABAB4AHgABACUAJQABACwALAABAEMAQwABAEUARQABAEwATAABAFEAUQABAGAAYAABAGIAYgABAGQAZAABAGwAbAABAG8AbwABAHgAeAABAIgAiAABAJQAlAABAJsAmwABAJ8AnwABAKcApwABALQAtAABALwAvAABAMUAxQABANQA1AABANkA2gABAOQA5AABAOkA6QABAQIBAgABAQQBBAABAQYBBgABAQ0BDQABARQBFAABASwBLAABAS4BLgABATUBNQABAToBOwABAUsBSwABAU0BTQABAVABUAABAVgBWAABAVsBWwABAWQBZAABAXQBdAABAYABgAABAYcBhwABAYsBiwABAZMBkwABAZ8BnwABAagBqAABAbEBsQABAcABwAABAcYBxgABAdAB0AABAeMB4wABAfwB/AABAf4B/gABAgICAgABAgkCCQABAhACEAABAigCKAABAioCKgABAjECMQABAjYCNgABAkUCRQABAkcCRwABAkoCSgABAlICUgABAlUCVQABAl4CXgABAm4CbgABAnoCegABAoECgQABAoUChQABAo0CjQABApgCmAABAqACoAABAqkCqQABArgCuAABAr0CvgABAsgCyAABAyQDJAADAycDJwADA80D0QADA9MD5AADA+YD/AADBBUEHAADAAAAAQAAAAoAJgBAAAJERkxUAA5sYXRuAA4ABAAAAAD//wACAAAAAQACa2VybgAObWFyawAUAAAAAQAAAAAAAQABAAIABjXmAAIACAACAAoe5gABAoIABAAAATwDjgOOA44DjgOOA44DjgOOA44DjgOOA44DjgOOA44DjgOOA44DjgOOA44DjgOOA44DjgOkBaYPeg96D3oPeg96D3oPegjoCOgI+g/uD+4JPAk8CTwJPAk8CTwJPAlKD3oPeg96D3oPeg96D3oPeg96D3oPeg96D3oPeg96D3oPeg96D3oPeg96D3oPeg96D3oPeg96D3oPeg96D3oPeg96D3oRPhE+D3oPdA90D3QPdA90D3QPdA90D3QPdA90D3oPiA+ID4gPiA+ID4gPiA+iD6IPog+iD6IPog+iD6IPog+iD6IPog+iD6IPog+iD6IPog+iD6IPog+iD6IPqA+oD6gPqA+oD6gP7g/4D/gP+A/4D/gP+A/4D/gP+A/4ECYRPhE+EVIRUhN4E3gTeBN4E3gTeBN4EFgQphE+ET4RPhE+ET4RPhE+ET4RPhE+ET4RPhE+ET4RPhE+ET4RPhE+ET4RPhE+ET4TfhNaE1oQehB6EHoQehB6EHoQehCEEKYQtBN+E34TfhN+E34TfhN+E34TfhN+E34TfhN+E34TfhN+E34TfhN+E34TfhN+E34TfhN+E34TfhN+E34TfhN+E34RPhFSEVIRUhFEEUQRRBFEEUQRRBFEEUQRUhFSEVIRUhFSEVIRUhFSEVIRUhFSEVgTeBN4E3gTeBN4E3gTeBN4E3gRehF6EXoRehF6EXoRhBN+E34TfhN+E34TfhN+E34TfhN+E3gTWhN4E34TeBN4E34ThBSuFOwVIha0FtoW7BcWF3gZxh6wHrAaoB42HpQelB6UHsYemh7GHsYexh7GHsYexh7GHrAesB6wHrAexh7GHsYexgACACwAAQAZAAAAHAAcABkAHgAeABoAJQArABsAQwBFACIAYgBnACUAaQBsACsAeACZAC8AmwCcAFEAngCeAFMApwCxAFQAswC0AF8AtgDkAGEBAgEMAJABDgEPAJsBFAE0AJ0BUAFQAL4BUgFSAL8BVwFXAMABZAF/AMEBggGJAN0BiwGnAOUBvwHPAQIB1wHYARMB2wHcARUB3wHhARcCAgICARoC1gLXARsC2QLbAR0DDwMPASADEgMTASEDGAMYASMDGwMcASQDHgMfASYDKAMoASgDKgMqASkDLAMsASoDNAM1ASsDNwM5AS0DOwM+ATADRANHATQDUgNTATgDVgNWAToDZQNlATsABQEs//YCSv/2Atn/7ALb//YDGf/iAIABLv/2AS//9gEw//YBMf/2ATL/9gEz//YBNP/2AeP/7AHk/+wB5f/sAeb/7AHn/+wB6P/sAen/7AHq/+wB6//sAez/7AHt/+wB7v/sAe//7AHw/+wB8f/sAfL/7AHz/+wB9P/sAfX/7AH2/+wB9//sAfj/7AH5/+wB+v/sAfv/7AH8/+wB/f/sAgL/7AID/+wCBP/sAgX/7AIG/+wCB//sAgj/7AIQ//YCEf/2AhL/9gIT//YCFP/2AhX/9gIW//YCF//2Ahj/9gIZ//YCGv/2Ahv/9gIc//YCHf/2Ah7/9gIf//YCIP/2AiH/9gIi//YCI//2AiT/9gIl//YCJv/2Aij/9gIq/+wCK//sAiz/7AIt/+wCLv/sAi//7AIw/+wCSv/2AlL/7AJe/+wCX//sAmD/7AJh/+wCYv/sAmP/7AJk/+wCZf/sAmb/7AJn/+wCaP/sAmn/7AJq/+wCa//sAmz/7AJt/+wCbv/sAm//7AJw/+wCcf/sAnL/7AJz/+wCdP/sAnX/7AJ2/+wCd//sAnj/7AJ5/+wCev/sAnv/7AJ8/+wCff/sAn7/7AJ//+wCgP/sAoT/7AKY//YCmv/2Apv/9gKc//YCnf/2Ap7/9gKf//YCvf/2Ar7/9gK///YCwP/2AsH/9gLC//YCw//2AsT/9gLF//YCxv/2Asf/9gDQAB7/9gAf//YAIP/2ACH/9gAi//YAI//2ACT/9gAs//YALf/2AC7/9gAv//YAMP/2ADH/9gAy//YAM//2ADT/9gA1//YANv/2ADf/9gA4//YAOf/2ADr/9gA7//YAPP/2AD3/9gA+//YAP//2AED/9gBB//YAQv/2AEP/9gBF//YARv/2AEf/9gBI//YASf/2AEr/9gBL//YAeP/2AHn/9gB6//YAe//2AHz/9gB9//YAfv/2AH//9gCA//YAgf/2AIL/9gCD//YAhP/2AIX/9gCG//YAh//2AIj/9gCJ//YAiv/2AIv/9gCM//YAjf/2AI7/9gCP//YAkP/2AJH/9gCS//YAk//2AJT/9gCV//YAlv/2AJf/9gCY//YAmf/2AJr/9gCe//YBBv/2AQf/9gEI//YBCf/2AQr/9gEL//YBDP/2AWT/9gFl//YBZv/2AWf/9gFo//YBaf/2AWr/9gFr//YBbP/2AW3/9gFu//YBb//2AXD/9gFx//YBcv/2AXP/9gF0//YBdf/2AXb/9gF3//YBeP/2AXn/9gF6//YBe//2AXz/9gF9//YBfv/2AX//9gGC//YBg//2AYT/9gGF//YBhv/2AYr/9gG///YBwP/2AcH/9gHC//YBw//2AcT/9gHG//YBx//2Acj/9gHJ//YByv/2Acv/9gHM//YBzf/2Ac7/9gHP//YB1f/2Adb/9gHX//YCAv/iAgP/4gIE/+ICBf/iAgb/4gIH/+ICCP/iAhD/9gIR//YCEv/2AhP/9gIU//YCFf/2Ahb/9gIX//YCGP/2Ahn/9gIa//YCG//2Ahz/9gId//YCHv/2Ah//9gIg//YCIf/2AiL/9gIj//YCJP/2AiX/9gIm//YCKP/2Air/4gIr/+ICLP/iAi3/4gIu/+ICL//iAjD/4gJe/+ICX//iAmD/4gJh/+ICYv/iAmP/4gJk/+ICZf/iAmb/4gJn/+ICaP/iAmn/4gJq/+ICa//iAmz/4gJt/+ICbv/iAm//4gJw/+ICcf/iAnL/4gJz/+ICdP/iAnX/4gJ2/+ICd//iAnj/4gJ5/+ICev/iAnv/4gJ8/+ICff/iAn7/4gJ//+ICgP/iAoT/4gAEAlL/5wLTABQC1v/iAtkAFAAQAb//7AHA/+wBwf/sAcL/7AHD/+wBxP/sAcb/7AHH/+wByP/sAcn/7AHK/+wBy//sAcz/7AHN/+wBzv/sAc//7AADASz/7ALZ/+IDGf/iAYoAHv/sAB//7AAg/+wAIf/sACL/7AAj/+wAJP/sACz/7AAt/+wALv/sAC//7AAw/+wAMf/sADL/7AAz/+wANP/sADX/7AA2/+wAN//sADj/7AA5/+wAOv/sADv/7AA8/+wAPf/sAD7/7AA//+wAQP/sAEH/7ABC/+wAQ//sAEX/7ABG/+wAR//sAEj/7ABJ/+wASv/sAEv/7AB4/+wAef/sAHr/7AB7/+wAfP/sAH3/7AB+/+wAf//sAID/7ACB/+wAgv/sAIP/7ACE/+wAhf/sAIb/7ACH/+wAiP/sAIn/7ACK/+wAi//sAIz/7ACN/+wAjv/sAI//7ACQ/+wAkf/sAJL/7ACT/+wAlP/sAJX/7ACW/+wAl//sAJj/7ACZ/+wAmv/sAJ7/7AC0/+IAtv/iALf/4gC4/+IAuf/iALr/4gC7/+IAvP/iAL3/4gC+/+IAv//iAMD/4gDB/+IAwv/iAMP/4gDE/+IAxf/iAMb/4gDH/+IAyP/iAMn/4gDK/+IAy//iAMz/4gDN/+IAzv/iAM//4gDQ/+IA0f/iANL/4gDT/+IA1P/iANX/4gDW/+IA1//iANj/4gDa/9gA2//YANz/2ADd/9gA3v/YAN//2ADg/9gA4f/YAOL/2ADj/9gA6f/2AOr/9gDr//YA7P/2AO3/9gDu//YA7//2APD/9gDx//YA8v/2APP/9gD0//YA9f/2APb/9gD3//YA+P/2APn/9gD6//YA+//2APz/9gD9//YA/v/2AP//9gEA//YBAf/2AQb/9gEH//YBCP/2AQn/9gEK//YBC//2AQz/9gEN//YBD//2ARD/9gER//YBEv/2ARP/9gEU//YBFf/2ARb/9gEX//YBGP/2ARn/9gEa//YBG//2ARz/9gEd//YBHv/2AR//9gEg//YBIf/2ASL/9gEj//YBJP/2ASX/9gEm//YBJ//2ASj/9gEp//YBKv/2ASz/9gEu//YBL//2ATD/9gEx//YBMv/2ATP/9gE0//YBZP/2AWX/9gFm//YBZ//2AWj/9gFp//YBav/2AWv/9gFs//YBbf/2AW7/9gFv//YBcP/2AXH/9gFy//YBc//2AXT/9gF1//YBdv/2AXf/9gF4//YBef/2AXr/9gF7//YBfP/2AX3/9gF+//YBf//2AYL/9gGD//YBhP/2AYX/9gGG//YBiv/2AZP/9gGU//YBlf/2AZb/9gGX//YBmP/2AZn/9gGa//YBm//2AZz/9gGd//YBn//sAaD/7AGh/+wBov/sAaP/7AGk/+wBpf/sAab/7AGn/+wBqP/2Aan/9gGq//YBq//2Aaz/9gGt//YBrv/2Aa//9gGw//YBsf/2AbL/9gGz//YBtP/2AbX/9gG2//YBt//2Abj/9gG5//YBuv/2Abv/9gG8//YBvf/2Ab7/9gG//+wBwP/sAcH/7AHC/+wBw//sAcT/7AHG/+wBx//sAcj/7AHJ/+wByv/sAcv/7AHM/+wBzf/sAc7/7AHP/+wB1f/2Adb/9gHX//YB3//2AeD/7AHh/+wCAv/sAgP/7AIE/+wCBf/sAgb/7AIH/+wCCP/sAir/7AIr/+wCLP/sAi3/7AIu/+wCL//sAjD/7AJK//YCXv/sAl//7AJg/+wCYf/sAmL/7AJj/+wCZP/sAmX/7AJm/+wCZ//sAmj/7AJp/+wCav/sAmv/7AJs/+wCbf/sAm7/7AJv/+wCcP/sAnH/7AJy/+wCc//sAnT/7AJ1/+wCdv/sAnf/7AJ4/+wCef/sAnr/7AJ7/+wCfP/sAn3/7AJ+/+wCf//sAoD/7AKE/+wCmP/sApr/7AKb/+wCnP/sAp3/7AKe/+wCn//sAqD/9gKh//YCov/2AqP/9gKk//YCpf/2Aqb/9gKn//YCqP/2Aqn/9gKq//YCq//2Aqz/9gKt//YCrv/2Aq//9gKw//YCsf/2ArL/9gKz//YCtP/2ArX/9gK2//YCt//sArj/7AK5/+wCuv/sArv/7AK8/+wCvv/sAr//7ALA/+wCwf/sAsL/7ALD/+wCxP/sAsX/7ALG/+wCx//sAxn/4gMb/9gDHP/YA0T/2ANF/9gDRv/YA0f/2AOx/9gDsv/YAAEDGf/2AAMAbP/sAlL/8QMZ//YABgBs/+IB/v/2AlL/zgLTABQC1v/OAtkAFAABAGz/4gARAGz/4gEs//YB/v/sAgn/7AI2/+ICR//iAkr/4gJS/84CVf/2AoH/4gLTAB4C1v/EAtj/4gLZAB4C2v/sAtv/9gMH/7oAAgEs//YCSv/2AAsAbP/YASz/7AGe/9gB/v/OAgn/zgI2/84CR//OAkr/zgJS/7ACVf/OAoH/zgAMASz/7AGf/+wBoP/sAaH/7AGi/+wBo//sAaT/7AGl/+wBpv/sAaf/7AHg/+wB4f/sAAgDG//2Axz/9gNE//YDRf/2A0b/9gNH//YDsf/2A7L/9gACAVcAFAMfAAoACAMb/+IDHP/iA0T/4gNF/+IDRv/iA0f/4gOx/+IDsv/iAAMAUQBmAxUAYgMZAHQAIgEsAAoBVwAPAZ8AFAGgABQBoQAUAaIAFAGjABQBpAAUAaUAFAGmABQBpwAUAb8ACgHAAAoBwQAKAcIACgHDAAoBxAAKAcYACgHHAAoByAAKAckACgHKAAoBywAKAcwACgHNAAoBzgAKAc8ACgHQAAoB0QAKAdIACgHTAAoB1AAKAeAAFAHhABQAAQFXAAoAAwFXABQDHv/EAx//4gABAx7/7AAIAxv/7AMc/+wDRP/sA0X/7ANG/+wDR//sA7H/7AOy/+wAAgFXAAoDHv+6AHUA6f/2AOr/9gDr//YA7P/2AO3/9gDu//YA7//2APD/9gDx//YA8v/2APP/9gD0//YA9f/2APb/9gD3//YA+P/2APn/9gD6//YA+//2APz/9gD9//YA/v/2AP//9gEA//YBAf/2AQb/4gEH/+IBCP/iAQn/4gEK/+IBC//iAQz/4gEN/+IBD//iARD/4gER/+IBEv/iARP/4gEU/+IBFf/iARb/4gEX/+IBGP/iARn/4gEa/+IBG//iARz/4gEd/+IBHv/iAR//4gEg/+IBIf/iASL/4gEj/+IBJP/iASX/4gEm/+IBJ//iASj/4gEp/+IBKv/iAS7/8QEv//EBMP/xATH/8QEy//EBM//xATT/8QFk/+IBZf/iAWb/4gFn/+IBaP/iAWn/4gFq/+IBa//iAWz/4gFt/+IBbv/iAW//4gFw/+IBcf/iAXL/4gFz/+IBdP/iAXX/4gF2/+IBd//iAXj/4gF5/+IBev/iAXv/4gF8/+IBff/iAX7/4gF//+IBgv/iAYP/4gGE/+IBhf/iAYb/4gGK/+IBk//2AZT/9gGV//YBlv/2AZf/9gGY//YBmf/2AZr/9gGb//YBnP/2AZ3/9gHV/+IB1v/iAdf/4gHf//YABwFXAB4DDwAeAxUAFAMZABQDHv/OAx//4gOpAAoAAQFXABQAAQMe/9gASgIC//YCA//2AgT/9gIF//YCBv/2Agf/9gII//YCEP/2AhH/9gIS//YCE//2AhT/9gIV//YCFv/2Ahf/9gIY//YCGf/2Ahr/9gIb//YCHP/2Ah3/9gIe//YCH//2AiD/9gIh//YCIv/2AiP/9gIk//YCJf/2Aib/9gIo//YCKv/2Aiv/9gIs//YCLf/2Ai7/9gIv//YCMP/2Al7/9gJf//YCYP/2AmH/9gJi//YCY//2AmT/9gJl//YCZv/2Amf/9gJo//YCaf/2Amr/9gJr//YCbP/2Am3/9gJu//YCb//2AnD/9gJx//YCcv/2AnP/9gJ0//YCdf/2Anb/9gJ3//YCeP/2Ann/9gJ6//YCe//2Anz/9gJ9//YCfv/2An//9gKA//YChP/2AA8C2f/sAw//zgM0ABQDNQAUAzcAFAM4ABQDOQAUAzsAFAM8ABQDPQAUAz4AFANSABQDUwAUA1YAFANlABQADQM0AAoDNQAKAzcACgM4AAoDOQAKAzsACgM8AAoDPQAKAz4ACgNSAAoDUwAKA1YACgNlAAoAZAAB/9gAAv/YAAP/2AAE/9gABf/YAAb/2AAH/9gACP/YAAn/2AAK/9gAC//YAAz/2AAN/9gADv/YAA//2AAQ/9gAEf/YABL/2AAT/9gAFP/YABX/2AAW/9gAF//YABj/2AAZ/9gAGv/YABv/2AAe//YAH//2ACD/9gAh//YAIv/2ACP/9gAk//YARf/2AEb/9gBH//YASP/2AEn/9gBK//YAS//2AGD/zgBh/84AeP/2AHn/9gB6//YAe//2AHz/9gB9//YAfv/2AH//9gCA//YAgf/2AIL/9gCD//YAhP/2AIX/9gCG//YAh//2AIj/9gCJ//YAiv/2AIv/9gCM//YAjf/2AI7/9gCP//YAkP/2AJH/9gCS//YAk//2AJT/9gCV//YAlv/2AJf/9gCY//YAmf/2AJr/9gCe//YC1v/OAw8ACgMT/6YDFP+mAxj/pgMe/5IDNP/iAzX/4gM3/+IDOP/iAzn/4gM7/+IDPP/iAz3/4gM+/+IDQ/+mA0j/pgNS/+IDU//iA1b/4gNl/+IACQMP/+IDG//sAxz/7ANE/+wDRf/sA0b/7ANH/+wDsf/sA7L/7AAEAGD/9gBh//YDD//2Ax7/4gAKAtP/ugLW/9gC2P/iAtn/xALa/9gC2//OAw//dAMpABQDKwAUAy0AFAAYALT/9gC2//YAt//2ALj/9gC5//YAuv/2ALv/9gDT//EA1P/xANX/8QDW//EA1//xANj/8QDa/+wA2//sANz/7ADd/+wA3v/sAN//7ADg/+wA4f/sAOL/7ADj/+wDHv/sAJMAtP/OALb/zgC3/84AuP/OALn/zgC6/84Au//OANP/2ADU/9gA1f/YANb/2ADX/9gA2P/YANr/xADb/8QA3P/EAN3/xADe/8QA3//EAOD/xADh/8QA4v/EAOP/xAG//8QBwP/EAcH/xAHC/8QBw//EAcT/xAHG/8QBx//EAcj/xAHJ/8QByv/EAcv/xAHM/8QBzf/EAc7/xAHP/8QCAv/sAgP/7AIE/+wCBf/sAgb/7AIH/+wCCP/sAir/7AIr/+wCLP/sAi3/7AIu/+wCL//sAjD/7AJe/+wCX//sAmD/7AJh/+wCYv/sAmP/7AJk/+wCZf/sAmb/7AJn/+wCaP/sAmn/7AJq/+wCa//sAmz/7AJt/+wCbv/sAm//7AJw/+wCcf/sAnL/7AJz/+wCdP/sAnX/7AJ2/+wCd//sAnj/7AJ5/+wCev/sAnv/7AJ8/+wCff/sAn7/7AJ//+wCgP/sAoT/7AKY/7oCmv+6Apv/ugKc/7oCnf+6Ap7/ugKf/7oCoP/iAqH/4gKi/+ICo//iAqT/4gKl/+ICpv/iAqf/4gKo/+ICqf/iAqr/4gKr/+ICrP/iAq3/4gKu/+ICr//iArD/4gKx/+ICsv/iArP/4gK0/+ICtf/iArb/4gK3/7ACuP+wArn/sAK6/7ACu/+wArz/sAK+/6YCv/+mAsD/pgLB/6YCwv+mAsP/pgLE/6YCxf+mAsb/pgLH/6YC0//EAtb/9gLZ/8QC2//2Axv/ugMc/7oDRP+6A0X/ugNG/7oDR/+6A7H/ugOy/7oANgAe/+wAH//sACD/7AAh/+wAIv/sACP/7AAk/+wARf/sAEb/7ABH/+wASP/sAEn/7ABK/+wAS//sAHj/7AB5/+wAev/sAHv/7AB8/+wAff/sAH7/7AB//+wAgP/sAIH/7ACC/+wAg//sAIT/7ACF/+wAhv/sAIf/7ACI/+wAif/sAIr/7ACL/+wAjP/sAI3/7ACO/+wAj//sAJD/7ACR/+wAkv/sAJP/7ACU/+wAlf/sAJb/7ACX/+wAmP/sAJn/7ACa/+wAnv/sAtP/ugMp/+wDK//sAy3/7ADlAOn/xADq/8QA6//EAOz/xADt/8QA7v/EAO//xADw/8QA8f/EAPL/xADz/8QA9P/EAPX/xAD2/8QA9//EAPj/xAD5/8QA+v/EAPv/xAD8/8QA/f/EAP7/xAD//8QBAP/EAQH/xAEG/7oBB/+6AQj/ugEJ/7oBCv+6AQv/ugEM/7oBDf+wAQ//sAEQ/7ABEf+wARL/sAET/7ABFP+6ARX/ugEW/7oBF/+6ARj/ugEZ/7oBGv+6ARv/ugEc/7oBHf+6AR7/ugEf/7oBIP+6ASH/ugEi/7oBI/+6AST/ugEl/7oBJv+6ASf/ugEo/7oBKf+6ASr/ugEs/+IBLv+cAS//nAEw/5wBMf+cATL/nAEz/5wBNP+cAVj/2AFa/9gBW//YAVz/2AFd/9gBXv/YAV//2AFg/9gBYf/YAWL/2AFj/9gBZP+6AWX/ugFm/7oBZ/+6AWj/ugFp/7oBav+6AWv/ugFs/7oBbf+6AW7/ugFv/7oBcP+6AXH/ugFy/7oBc/+6AXT/ugF1/7oBdv+6AXf/ugF4/7oBef+6AXr/ugF7/7oBfP+6AX3/ugF+/7oBf/+6AYL/ugGD/7oBhP+6AYX/ugGG/7oBh//YAYr/sAGL/9gBjP/YAY3/2AGO/9gBj//YAZD/2AGR/9gBkv/YAZP/xAGU/8QBlf/EAZb/xAGX/8QBmP/EAZn/xAGa/8QBm//EAZz/xAGd/8QBn//sAaD/7AGh/+wBov/sAaP/7AGk/+wBpf/sAab/7AGn/+wBqP/YAan/2AGq/9gBq//YAaz/2AGt/9gBrv/YAa//2AGw/9gBsf/YAbL/2AGz/9gBtP/YAbX/2AG2/9gBt//YAbj/2AG5/9gBuv/YAbv/2AG8/9gBvf/YAb7/2AG//+wBwP/sAcH/7AHC/+wBw//sAcT/7AHF/+wBxv/sAcf/7AHI/+wByf/sAcr/7AHL/+wBzP/sAc3/7AHO/+wBz//sAdD/2AHR/9gB0v/YAdP/2AHU/9gB1f+6Adb/ugHX/7oB3//EAeD/7AHh/+wC1v+wAtkAFALb//YDEv+6AxP/nAMU/5wDGP+cAxsACgMcAAoDHf+6Ax7/dAMpABQDKwAUAy0AFAM0/7oDNf+6Azf/ugM4/7oDOf+6Azv/ugM8/7oDPf+6Az7/ugND/5wDRAAKA0UACgNGAAoDRwAKA0j/nANS/7oDU/+6A1b/ugNl/7oDsQAKA7IACgAXAS4AFAEvABQBMAAUATEAFAEyABQBMwAUATQAFAG//+IBwP/iAcH/4gHC/+IBw//iAcT/4gHG/+IBx//iAcj/4gHJ/+IByv/iAcv/4gHM/+IBzf/iAc7/4gHP/+IAAQEs//YABQLT/+IC1P/sAtYACgLZ/+IDHv/YAAUBDv/iAtb/sALY//YC2v/sAx7/kgAFAtP/4gLU/+wC1gAKAtn/2AMe/9gAAhIOAAQAABL8FOwALwAxAAAAAAAA//b/9v/s//YAAAAAAAD/9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8f/2AAAAAAAA//v/9gAA//H/9gAAAAD/7AAAAAAAAAAAAAD/4v/sAAAAAAAAAAD/5wAAAAAAAAAAAAAAAAAA//YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9v/2AAAAAAAA//sAAAAA//YAAP/sAAAAAAAAAAD/ugAAAAAAAAAA//EAAAAAAAD/+gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/7AAAAAAAAAAAAAAAAAAAAAAAAAAA/+IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/iAAAAAAAAAAAAAAAA/+IAAAAAAAAAAAAAAAAAAAAAAAD/9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//YAAAAAAAAAAAAAAAAAAAAAAAAAAP/sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4gAAAAAAAAAAAAAAAP/s/+wAAAAAAAAAAAAAAAAAAAAAAAD/9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9v/i//EAAAAAAAD/7P/2/+L/8f/2/+wAAP/J//YAAAAAAAD/9v/2/+z/yf/s/9j/sAAA/87/9v/Y/93/8f/OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9gAAAAAAAAAAAAD/8QAAAAAAAP/nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/Y/84AAAAAAAD/2AAAAAD/5wAAAAAAAAAAAAAAAP/iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4v/sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/sAAAAAAAAAAD/9gAAAAAAAAAAAAAAAAAA/+cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/iAAAAAAAAAAD/2AAAAAAAAAAA//EAAAAAAAAAAAAAAAAAAAAA//YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9gAAAAAAAAAAP/dAAAAAP/nAAAAAAAAAAAAAAAAAAAAAP/sAAD/4gAAAAAAAAAA/+IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/iAAAAAAAAAAAAAAAAAAD/9gAAAAAAAAAAAAAAAAAAAAD/9gAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/2AAAAAAAA/+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/xAAAAAAAAAAAAAAAAAAAAAAAAAAD/7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+IAAAAAAAAAAAAAAAD/7P/2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//H/sP+6/8n/sP/E/+L/zgAA/7r/zv/OAAD/xP/Y/87/ugAAAAD/sP/YAAD/uv/iAAD/zgAA/7D/zgAA/7r/4gAA/8QAAP/O/84AAAAAAAD/ugAA/+wAAAAAAAD/zv/iAAAAAP/2AAAAAP/YAAAAAP/nAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/pgAAAAAAAAAA/9gAAAAAAAAAAP/JAAAAAAAAAAAAAAAA/+z/9gAAAAD/9gAAAAAAAP/2//YAAAAAAAAAAAAA//YAAAAAAAAAAAAA//YAAAAAAAAAAP/2AAAAAP/2AAAAAAAAAAAAAAAAAAAAAAAA/+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9MAAAAAAAAAAAAAAAAAAP/sAAAAAAAA/9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/xAAAAAAAAAAAAAP/7AAAAAAAAAAAAAAAAAAD/8QAAAAAAAAAA/84AAAAAAAAAAAAAAAD/7P/dAAD/xP+IAAD/3QAA/9j/5wAA/9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//v/zv/O/87/xP/Y//b/9gAA/87/7AAAAAD/2P/d/+z/zgAAAAD/zv/2AAD/zgAAAAD/7AAK/8QAAAAA/84AAAAA/84AAP+6AAAAAAAAAAD/vwAA//YAAAAAAAD/zgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgAAAAAAAAAAAAD/7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+wAAAAAAAAAAAAAAAAAAAAAAAP/2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/n/7AAAAAAAAD/5wAAAAD/7AAAAAAAAAAAAAAAAP/OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/7AAAAAP/YAAAAAP/2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAD/ugAAAAAAAAAA/9gAAAAAAAAAAP/OAAAAAAAAAAAAAP/2/87/2P/d/87/4v/n/9gAAP/Y/+L/4gAA/+z/5//i/9j/7AAA/87/9gAA/9j/9gAA/+IAAP/Y/+IAAP/Y/+wAAP/YAAD/4v/YAAAAAAAA/7oAAP/xAAAAAAAA//b/7AAAAAD/4v/i/7D/sP/sAAAAAAAA/+IAAP/2AAAAAAAAAAD/7AAAAAAAAAAAAAD/4gAAAAAAAAAA/84AAAAA/+IAAAAA/7oAAAAAAAAAAAAAAAD/nP/sAAAAAAAAAAAAAAAAAAAAAAAA/+wAAAAA/+wAAAAAAAD/7AAAAAAAAAAAAAAAAP/xAAAAAAAAAAAAAP/sAAAAAAAAAAD/4gAAAAD/7AAAAAD/xAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/2AAAAAAAAAAA//YAAAAA/+cAAAAA/+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/EAAAAAAAAAAD/2AAAAAAAAAAA/8kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/7AAAAAAAAAAAAAAAAAAAAAAAAAAA/+IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/iAAAAAAAAAAAAAAAA/+L/4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//YAAAAAAAAAAP/x/+L/5wAAAAD/9v/s//b/9v/n//H/7AAA/9j/4gAA//YAAAAA/+z/7AAA/+f/4gAAAAAAAP/s/+IAAP/n/9gAAAAAAAD/9gAAAAAAAAAAAAD/7AAAAAAAAAAAAAAAAAAAAAD/2AAAAAD/4gAAAAAAAAAAAAAAAP/YAAAAAP/iAAAAAAAAAAAAAAAAAAAAAP/YAAAAAAAAAAr/2AAAAAD/2AAA/+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB4AAAAAAAAAAAAAAAAAAAAA/+wAAAAAAAAAAAAoAAAAAAAAAAAAAAAAABQAAAAAAAAAAP/2AAAAAAAAAAAAAP/xAAAAAAAA//YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9gAAAAAAAP/2/9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9j/5//J/9j/4v/2//YAAP/n//YAAAAAAAD/7P/2/+cAAAAA//YAAAAA/+IAAAAA//YAAP/nAAAAAP/nAAAAAP/TAAAAAAAAAAAAAAAA/7UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//b/yf/YAAAAAAAAAAAAAAAAAAAAAAAKAAAAAAAAAAAAAAAAAAoAAAAAAAAAAAAAAAD/9gAAAAAAAAAAAAD/ugAAAAAAAAAAAAAAAP/OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAABsAAAAAAAAACcAAABsAAAAQwAAABQAAACDAAAAAAAAAAAAAAAAAAAAZgAAAGwAJwAAAAAAAAAAAAAAAAASAAAAAAAAAAAAAAAAAAAAAAAAAAD/2AAAAAD/9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAD//wANAAAAAQACAAQABQAGAAcAEAARABIAEwAUABUAAP//AA4AAAABAAIAAwAFAAYABwAIABAAEQASABMAFAAVAAD//wAOAAAAAQACAAMABQAGAAcACQAQABEAEgATABQAFQAA//8ADgAAAAEAAgADAAUABgAHAAoAEAARABIAEwAUABUAAP//AA4AAAABAAIAAwAFAAYABwALABAAEQASABMAFAAVAAD//wAOAAAAAQACAAMABQAGAAcADAAQABEAEgATABQAFQAA//8ADgAAAAEAAgADAAUABgAHAA0AEAARABIAEwAUABUAAP//AA4AAAABAAIAAwAFAAYABwAOABAAEQASABMAFAAVAAD//wAOAAAAAQACAAMABQAGAAcADwAQABEAEgATABQAFQAWYWFsdACGYzJzYwCOY2FzZQCUY2NtcACaY2NtcACiZGxpZwCsZnJhYwCybGlnYQC4bG9jbAC+bG9jbADEbG9jbADKbG9jbADQbG9jbADWbG9jbADcbG9jbADibG9jbADob3JkbgDuc2luZgD2c21jcAD8c3VicwECc3VwcwEIemVybwEOAAAAAgAAAAEAAAABABoAAAABABwAAAACAAIABQAAAAMAAgAFAAgAAAABAB0AAAABABYAAAABAB4AAAABABIAAAABAAkAAAABABEAAAABAA4AAAABAA0AAAABAAwAAAABAA8AAAABABAAAAACABcAGQAAAAEAFAAAAAEAGwAAAAEAEwAAAAEAFQAAAAEAHwAgAEIFFga0B0QHRAegB9gH2AgkCIIIwAjOCOII4gkECQQJBAkECQQJGAkmCUgJVgmSCdoJ/AoeDPAP2hCKEPQROAABAAAAAQAIAAIEGgIKAeQB5QHmAecB6AHpAeoB6wHsAe0B7gHvAfAB8QHyAfMB9AH1AfYB9wH4AfkB+gH7AfwB/QH+AgECAgIDAgQCBQIGAgcCCAIJAgoCCwIMAg0CDgIPAhACEQISAhMCFAIVAhYCFwIYAhkCGgIbAhwCHQIeAh8CIAIhAiICIwIkAiUCJgIoAikCKgIrAiwCLQIuAi8CMAIxAjICMwI0AjUCNgI3AjgCOQI6AjsCPAI9Aj4CPwJAAkECQgJDAkQCRQJGAkcCSAJKAksCTAJNAk4CTwJQAlECUgJTAlQCVQJWAlcCWAJZAloCWwJcAl0CXwJgAmECYgJjAmQCZQJmAmcCaAJpAmoCawJsAm0CbgJvAnACcQJyAnMCdAJ1AnYCdwJ4AnkCegJ7AnwCfQJ+An8CgAKBAoICgwKEAoUChgKHAogCiQKKAosCjAKNAo4CjwKQApECkwKUApUClgKXAeICJwKYApkCmgKcAp0CngKfAqACoQKiAqMCpAKlAqYCpwKoAqkCqgKrAqwCrQKuAq8CsAKxArICswK0ArUCtgK3ArgCuQK6ArsCvAK9Ar4CvwLAAsECwgLDAsQCxQLGAscCyALJAsoCywLMAeQB5QHmAecB6AHpAeoB6wHsAe0B7gHvAfAB8QHyAfMB9AH1AfYB9wH4AfkB+gH7AfwB/QH+AgECAgIDAgQCBQIGAgcCCAIJAgoCCwIMAg0CDgIPAhACEQISAhMCFAIVAhYCFwIYAhkCGgIbAhwCHQIeAh8CIAIhAiICIwIkAiUCJgInAigCKQIqAisCLAItAi4CLwIwAjECMgIzAjQCNQI3AjgCOQI6AjsCPAI9Aj4CPwJAAkECQgJDAkQCRgJHAkgCSQJKAksCTAJNAk4CTwJQAlECUgJTAlQCVQJWAlcCWAJZAloCWwJcAl0CXwJgAmECYgJjAmQCZQJmAmcCaAJpAmoCawJsAm0CbgJvAnACcQJyAnMCdAJ1AnYCdwJ4AnkCegJ7AnwCfQJ+An8CgAKBAoICgwKEAoUChgKHAogCiQKKAosCjAKNAo4CjwKQApECkwKUApUClgKXAeICmAKZApoCnAKdAp4CnwKgAqECogKjAqQCpQKmAqcCqAKpAqoCqwKsAq0CrgKvArACsQKyArMCtAK1ArYCtwK4ArkCugK7ArwCvQK+Ar8CwALBAsICwwLEAsUCxgLHAsgCyQLKAssCzAH/AgADDQNLAyADVANYA1sDXQNkAyYDVwNJA0oDXgNfA2ADYQNiA2MDtwO4A7kDugO7A8wDvAO9A74DvwPAA8EDwgPFA8YDxwPIA8kDygPLA8MDxAO1A7YD5gPnA+gD6QPqA+sD7APtA+4D7wPwA/ED8gPzA/QD9QP2A/cD+AP5A/oD+wP8AAIAHQACAHcAAAB5AKsAdgCtALYAqQC4AOgAswDqATkA5AE8AUkBNAFMAWMBQgFlAZcBWgGZAaEBjQGjAaMBlgGlAdQBlwLNAs4BxwLgAuAByQMOAw8BygMVAxUBzAMX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ArUCtgK3ArgCuQK6ArsCvAK9Ar4CvwLAAsECwgLDAsQCxQLGAscCyALJAsoCywLMAwMDBAMFAwYDBwMIAwkDCgMLAwwDDQNLA0wDUQNUA1UDWANbA1wDXQNkA1cDTQNOA08DUANZA1oDUgNTA1YDZQNeA18DYANhA2IDYwO3A7gDuQO6A7sDzAO8A70DvgO/A8ADwQPCA8UDxgPHA8gDyQPKA8sDwwPEA7QDtQO2AAIAEwABAOgAAALSAtsA6ALgAuAA8gMOAw4A8wMQAxEA9AMVAxcA9gMZAxwA+QMkAyQA/QMoAy0A/gM0AzUBBAM4AzgBBgM6AzoBBwNDA0gBCANuA24BDgNwA3ABDwNyA4MBEAOeA58BIgOhA6IBJAOoA6gBJgABAAAAAQAIAAICWgEqAeMB5AHlAeYB5wHoAekB6gHrAewB7QHuAe8B8AHxAfIB8wH0AfUB9gH3AfgB+QH6AfsB/AH9Af4CAQICAgMCBAIFAgYCBwIIAgkCCgILAgwCDQIOAg8CEAIRAhICEwIUAhUCFgIXAhgCGQIaAhsCHAIdAh4CHwIgAiECIgIjAiQCJQImAicCKAIpAioCKwIsAi0CLgIvAjACMQIyAjMCNAI1AjYCNwI4AjkCOgI7AjwCPQI+Aj8CQAJBAkICQwJEAkUCRgJHAkgCSQJKAksCTAJNAk4CTwJQAlECUgJTAlQCVQJWAlcCWAJZAloCWwJcAl0CXgJfAmACYQJiAmMCZAJlAmYCZwJoAmkCagJrAmwCbQJuAm8CcAJxAnICcwJ0AnUCdgJ3AngCeQJ6AnsCfAJ9An4CfwKAAoECggKDAoQChQKGAocCiAKJAooCiwKMAo0CjgKPApACkQKSApMClAKVApYClwHiApgCmQKaApsCnAKdAp4CnwKgAqECogKjAqQCpQKmAqcCqAKpAqoCqwKsAq0CrgKvArACsQKyArMCtAK1ArYCtwK4ArkCugK7ArwCvQK+Ar8CwALBAsICwwLEAsUCxgLHAsgCyQLKAssCzAH/AgADAwMEAwUDBgMHAwgDCQMKAwsDDAMNA0sDTANRA1QDVQNYA1sDXANdA2QDVwNNA04DTwNQA1kDWgNSA1MDVgNlA14DXwNgA2EDYgNjA7cDuAO5A7oDuwPMA7wDvQO+A78DwAPBA8IDxQPGA8cDyAPJA8oDywPDA8QDtAO1A7YAAgAWAOkBOgAAATwBSgBSAUwBowBhAaUB1AC5As0CzgDpAtIC2wDrAuAC4AD1Aw4DDgD2AxADEQD3AxUDFwD5AxkDHAD8AycDLQEAAzQDNQEHAzgDOAEJAzoDOgEKA0MDSAELA24DbgERA3ADcAESA3IDgwETA54DnwElA6EDogEnA6gDqAEpAAEAAAABAAgAAgBcACsDIAMhAyIDIwMlAyYDJAMuAy8DMAMxAzIDMwM7AzwDPQM+A0kDSgOzA+YD5wPoA+kD6gPrA+wD7QPuA+8D8APxA/ID8wP0A/UD9gP3A/gD+QP6A/sD/AACAAwDDwMRAAADFgMWAAMDGgMaAAQDHgMeAAUDJwMtAAYDNAM1AA0DOAM4AA8DOgM6ABADQQNCABEDoQOhABMDzQPRABQD0wPkABkABAAAAAEACAABAFYABAAOACgAOgBEAAMACAAOABQB1QACATUB1gACAU0B1wACAZ8AAgAGAAwB2wACAZ8B3AACAcYAAQAEAd8AAgGfAAIABgAMAeAAAgGfAeEAAgHGAAEABAEGASwBkwGfAAQAAAABAAgAAQA2AAEACAAFAAwAFAAcACIAKAHZAAMBLAE6AdoAAwEsAVAB2AACASwB3QACAToB3gACAVAAAQABASwAAQAAAAEACAABAAYADgABAAEC0gABAAEACAABAAAAFAAAAAAAAAACd2dodAEAAAA="
                 pdfFonts.pdfMake.vfs['ExoNormal_b64']=font64Normal;
                 pdfFonts.pdfMake.vfs['ExoBold_b64']=font64Normal;
                 pdfMake.fonts = {
                  Exo:{
                    normal:      'ExoNormal_b64',
                    bold:        'ExoBold_b64',
                    italics:     'ExoNormal_b64',
                    bolditalics: 'ExoNormal_b64'
                }
              }
              
            
                
           
            // playground requires you to assign document definition to a variable called dd
            this.dt = new Date().getDate();
            this.ms = new Date().getMonth()+1;
            this.ano = new Date().getFullYear();
            var hrs = new Date().getHours();
            var min = new Date().getMinutes();
            var sec = new Date().getSeconds();
            //this.dtAtual = this.dt + '/'+ this.ms +'/'+ this.ano;
            this.dtAtual = this.dt +'/' + this.ms+'/'  +this.ano ;
            var pdf = {
              content: [
                {
                
                  columns: [
                    
                    {
                      
                      image: "data:image/jpeg;base64,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",
                
                      width: 50,
                      height: 50,
                      style: 'logo'
                
                    },
                    {
                     text:'Data: ' + this.dtAtual,
                     style: 'date',
                     alignment: 'right'
            
                    }
            
                  ]
                  },
                    
            
            
                {
                  alignment: 'center',
                  text: 'Dados Cadastrais',
                  margin: [0, 20],
                  style: 'header'
                },
                

                   {
                    image:`data:image/jpeg;base64,${this.documento_perfil}`,
                    width: 70,
                    height: 70,
                    margin: [70, 20,0,0],
                    style: 'profileImg'
                  },
                  {alignment: 'center',
                     text: 'Filiado',
                     style: 'subheader',
                     margin: [0, -50,0,70],
                  },
                  {
                  columns:[{text: 'NOME: ', style: 'subheader'},{text:this.nome_filiado + '\n' }]},
             
                 '_______________________________________________________________________ \n',{
                 columns:[{text: 'CPF: ', style: 'subheader'},{text:this.cpf_cnpj_filiado+ '\n' }]},
                 '_______________________________________________________________________ \n',{
                 columns:[{text: 'NOME DA MÃE: ', style: 'subheader'},{text:this.nome_mae+ '\n' }]},
                 '_______________________________________________________________________ \n',{
                 columns:[{text: 'DATA DE NASCIMENTO: ', style: 'subheader'},{text:this.data_nascimento+ '\n'}]},
                 '_______________________________________________________________________ \n',{
                 columns:[{text: 'DATA DE NASCIMENTO: ', style: 'subheader'},{text:this.data_nascimento+ '\n'}]},
                 '_______________________________________________________________________ \n',{
                 columns:[{text: 'LIDERANCA: ', style: 'subheader'},{text:this.nome_lideranca+ '\n'}]},
                 '_______________________________________________________________________ \n',

              ],
              defaultStyle: {
                columnGap:10,
                font: 'Exo'
              },
              styles: {
                date:{
                  fontFamily:'Exo',
                  margin:[0, 15, 0, 0]
            
                },
                logo:{
                  float:'left'
                },
              dados:{
                bold:true,
               
              }
                ,
                header: {
                  fontSize: 18,
                  bold: true
                },
                subheader: {
                  fontSize: 15,
                  bold: true
                },
                quote: {
                  italics: true
                },
                small: {
                  fontSize: 10
                },
                profileImg:{
                  width:10,
                  height: 10,
                  float: 'left'
                }
              }
              
            }	
            this.pdfObj = pdfMake.createPdf(pdf);
            this.pdfObj.download('Ficha '+ this.nome_filiado +'.pdf');
                 }

                 async photo(){
                  const image = await Camera.getPhoto({
                    quality:100,
                    allowEditing: false,
                    resultType:CameraResultType.Base64,
                    source:CameraSource.Camera
                  });
                        this.base64Image = image.base64String;
                
                        this.persistImg(this.base64Image);
                    
                }
  
}
