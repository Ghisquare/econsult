import {Component, ViewChild} from '@angular/core';
import {AlertController, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import {Consultation} from "./model/consultation";
import {User} from "./model/user";
import { ConsultationService } from '../providers/consultation.service';
import {UserService} from "../providers/user.service";
import {AuthService} from "../providers/auth-service/auth-service";
import {TabsPage} from "../pages/tabs/tabs";

@Component({
  templateUrl: 'app.html',
  providers: [ConsultationService, UserService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = LoginPage;

  consultations: Consultation[];
  users: User[];
  currentUser: User;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, private alertCtrl: AlertController, private auth: AuthService, public statusBar: StatusBar, public splashScreen: SplashScreen, private consultationService: ConsultationService
    , private userService: UserService) {
    this.initializeApp();

  }

  getConsultations(): void {
    this.consultationService.getConsultations().then(consultations => this.consultations = consultations);
  }

  getUsers(): void {
    this.userService.getUsers().then(users => {
      this.users = users;
      //AUTO LOGIN : comment to have login
      /*this.auth.login({ email: 'gb@gb.com', password: 'gb' }).subscribe(allowed => {
          if (allowed) {

            this.nav.setRoot(TabsPage);
          } else {
            this.showError("Access Denied");
          }
        },
        error => {
          this.showError(error);
        });*/

    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.getConsultations();
      this.getUsers();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  showError(text) {

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
