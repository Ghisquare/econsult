import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import {TabsPage} from "../tabs/tabs";
import {RegisterPage} from "../register/register";
import { Pro } from '@ionic/pro';

/**
 * DevDactic tutorial for the LoginPage page.
 *
 * See https://devdactic.com/login-ionic-2/ for more info
 * on login system
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public login() {
    console.log('login function');

    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
        if (allowed) {
          Pro.getApp().monitoring.log('Login successfull', { level: 'info' })

          this.nav.setRoot(TabsPage);
        } else {
          this.showError("Access Denied");
        }
      },
      error => {
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  ionViewWillEnter() {

    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(56px)';
      });
    } // end if
  }

  ionViewDidLeave() {
    let tabs = document.querySelectorAll('.tabbar');
    if ( tabs !== null ) {
      Object.keys(tabs).map((key) => {
        tabs[ key ].style.transform = 'translateY(0)';
      });
    } // end if
  }
}
