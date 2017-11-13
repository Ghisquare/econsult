import { Component } from '@angular/core';


import {AuthService} from "../../providers/auth-service/auth-service";
import {NavController} from "ionic-angular";
import {LoginPage} from "../../pages/login/login";

@Component({
  selector: 'logout-button',
  templateUrl: 'logout-button.html'
})
export class LogoutButton {
  username: string;

  constructor(public navCtrl: NavController, private authService: AuthService) {
    // If we navigated to this page, we will have an item available as a nav param
    if(authService.getUserInfo()) this.username= authService.getUserInfo().forname[0] + authService.getUserInfo().name[0];
  }

 public logout() {
  this.authService.logout().subscribe(succ => {
    this.navCtrl.setRoot(LoginPage);
  });
 }
}
