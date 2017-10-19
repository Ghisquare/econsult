import {Component, OnInit, ViewChild} from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ConsultPage } from '../pages/consult/consult';
import { ConsultListPage } from '../pages/consultlist/consultlist';
import { TabsPage } from '../pages/tabs/tabs';
import { MyDemandsPage } from '../pages/mydemands/mydemands';
import {Consultation} from "./model/consultation";
import {User} from "./model/user";
import {ConsultFormComponent} from "../components/consult-form.component";
import { ConsultationService } from '../providers/consultation.service';
import {UserService} from "../providers/user.service";

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

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private consultationService: ConsultationService
    , private userService: UserService) {
    this.initializeApp();

  }

  getConsultations(): void {
    this.consultationService.getConsultations().then(consultations => this.consultations = consultations);
  }

  getUsers(): void {
    this.userService.getUsers().then(users => this.users = users);
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

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
