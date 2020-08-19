import { async } from '@angular/core/testing';
import { Storage } from '@ionic/storage';
import { ToastController, LoadingController, AlertController, NavController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AcessProviders} from '../../providers/access-providers';
import { HttpClient } from '@angular/common/http';
import { Plugins, CameraResultType, CameraSource, FilesystemDirectory} from '@capacitor/core';
import { FormGroup } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import * as moment from 'moment';

const { Camera, FileSystem} = Plugins;


@Component({
  selector: 'app-perfil-filiador',
  templateUrl: './perfil-filiador.page.html',
  styleUrls: ['./perfil-filiador.page.scss'],
})
export class PerfilFiliadorPage implements OnInit {
  cpf_cnpj_filiador : string
  nome_filiador : string	
  
  email_filiador 	: string
  telefone_filiador	: string
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
  limit: number=50;
  start: number = 0;
  newNomeLideranca: string
  us_alteracao: string
  id_usuario: number
  id_filiado;
  id_filiador;
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
  div: string = 'nonep'
  zonaaa : string 
  secoes: any = []
  inputImgp: string = 'displayimgp'
  sendImgp: string = 'noneImgp'
  sn_validar_cadastro;
  validacao;
  sn_obriga_dados_titulos: any;
  msg_padrao_aniversario: any;
  divv: any = 'nonep';
 hh: any='';
 mime: any = 'nonep';
 mm: any='';

 tite: any = 'nonep';
 tt: any = ''
  dadosTitulo: string;
  base64Image: string;

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


  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
       console.log('reees',res);
       this.datastorage = res;
       this.id_filiador = this.datastorage.id_filiador;
       this.us_alteracao = this.datastorage.nome;
     
       console.log(this.x);
       this.start =0;
       this.users = [];
      
     

       this.loadUsers();
       if (this.sn_validar_cadastro == "S"){
         this.validacao = "Sim"
       }else{
        this.validacao = "Não"
       }



       if (this.sn_obriga_dados_titulos == "S"){
        this.dadosTitulo = "Sim"
      }else{
       this.dadosTitulo = "Não"
      }
     
       
       
       
    });


   }

  async loadUsers(){
 

    return new Promise(resolve => {
      let body={
      aksi: 'proses_consulta_perfil_filiador',
      id_filiador: this.id_filiador,
      start: this.start,
      limit: this.limit
      
      


      }
      this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
                  console.log(res);
               
                 this.nome_filiador = res.result[0].nome;
                 this.documento_perfil = res.result[0].perfil;
                 this.nome_mae = res.result[0].nome_mae;
                 this.cpf_cnpj_filiador = res.result[0].cpf_cnpj_filiador;
                 this.email_filiador = res.result[0].email_filiador;
                 this.endereco = res.result[0].endereco;
                 this.numero = res.result[0].numero;
                 this.bairro = res.result[0].bairro;
                 this.telefone_filiador = res.result[0].telefone_filiador;
                 this.us_aprovacao = res.result[0].us_aprovacao;
                 this.documento_frente = res.result[0].documento_frente;
                 this.documento_verso = res.result[0].documento_verso;
                 this.cidade = res.result[0].cidade;
                 this.uf = res.result[0].uf;
                 this.data_nascimento = res.result[0].data_nascimento;
                 this.sn_validar_cadastro = res.result[0].sn_validar_cadastro;
                 this.sn_obriga_dados_titulos=res.result[0].sn_obriga_dados_titulos;
                 this.msg_padrao_aniversario = res.result[0].msg_padrao_aniversario;
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

  selectedFile(event){
  this.image = event.target.files[0];
 this.changeTextInput();
  }

  changeTextInput(){

     this.inputImgp = 'noneImgp',
     this.sendImgp= 'displayImgp'

    
 }

 popupNovoSNValidaCadastro(){
   this.divv = ''
   this.hh = 'nonep'
 }
 popupNovoSNObrigaDadosTitulo(){
  this.tite = ''
  this.tt = 'nonep'
}

popupNovoMsgCadastro(){
  this.mime = ''
  this.mm = 'nonep'
}
 async editNovoSNValidaCadastro(){
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
    aksi: 'proses_update_sn_validar_cadastro',
    sn_validar_cadastro : this.sn_validar_cadastro,

    id_filiador: this.id_filiador,
    data_atual: this.dtAtual

    }
    this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
       if(res.success == true){
         loader.dismiss();
         this.presentToast('Atualizado com sucesso');
         this.ionViewDidEnter();
   this.divv = 'nonep'
   this.hh = ''
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


 async editNovoSNObrigaDadosTitulo(){
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
    aksi: 'proses_update_sn_obriga_dados_titulo',
    sn_obriga_dados_titulo : this.sn_obriga_dados_titulos,

    id_filiador: this.id_filiador,
    data_atual: this.dtAtual

    }
    this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
       if(res.success == true){
         loader.dismiss();
         this.presentToast('Atualizado com sucesso');
         this.ionViewDidEnter();
         this.tite = 'nonep'
         this.tt = ''
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


   async openFrente(){
    const alert = await this.alertController.create({
      cssClass: 'documento',
      header: 'Frente do documento',

      message:  `<img src="https://egab.app/api/img/${this.documento_frente}">`,
      buttons: ['Fechar']
    });

    await alert.present();


   }

   
   async openVerso(){
    const alert = await this.alertController.create({
      cssClass: 'documento',
      header: 'Verso do documento',

      message:  `<img src="https://egab.app/api/img/${this.documento_verso}">`,
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

     async popupNovoNomefiliador(){
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
            
              
              this.editNomefiliador(alertData.novoNome);
              }
            }
          ]
        });
    
        await alert.present();
      }

    

      async editMsgPadraoAniversario(){
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
          aksi: 'proses_update_msg_padrao_aniversario',
          msg_padrao_aniversario: this.msg_padrao_aniversario,
     
          id_filiador: this.id_filiador,
          data_atual: this.dtAtual
     
          }
          this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
             if(res.success == true){
               loader.dismiss();
               this.presentToast('Atualizado com sucesso');
               this.ionViewDidEnter();
              this.mime = 'nonep'
              this.mm = ''
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

      newPass(){
        this.router.navigate(['/mudar-senha']);   
        this.dismiss();
      }

     async editNomefiliador(a){
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
          aksi: 'proses_update_nome_filiador',
          novo_nome_filiador : a.toUpperCase(),
     
          id_filiador: this.id_filiador,
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




      async presentToast(a){
        const toast = await this.toastCtrl.create({
         message:a,
         duration:3000,
         position:'top'
    
        });
        toast.present();
      }











      async popupNovoEmailfiliador(){
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
            
              
              this.editEmailfiliador(alertData.novoNome);
              }
            }
          ]
        });
    
        await alert.present();
      }



     async editEmailfiliador(a){
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
          aksi: 'proses_update_email_filiador',
          novo_email_lideranca : a.toLowerCase(),
 
          id_filiador: this.id_lideranca,
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

      
      async popupNovoTelefonefiliador(){
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
            
              
              this.editTelefonefiliador(alertData.novoNome);
              }
            }
          ]
        });
    
        await alert.present();
      }



     async editTelefonefiliador(a){
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
          aksi: 'proses_update_telefone_filiador',
          novo_telefone_lideranca: a,
     
          id_filiador: this.id_filiador,
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
    aksi: 'proses_update_picture_filiador',
    new_picture: a,
    id_filiador: this.id_filiador,
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



}
