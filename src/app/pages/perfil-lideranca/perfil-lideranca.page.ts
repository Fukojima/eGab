import { Storage } from '@ionic/storage';
import { ToastController, LoadingController, AlertController, NavController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AcessProviders} from '../../providers/access-providers';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';



@Component({
  selector: 'app-perfil-lideranca',
  templateUrl: './perfil-lideranca.page.html',
  styleUrls: ['./perfil-lideranca.page.scss'],
})
export class PerfilLiderancaPage implements OnInit {
  cpf_cnpj_lideranca : string
  nome_lideranca : string	
  
  email_lideranca 	: string
  telefone_lideranca 	: string
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
   zonaClass: string = "zona-none"
 
  email_filiado 	: string
  telefone_filiado 	: string

  nr_zona: any;
  nr_secao: any;
  id_municipio: any;
  id_grupo_usuario: any;
  documento_frente_titulo: any;
  documento_verso_titulo: any;
  documento_comprovante: any;
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


  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
       console.log('reees',res);
       this.datastorage = res;
       this.id_lideranca = this.datastorage.id_filiador_lid;
       this.us_alteracao = this.datastorage.nome;
      this.id_municipio = this.datastorage.id_municipio_filiador;
       console.log(this.x);
       this.start =0;
       this.users = [];
      
     

       this.loadUsers();
  
     
       
       
       
    });


   }

   newPass(){
    this.router.navigate(['/mudar-senha']);   
    this.dismiss();
  }

  async loadUsers(){
 

    return new Promise(resolve => {
      let body={
      aksi: 'proses_consulta_perfil_lideranca',
      id_lideranca: this.id_lideranca,
      start: this.start,
      limit: this.limit
      
      


      }
      this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
                  console.log(res);
               
                 this.nome_lideranca = res.result[0].nome;
                 this.documento_perfil = res.result[0].perfil;
                 this.nome_mae = res.result[0].nome_mae;
                 this.cpf_cnpj_lideranca = res.result[0].cpf_cnpj_lideranca;
                 this.email_lideranca = res.result[0].email_lideranca;
                 this.endereco = res.result[0].endereco;
                 this.numero = res.result[0].numero;
                 this.bairro = res.result[0].bairro;
                 this.telefone_lideranca = res.result[0].telefone_lideranca;
                 this.documento_frente_titulo = res.result[0].documento_frente_titulo;
                 this.documento_verso_titulo = res.result[0].documento_verso_titulo
                 this.documento_comprovante = res.result[0].documento_comprovante;  
                 this.documento_frente = res.result[0].documento_frente;
                 this.documento_verso = res.result[0].documento_verso;
                 this.cidade = res.result[0].cidade;
                 this.uf = res.result[0].uf;
                 this.obs = res.result[0].obs;
                  
                  this.nome_mae = res.result[0].nome_mae;
                        
                 this.cidade = res.result[0].cidade;
                 this.uf = res.result[0].uf;
                 this.data_nascimento = moment(res.result[0].data_nascimento).format("DD/MM/YYYY");
                 this.cep = res.result[0].cep;
              
                 this.nr_titulo = res.result[0].nr_titulo;
 this.endereco = res.result[0].endereco;
                 this.numero = res.result[0].numero;
                 this.bairro = res.result[0].bairro;
               this.id_zona = res.result[0].id_zona;
                 this.id_secao = res.result[0].id_secao;
                 this.loadZonaSecao(this.id_zona, this.id_secao);



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

  selectedFile(event){
  this.image = event.target.files[0];
 this.changeTextInput();
  }

  changeTextInput(){

     this.inputImgp = 'noneImgp',
     this.sendImgp= 'displayImgp'

    
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
        
    this.router.navigate(['/home-lideranca'])    
      }

     async popupNovoNomeLideranca(){
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
            
              
              this.editNomeLideranca(alertData.novoNome);
              }
            }
          ]
        });
    
        await alert.present();
      }



     async editNomeLideranca(a){
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
          aksi: 'proses_update_nome_lideranca',
          novo_nome_lideranca : a.toUpperCase(),
          us_alteracao: this.us_alteracao,
          id_lideranca: this.id_lideranca,
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
         duration:3000,
         position:'top'
    
        });
        toast.present();
      }



      async presentModal(a,b) {
        const modal = await this.modalController.create({
          component: PerfilLiderancaPage,
          cssClass: 'my-custom-class',
          componentProps: {
            'id_lideranca_pass': a,
            'nome_lideranca':b
          }
        });
        console.log('a:',a);
        return await modal.present();
       
      }







      async popupNovoEmailLideranca(){
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
            
              
              this.editEmailLideranca(alertData.novoNome);
              }
            }
          ]
        });
    
        await alert.present();
      }



     async editEmailLideranca(a){
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
          aksi: 'proses_update_email_lideranca',
          novo_email_lideranca : a.toLowerCase(),
          us_alteracao: this.us_alteracao,
          id_lideranca: this.id_lideranca,
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

      
      async popupNovoNumeroLideranca(){
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
            
              
              this.editNumeroLideranca(alertData.novoNome);
              }
            }
          ]
        });
    
        await alert.present();
      }



     async editNumeroLideranca(a){
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
          aksi: 'proses_update_numero_lideranca',
          novo_numero_lideranca : a,
          us_alteracao: this.us_alteracao,
          id_lideranca: this.id_lideranca,
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

      
      async popupNovoTelefoneLideranca(){
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
            
              
              this.editTelefoneLideranca(alertData.novoNome);
              }
            }
          ]
        });
    
        await alert.present();
      }



     async editTelefoneLideranca(a){
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
          aksi: 'proses_update_telefone_lideranca',
          novo_telefone_lideranca: a,
          us_alteracao: this.us_alteracao,
          id_lideranca: this.id_lideranca,
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
    aksi: 'proses_update_picture_lideranca',
    new_picture: a,
    id_lideranca: this.id_lideranca,
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


    openNovaZona(){

      this.zonaClass = 'zona-on';
      this.loadZona();
    }

    

  

     async openFrenteTitulo(){
      const alert = await this.alertController.create({
        cssClass: 'documento',
        header: 'Frente do Título de eleitor',
  
        message:  `<img src="https://egab.app/api/img/${this.documento_frente_titulo}">`,
        buttons: ['Fechar']
      });
  
      await alert.present();
  
  
     }
  
  
     async openVersoTitulo(){
      const alert = await this.alertController.create({
        cssClass: 'documento',
        header: 'Frente do Título de eleitor',
  
        message:  `<img class=""img-doc" src="https://egab.app/api/img/${this.documento_verso_titulo}">`,
        buttons: ['Fechar']
      });
  
      await alert.present();
  
  
     }
     async openComprovante(){
      const alert = await this.alertController.create({
        cssClass: 'documento',
        header: 'Comprovante de resiência',
  
        message:  `<img src="https://egab.app/api/img/${this.documento_comprovante}">`,
        buttons: ['Fechar']
      });
  
      await alert.present();
  
  
     }
  
     




   async editZonaLideranca(){
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
        aksi: 'proses_update_zona_secao_lideranca',
        novo_id_zona : this.id_zona,
        novo_id_secao: this.id_secao,
        us_alteracao: this.us_alteracao,
        id_lideranca: this.id_lideranca,
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
                   aksi: 'proses_update_cep_lideranca',
                   novo_cep_lideranca : a,
                   nova_cidade : res.result.cidade,
                   novo_uf : res.result.uf,
                   novo_bairro : res.result.bairro,
                   novo_endereco : res.result.logradouro,
                   us_alteracao: this.us_alteracao,
                   id_lideranca: this.id_lideranca,
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
      



        async popupNovoCEPLideranca(){
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
  

        
      async popupNovoNomeMaeLideranca(){
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
            
              
              this.editNomeMaeLideranca(alertData.novoNomeMae);
              }
            }
          ]
        });
    
        await alert.present();
      }



     async editNomeMaeLideranca(a){
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
          aksi: 'proses_update_nome_mae_lideranca',
          novo_nome_mae_lideranca : a.toUpperCase(),
          us_alteracao: this.us_alteracao,
          id_lideranca: this.id_lideranca,
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
