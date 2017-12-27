import {Component, ViewChild} from '@angular/core';
import {AlertController, MenuController, Nav, NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import {Consultation} from "./model/consultation";
import {User} from "./model/user";
import { ConsultationService } from '../providers/consultation.service';
import {UserService} from "../providers/user.service";
import {AuthService} from "../providers/auth-service/auth-service";
import {SettingsPage} from "../pages/settings/settings";
import {HomePage} from "../pages/home/home";
import {EmailComposer} from "@ionic-native/email-composer";

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
    , private userService: UserService, public menu : MenuController, private emailComposer: EmailComposer, private alertControler: AlertController) {
    this.initializeApp();
    this.pages = [
      { title: 'Mode d\'emploi', component: HomePage },
      { title: 'Qui sommes-nous', component: HomePage },
    ];

    this.menu.enable(true, 'menu1');
    this.menu.enable(true, 'menu2');

  }

  public presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Pages de contenus',
      subTitle: 'pages à rédiger',
      buttons: ['ok']
    });
    alert.present();
  }

  public doLogout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot(LoginPage);
    });
  }

  public doSettings() {
    this.nav.push(SettingsPage);
  }

  public doFeedBack() {
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
        console.log('Email available');
      } else {
        console.log('Email not available');
      }
    });
    let email = {
      to: 'germainbarreau@hotmail.com',
      cc: 'guillaume.larre@gmail.com',
//      bcc: ['john@doe.com', 'jane@doe.com'],
      subject: "EConsult - Retour sur l'utilisation de l'app",
      body: "donnez-nous vos impressions sur votre expérience l'app E-Consult",
      isHtml: true
    };

    this.emailComposer.open(email);


  }

  getConsultations(): void {
    this.consultationService.getConsultations().then(consultations => this.consultations = consultations);
  }

  getUsers(): void {
    this.userService.getUsers().then(users => {
      this.users = users;
      //AUTO LOGIN : comment to have login
      /*this.auth.login({ email: 'gl@gl.com', password: 'gl' }).subscribe(allowed => {
          if (allowed) {
            console.log("AutoLogin");

            this.nav.setRoot(HomePage);
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
