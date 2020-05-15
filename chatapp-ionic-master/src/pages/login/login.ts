import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  LoadingController
} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { TokenProvider } from '../../providers/token/token';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username: string;
  password: string;
  loading: any;
  tabElement: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProviders: AuthProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private tokenProvider: TokenProvider
  ) {
    this.tabElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewDidLoad() {
    if (this.tabElement) {
      (this.tabElement as HTMLElement).style.display = 'none';
    }
  }

  ionViewWillEnter() {
    if (this.tabElement) {
      (this.tabElement as HTMLElement).style.display = 'none';
    }
  }

  LoginUser() {
    this.ShowLoader();
    this.authProviders.LoginUser(this.username, this.password).subscribe(
      data => {
        this.tokenProvider.SetToken(data.token);
        setTimeout(() => {
          this.loading.dismiss();
          this.navCtrl.setRoot('TabsPage');
        }, 2000);
      },
      err => {
        this.loading.dismiss();
        if (err.error.msg) {
          this.SHowErrorAlert(err.error.msg[0].message);
        }

        if (err.error.message) {
          this.SHowErrorAlert(err.error.message);
        }
      }
    );
  }

  RegisterPage() {
    this.navCtrl.push('RegisterPage');
  }

  SHowErrorAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Login Error',
      subTitle: `${message}`,
      buttons: ['OK'],
      cssClass: 'alertCss'
    });

    alert.present();
  }

  ShowLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Athenticating...'
    });

    this.loading.present();
  }
}
