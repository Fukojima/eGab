import { Storage } from '@ionic/storage';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AcessProviders } from '../../providers/access-providers'
import { Injectable } from "@angular/core";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: string
  senha: string
  idLideranca: string
  dt: number;
  ms: number;
  dtAtual: string;
  ano: number;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accsPrvdrs: AcessProviders,
    private storage: Storage,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  async tryLogin() {

    if (this.login == "") {
      this.presentToast('Preencha o login');
    } else if (this.senha == "") {
      this.presentToast('Informe a senha');
    } else {

      const loader = await this.loadingCtrl.create({
        message: 'Aguarde...',
      })
      loader.present();
      return new Promise(resolve => {
        let body = {
          aksi: 'proses_login',
          login: this.login,
          senha: this.senha


        }
        this.accsPrvdrs.postData(body, 'proses_api.php').subscribe((res: any) => {
          if (res.sucess == true) {
            loader.dismiss();

            this.presentToast('Login bem sucedido');

            this.storage.set('storage_xxx', res.result);
            this.storage.set('id_filiado', res.result.id_filiado);
            console.log(res.result.id_grupo_usuario);
            if (res.result.id_grupo_usuario == 3) {

              this.idLideranca = res.result.id_usuario;

              this.navCtrl.navigateRoot(['/home']);

            }
            else if (res.result.id_grupo_usuario == 1) {
              this.navCtrl.navigateRoot(['/home-admin']);

            } else if (res.result.id_grupo_usuario == 2) {
              if (res.result.sn_cadastro_validado == 'N') {
                this.popupValidacao();
              } else {


                this.navCtrl.navigateRoot(['/home-filiador']);
              }
            } else if (res.result.id_grupo_usuario == 4) {
              this.navCtrl.navigateRoot(['/home-apoio']);

            }

          } else {
            loader.dismiss();

            this.presentToast('Login ou senha inválidos');

          }
        }, (err) => {
          loader.dismiss();
          this.presentToast('Erro de conexão');

        })

      });
    }


  }
  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,

    });
    toast.present();
  }

  openHome() {

    this.router.navigate(['/home'])
  }

  async popupValidacao() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Termos de responsabilidade',

      message: "<strong>Bem vindo ao eGab!</strong><br><br> Você está a um passo de ter seu gabinete na palma da mão!<br><br> Ao clicar em 'Aceito os termos' você declara que leu e está ciente dos termos de uso e responsabilidade citados no email de boas vindas.",
      buttons: [{
        text: 'Não Aceito os Termos',
        handler: () => {
          this.dismissAlert();
        }
      }, {
        text: 'Aceito os Termos',
        handler: () => {
          this.acept();
        }
      }]



    });

    await alert.present();

  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.loadingCtrl.dismiss({
      'dismissed': true
    });
  }
  dismissAlert() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.alertController.dismiss({
      'dismissed': true
    });
  }

  forgot() {

    this.router.navigate(['/crud'])
  }


  async acept() {



    const loader = await this.loadingCtrl.create({
      message: 'Aguarde...',
    })
    loader.present();
    this.dt = new Date().getDate();
    this.ms = new Date().getMonth() + 1;
    this.ano = new Date().getFullYear();
    var hrs = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();
    //this.dtAtual = this.dt + '/'+ this.ms +'/'+ this.ano;
    this.dtAtual = this.ano + '-' + this.ms + '-' + this.dt + ' ' + hrs + ':' + min + ':' + sec;
    return new Promise(resolve => {
      let body = {
        aksi: 'proses_validacao',
        login: this.login,
        dtAtual: this.dtAtual,
        valid: 'S'

      }

      this.accsPrvdrs.postData(body, 'proses_api.php').subscribe((res: any) => {
        if (res.success == true) {
          loader.dismiss();

          this.navCtrl.navigateRoot(['/home-filiador']);




        } else {
          loader.dismiss();

          this.presentToast(res.msg);

        }
      }, (err) => {
        loader.dismiss();
        this.presentToast(err);

      })


    });
  }





}
