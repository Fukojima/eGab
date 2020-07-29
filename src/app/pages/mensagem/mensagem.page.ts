import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AcessProviders} from '../../providers/access-providers';
import { Storage } from '@ionic/storage';
import { Base64 } from '@ionic-native/base64/ngx';
import { toBase64String } from '@angular/compiler/src/output/source_map';


@Component({
  selector: 'app-register',
  templateUrl: './mensagem.page.html',
  styleUrls: ['./mensagem.page.scss'],
})
export class MensagemPage implements OnInit {
   senha: string
   is_senha : string	
   login :string 
   datastorage : any
   disabledButton;
   cpf;
   imgk = 'none'
   email;
  mensagem: any = "";
  img: any ="";
  base64textString: string;
  id_lideranca: any;
  inputImgp: string = 'displayimgp'
  sendImgp: string = 'noneImgp'
  constructor(

    private router : Router,
    private toastCtrl : ToastController,
    private loadingCtrl : LoadingController,
    private storage: Storage,

    private alertCtrl : AlertController,
    private accsPrvdrs: AcessProviders,
    private navCtrl: NavController,
    private base64: Base64

  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
        this.id_lideranca = res.id_filiador_lid;
        console.log(res.id_filiador_lid)
 
    
      
      
      
   });


   }

   test(){

     console.log('msg', this.mensagem);
     
     
   }

   handleFileSelect(evt){
    var files = evt.target.files;
    var file = files[0];

  if (files && file) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(file);
      this.inputImgp = 'noneImgp';
      this.sendImgp = 'displayImgp';
  }
}

_handleReaderLoaded(readerEvt) {
   var binaryString = readerEvt.target.result;
          this.base64textString= btoa(binaryString);
          console.log(btoa(binaryString));
          this.imgk="displayd"

         
  }
  


  async verImg(){
    const alert = await this.alertCtrl.create({
      cssClass: 'documento',
      header: 'Preview da imagem',

      message:  `<img src="data:image/jpeg;base64,${this.base64textString}">`,
      buttons: ['Fechar']
    });

    await alert.present();


   }
 
  async send(){

 
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message : 'Aguarde...',
      })
      loader.present();
      return new Promise(resolve => {
        let body={
        aksi: 'proses_mensagem',
        mensagem: this.mensagem,
        img: this.base64textString,
        id_lideranca: this.id_lideranca
       
    
    
         

        }
     
        this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
           if(res.success == true){
             loader.dismiss();
            
             this.presentToast(res.msg);
             this.openHome();
             
            
        
           }else{
            loader.dismiss();

            this.presentToast(res.msg);
         
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
     duration:3500,
     position:'top'

    });
    toast.present();
  }

  openHome(){

    this.router.navigate(['/home'])
   }



}
