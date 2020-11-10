import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AcessProviders} from '../../providers/access-providers';
import { Storage } from '@ionic/storage';
import { FormGroup } from '@angular/forms';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Plugins, CameraResultType, CameraSource, FilesystemDirectory} from '@capacitor/core';
import { ɵangular_packages_common_http_http_a } from '@angular/common/http';
import { empty } from 'rxjs/internal/observable/empty';
const { Camera, FileSystem} = Plugins;


@Component({
  selector: 'app-register',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {
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
  id_lideranca: any = "";
  inputImgp: string = 'displayimgp'
  sendImgp: string = 'noneImgp'
  id_origem: any ="";
  id_apoio: any="";
  id_filiador: any ="";
  id_grupo: any;
  base64Image: string;
  contador: number = 0;
  a: string;


  constructor(

    private router : Router,
    private toastCtrl : ToastController,
    private loadingCtrl : LoadingController,
    private storage: Storage,

    private alertCtrl : AlertController,
    private accsPrvdrs: AcessProviders,
    private navCtrl: NavController,


  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
        this.id_lideranca = res.id_filiador_lid;
        this.id_apoio = res.id_filiador_apoio;
        this.id_filiador = res.id_filiador;
        this.id_grupo = res.id_grupo_usuario;
      
          this.getQrCode();
      
      
   

        if (res.id_grupo_usuario == 3){
          this.id_origem = res.id_filiador_lid;
          
         } else if (res.id_grupo_usuario == 4){
          this.id_origem = res.id_filiador_apoio;
         } 
         else{
          this.id_origem = res.id_filiador;
         }
    
    
        
        
      
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

      message:  `<img src="data:image/jpeg;base64,${this.base64Image}">`,
      buttons: ['Fechar']
    });

    await alert.present();


   }

   async getQrCode(){
    return new Promise(resolve => {
      let body={
      aksi: 'proses_qrcode'


      }
      this.accsPrvdrs.postData(body,'proses_api.php').subscribe((res:any)=>{
         if(res.success == true){


         }else{
     

       
         }
      },(err)=>{
 
        this.presentToast(err);
      })

    });


  }

 
  send(){
    console.log(this.a)
  }




  
   async photo(){
    const image = await Camera.getPhoto({
      quality:100,
      allowEditing: false,
      resultType:CameraResultType.Base64,
      source:CameraSource.Camera
    });
          this.base64Image = image.base64String;
          this.imgk = "verimg";
       
      
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
    if (this.id_grupo == 2){
      this.router.navigate(['/home-filiador'])
    }else if (this.id_grupo == 3){
      this.router.navigate(['/home'])
    }else if (this.id_grupo == 4){
      this.router.navigate(['/home-apoio'])
    }


   
   }



}
