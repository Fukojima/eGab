import { Storage } from '@ionic/storage';
import { ToastController, LoadingController, AlertController, NavController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AcessProviders} from '../../providers/access-providers';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-perfil-apoio',
  templateUrl: './perfil-apoio.page.html',
  styleUrls: ['./perfil-apoio.page.scss'],
})
export class PerfilApoioPage implements OnInit {
  cpf_cnpj_apoio : string
  nome_apoio : string	
  
  email_apoio 	: string
  telefone_apoio	: string
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
  id_apoio;
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
  y: boolean = false

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

       if(this.id_apoio == null){
         this.id_apoio = this.datastorage.id_apoio;
         this.y = true;
       }
       console.log(this.x);
       this.start =0;
       this.users = [];
      
     

       this.loadUsers();
  
     
       
       
       
    });


   }

  async loadUsers(){
 

    return new Promise(resolve => {
      let body={
      aksi: 'proses_consulta_perfil_apoio',
      id_apoio: this.id_apoio,
      start: this.start,
      limit: this.limit
      
      


      }
      this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
                  console.log(res);
               
                 this.nome_apoio = res.result[0].nome;
                 this.documento_perfil = res.result[0].perfil;
                 this.nome_mae = res.result[0].nome_mae;
                 this.cpf_cnpj_apoio = res.result[0].cpf_cnpj_apoio;
                 this.email_apoio = res.result[0].email_apoio;
                 this.endereco = res.result[0].endereco;
                 this.numero = res.result[0].numero;
                 this.bairro = res.result[0].bairro;
                 this.telefone_apoio = res.result[0].telefone_apoio;
                 this.us_aprovacao = res.result[0].us_aprovacao;
                 this.documento_frente = res.result[0].documento_frente;
                 this.documento_verso = res.result[0].documento_verso;
                 this.cidade = res.result[0].cidade;
                 this.uf = res.result[0].uf;
                 this.data_nascimento = res.result[0].data_nascimento;
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
    if (this.y == true){

      this.router.navigate(['/home-apoio']) 
    }else{
    this.modalController.dismiss({
      'dismissed': true
    });}
  }
  
  openHome(){
        
    this.router.navigate(['/home-lideranca'])    
      }

     async popupNovoNomeApoio(){
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
            
              
              this.editNomeApoio(alertData.novoNome);
              }
            }
          ]
        });
    
        await alert.present();
      }

      newPass(){
        this.router.navigate(['/mudar-senha']);   
        this.dismiss();
      }

     async editNomeApoio(a){
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
          aksi: 'proses_update_nome_apoio',
          novo_nome_apoio : a.toUpperCase(),
     
          id_apoio: this.id_apoio,
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











      async popupNovoEmailApoio(){
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
            
              
              this.editEmailApoio(alertData.novoNome);
              }
            }
          ]
        });
    
        await alert.present();
      }



     async editEmailApoio(a){
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
          aksi: 'proses_update_email_apoio',
          novo_email_apoio : a.toLowerCase(),
 
          id_apoio: this.id_apoio,
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

      
      async popupNovoTelefoneApoio(){
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
            
              
              this.editTelefoneApoio(alertData.novoNome);
              }
            }
          ]
        });
    
        await alert.present();
      }



     async editTelefoneApoio(a){
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
          aksi: 'proses_update_telefone_apoio',
          novo_telefone_apoio: a,
     
          id_apoio: this.id_apoio,
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
    aksi: 'proses_update_picture_apoio',
    new_picture: a,
    id_apoio: this.id_apoio,
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
