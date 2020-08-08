import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AcessProviders} from '../../providers/access-providers';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register-lideranca.page.html',
  styleUrls: ['./register-lideranca.page.scss'],
})
export class RegisterLiderancaPage implements OnInit {
   cpf_cnpj_lideranca : string
   nome_lideranca : string	
   email_lideranca 	: string
   telefone_lideranca 	: string	
   id_filiador	: string
   sn_whatsapp 	: string
   datastorage : any
   disabledButton;
   i: any;
   endereco : string 	
   numero : string	
   complemento : string	= ""
   bairro: string 	
   cidade: string 	
   uf 	: string
   cep 	: string
   nr_titulo : string	
   id_zona : string	
   id_secao : string
   id_lideranca : string
   sn_biometria: string

   data_nascimento: string
  nr_zona: any;
  id_filiador_apoio: any;
  a: any;
   id_municipio: number
   nome_mae: string
   situacao_cadastro: string
   sn_aprovado_automatico: string
   us_aprovacao: string
   
   image: any
   caminho_documento: string
   b: any
 
   documento_verso: string = "N.png"
   documento_frente: string ="N.png"
   documento_verso_titulo: string ="N.png"
   documento_frente_titulo: string ="N.png"
   documento_comprovante: string ="N.png"

   documento_perfil: string = 'user.png'
   iff: string = ''
   ifft: string = ''
   enviarf :string ='displayedf'
   enviadof:string = 'nonef'
   iv: string = ''

   enviarv :string ='displayedv'
   enviadov:string = 'nonev'
   ip: string = ''

   enviarp :string ='displayedp'
   enviadop:string = 'nonep'
   enviarft :string ='displayedft'
   enviadoft:string = 'noneft'


   enviarvt :string ='displayedvt'
   enviadovt:string = 'nonevt'


   enviarpt :string ='displayedpt'
   enviadopt:string = 'nonept'
   zonas: any=[];
   limit: number=13;
   
   start: number = 0;
   zonaaa : string 
   secoes: any = []
   lideres: any = []
   inputImg: string = 'displayimg'
   sendImg: string = 'noneImg'
   inputImgv: string = 'displayimgv'
   sendImgv: string = 'noneImgv'
   inputImgp: string = 'displayimgp'
   sendImgp: string = 'noneImgp'

   inputImgt: string = 'displayimgft'
   sendImgt: string = 'noneImgft'
   inputImgvt: string = 'displayimgvt'
   sendImgvt: string = 'noneImgvt'
   inputImgc: string = 'displayimgc'
   sendImgc: string = 'noneImgc'

   it: string = ''
   ivt: string = ''
   msg_padrao_aniversario;
   ic: string = ''
   enviarc :string ='displayedc'
   enviadoc:string = 'nonec'


  constructor(

    private router : Router,
    private toastCtrl : ToastController,
    private loadingCtrl : LoadingController,
    private storage: Storage,
    private alertCtrl : AlertController,
    private accsPrvdrs: AcessProviders,
    private http: HttpClient

   
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
       console.log('liderança',res);
       this.datastorage = res;
       this.id_filiador = this.datastorage.id_filiador;
       this.id_municipio = this.datastorage.id_municipio_filiador;
       this.loadZona();

  
      
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
   testaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;
     
  for (this.i=1; this.i<=9; this.i++) Soma = Soma + parseInt(strCPF.substring(this.i-1, this.i)) * (11 - this.i);
  Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
   
  Soma = 0;
    for (this.i = 1; this.i <= 10; this.i++) Soma = Soma + parseInt(strCPF.substring(this.i-1, this.i)) * (12 - this.i);
    Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
  
}
backBut(a){
  if(a == 'F'){
    this.iff = '';
    this.enviarf = 'displayedf'
    this.enviadof = 'nonef'
  }else if(a == 'V'){
    this.iv = '';
    this.enviarv = 'displayedv'
    this.enviadov = 'nonev'}
    else if(a == 'P'){
      this.ip = '';
      this.enviarp = 'displayedp'
      this.enviadop = 'nonep'}
  }
selectedFile(event,a){
  this.image = event.target.files[0];
    this.backBut(a);
    this.changeTextInput(a);}
 
  async tryRegister(){

    if(this.nome_lideranca ==null){
        this.presentToast('O campo "nome" precisa ser preenchido');
    }else if(this.cpf_cnpj_lideranca ==null){
        this.presentToast('O campo "CPF" precisa ser preenchido');
    }else if(this.email_lideranca  ==null){
        this.presentToast('O campo "Email" precisa ser preenchido');
    }else if(this.telefone_lideranca ==null){
        this.presentToast('O campo "Telefone" precisa ser preenchido');
    }else if(this.sn_whatsapp ==null){
        this.presentToast('É nescessário informar se o número é referente ao whatsapp.');
    }else if(this.cpf_cnpj_lideranca.length < 11){
      this.presentToast('CPF em formato incorreto.');
  }else{
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message : 'Aguarde...',
      })
      loader.present();
      return new Promise(resolve => {
        let body={
        aksi: 'proses_register_lideranca',
        cpf_cnpj_lideranca : this.cpf_cnpj_lideranca.replace('.','').replace('-','').replace('.',''),
        nome_lideranca :  this.nome_lideranca.toUpperCase(),
        email_lideranca 	: this.email_lideranca.toLowerCase(),
        telefone_lideranca 	: this.telefone_lideranca.replace('(','').replace(')','').replace('-',''),
        endereco : this.endereco.toUpperCase(),
        numero : this.numero,
        complemento : this.complemento.toUpperCase(),	
        bairro: this.bairro.toUpperCase(),
        cidade: this.cidade.toUpperCase(), 	
        uf 	: this.uf.toUpperCase(),
        cep 	: this.cep,
        id_lideranca: this.id_lideranca,
        sn_biometria: this.sn_biometria,
        nome_mae:this.nome_mae.toUpperCase(),
        sn_whatsapp: this.sn_whatsapp,
        msg_padrao_aniversario: this.msg_padrao_aniversario,
        situacao_cadastro: this.situacao_cadastro,
        nr_titulo: this.nr_titulo,
        documento_verso : this.documento_verso,
        documento_frente : this.documento_frente,
        documento_perfil : this.documento_perfil,
        documento_frente_titulo : this.documento_frente_titulo,
        documento_verso_titulo : this.documento_verso_titulo,
        data_nascimento: this.data_nascimento,
        documento_comprovante: this.documento_comprovante,
        id_zona: this.id_zona,
        id_secao: this.id_secao,
        id_filiador: this.id_filiador

    
         

        }
     
        this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
           if(res.success == true){
             loader.dismiss();
             this.disabledButton = false;
             this.presentToast('Cadastro realizado com sucesso!');
             this.openHome();
             this.accsPrvdrs.postData(body,'proses_api_user.php').subscribe((res:any)=>{
              if(res.success == true){
                loader.dismiss();
                this.disabledButton = false;
               
              
              }else{
               loader.dismiss();
               this.disabledButton = false;
               this.presentToast(res.msg);
            
              }
           },(err)=>{
             loader.dismiss();
            
           
           })

        
           }else{
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast('Erro no cadastro');
         
           }
        },(err)=>{
          loader.dismiss();
          this.presentToast(err);
        
        })
  

      });
    }


  }

  async pegaCep(){
    const loader = await this.loadingCtrl.create({
      message : 'Aguarde...',
    })
    loader.present();

    //this.dtAtual = this.dt + '/'+ this.ms +'/'+ this.ano;

    return new Promise(resolve => {
      let body={
      aksi: 'proses_cep',
      cep: this.cep

      }
      this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
         if(res.success == true){
           loader.dismiss();
         
           this.ionViewDidEnter();
            console.log('listcep',res);
           this.cidade = res.result.cidade;
           this.uf = res.result.uf;
           this.bairro = res.result.bairro;
           this.endereco = res.result.logradouro;

         }else{
          loader.dismiss();

       
         }
      },(err)=>{
        loader.dismiss();
        this.presentToast(err);
      })

    });
  }
  openHome(){
         
    this.router.navigate(['/home-filiador'])   
         
        
  }

  async presentToast(a){
    const toast = await this.toastCtrl.create({
     message:a,
     duration:1500,
     position:'top'

    });
    toast.present();
  }
  async presentAlert(a) {
    const alert = await this.alertCtrl.create({
  
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Close',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Try Again',
          handler: () => {
            this.tryRegister();
          }
        }
      ]
    });

    await alert.present();
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

         this.persistImg(a,response.name)
         this.changeBut(a);
        
     })

    
     
  
  }


     persistImg(a,b){
      if (a == 'F'){
      this.documento_frente = b;}else if (a == 'V'){
       this.documento_verso = b;}else if (a == 'P'){
         this.documento_perfil = b;}else if (a == 'FT'){
           this.documento_frente_titulo = b;}else if (a == 'VT'){
             this.documento_verso_titulo = b;}else if (a == 'C'){
               this.documento_comprovante = b;}
     
     
     
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
       paleativeTitle(){
        var tempTitle = this.nr_titulo;
        var split = this.nr_titulo.split('');

       if (this.nr_titulo.length == 1){
            this.nr_titulo = '00000000000' + tempTitle;
         }
         else if (this.nr_titulo.length == 2){
          this.nr_titulo = '0000000000' + tempTitle;
       } else if (this.nr_titulo.length == 3){
        this.nr_titulo = '000000000' + tempTitle;
     }else if (this.nr_titulo.length == 4){
      this.nr_titulo = '00000000' + tempTitle;
   }else if (this.nr_titulo.length == 5){
    this.nr_titulo = '0000000' + tempTitle;
     }else if (this.nr_titulo.length == 6){
      this.nr_titulo = '000000' + tempTitle;
   }else if (this.nr_titulo.length == 7){
    this.nr_titulo = '00000' + tempTitle;
 }else if (this.nr_titulo.length == 8){
  this.nr_titulo = '0000' + tempTitle;
           }else if (this.nr_titulo.length == 9){
            this.nr_titulo = '000' + tempTitle;
         }else if (this.nr_titulo.length == 10){
          this.nr_titulo = '00' + tempTitle;
       }else if (this.nr_titulo.length == 11){
        this.nr_titulo = '0' + tempTitle;
     }

       
}
     
       validarTitulo(inscricao) {
         var paddedInsc = inscricao;
         //alert("validando inscricao " + paddedInsc);
         var dig1 = 0;
         var dig2 = 0;
     
         var tam = paddedInsc.length;
         var digitos = paddedInsc.substr(tam - 2, 2);
         var estado  = paddedInsc.substr(tam - 4, 2);
         var titulo  = paddedInsc.substr(0, tam - 2);
         var exce = (estado == '01') || (estado == '02');
         dig1 = (titulo.charCodeAt(0) - 48) * 9 + (titulo.charCodeAt(1) - 48) * 8 +
                (titulo.charCodeAt(2) - 48) * 7 + (titulo.charCodeAt(3) - 48) * 6 +
                (titulo.charCodeAt(4) - 48) * 5 + (titulo.charCodeAt(5) - 48) * 4 +
                (titulo.charCodeAt(6) - 48) * 3 + (titulo.charCodeAt(7) - 48) * 2;
         var resto = (dig1 % 11);
         if (resto == 0) {
           if (exce){
             dig1 = 1;
           } else {
             dig1 = 0;
           }
         } else {
           if (resto == 1) {
             dig1 = 0;
           } else {
             dig1 = 11 - resto;
           }
         }
     
         dig2 = (titulo.charCodeAt(8) - 48) * 4 + (titulo.charCodeAt(9) - 48) * 3 + dig1 * 2;
         resto = (dig2 % 11);
         if (resto == 0) {
           if (exce) {
             dig2 = 1;
           } else {
             dig2 = 0;
           }
         } else {
           if (resto == 1){
             dig2 = 0;
           }else{
             dig2 = 11 - resto;
           }
         }
     
         if ( (digitos.charCodeAt(0) - 48 == dig1) && (digitos.charCodeAt(1) - 48 == dig2) ) {
           return true; // Titulo valido
         } else {
           return false;
         }
     
     }
     
       changeTextInput(a){
          if(a == 'F'){
           this.inputImg = 'noneImg',
           this.sendImg= 'displayImg'
     
          }else if(a == 'V'){
           this.inputImgv = 'noneImgv',
           this.sendImgv= 'displayImgv'
     
          }else if(a == 'P'){
           this.inputImgp = 'noneImgp',
           this.sendImgp= 'displayImgp'
     
          }else if(a == 'FT'){
           this.inputImgt = 'noneImgft',
           this.sendImgt= 'displayImgft'
     
          }else if(a == 'VT'){
           this.inputImgvt = 'noneImgvt',
           this.sendImgvt= 'displayImgvt'
     
          }else if(a == 'C'){
           this.inputImgc = 'noneImgc',
           this.sendImgc= 'displayImgc'
     
          }
       }

       changeBut(a){
        if(a == 'F'){
          this.iff = 'butf';
          this.enviarf = 'nonef'
          this.enviadof = 'displayedf'
        }else if(a == 'V'){
          this.iv = 'butv';
          this.enviarv = 'nonev'
          this.enviadov = 'displayedv'}
          else if(a == 'P'){
            this.ip = 'butp';
            this.enviarp = 'nonep'
            this.enviadop = 'displayedp'}
        else if(a == 'FT'){
          this.it = 'butf';
          this.enviarft = 'nonef'
          this.enviadoft = 'displayedf'
        }else if(a == 'VT'){
          this.ivt = 'butv';
          this.enviarvt = 'nonev'
          this.enviadovt = 'displayedv'}
          else if(a == 'C'){
            this.ic = 'butp';
            this.enviarc = 'nonep'
            this.enviadoc = 'displayedp'}
        }
}
