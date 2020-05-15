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
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  username: string;
  email: string;
  password: string;

  loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProviders: AuthProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private tokenProvider: TokenProvider
  ) {}

  ionViewDidLoad() {}

  RegisterUser() {
    this.ShowLoader();
    this.authProviders
      .RegisterUser(this.username, this.email, this.password)
      .subscribe(
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

  SHowErrorAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Sign Up Error',
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
