import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
//import { RouterModule }   from '@angular/router';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { ConsultFormComponent } from '../components/consult-form.component';
import { SpecialtySelectComponent } from '../components/specialty-select';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemDataService }  from '../providers/data-services/in-memory-data.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service/auth-service';
import {UserService} from "../providers/user.service";
import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";
import {ConsultPage} from "../pages/consult/consult";
import {ConsultListPage} from "../pages/consultlist/consultlist";
import {ConsultedListPage} from "../pages/consulted/consulted-list";
import {RouterModule} from "@angular/router";
import {SpecialtyService} from "../providers/specialty.service";
import {ContactSelectComponent} from "../components/contact-select";
import {RegisterPage} from "../pages/register/register";
import {LogoutButton} from "../components/navigation/logout-button";
import {MyNavbar} from "../components/navigation/my-navbar";
import {DemandResumeComponent} from "../components/demand-resume";
import {ResponseFormComponent} from "../components/response-form.component";
import {MyResponsesPage} from "../pages/myresponses/myresponses";
import {ProfessionService} from "../providers/profession.service";
import {PatientService} from "../providers/patient.service";
import {PatientResumeComponent} from "../components/patient-resume";
import {CallNumber} from "@ionic-native/call-number";
import {Camera} from "@ionic-native/camera";
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import {ShowPhotoPage} from "../pages/show-photo/show-photo";
import {ImageService} from "../providers/image.service";
import {ContactButtonsComponent} from "../components/contact-buttons";
import {ConsultedPage} from "../pages/consulted/consulted-page";
import {ResponsePage} from "../pages/myresponses/response";
import {MessageService} from "../providers/message.service";
import {MessageFormComponent} from "../components/messages/message-form";
import {MessageListComponent} from "../components/messages/message-list";
import {ResponseResumeComponent} from "../components/responses/response-resume";
import {ErrorMsgComponent} from "../components/forms/error-msg";
import {SettingsPage} from "../pages/settings/settings";
import {EmailComposer} from "@ionic-native/email-composer";

/*const IonicPro = Pro.init('b1148716', {
  appVersion: "0.0.1"
});*/

export class MyErrorHandler implements ErrorHandler {
  handleError(err: any): void {
   // IonicPro.monitoring.handleNewError(err);
    console.log(err);
  }
}

//import {ConsultListPage} from "../pages/consultlist/consultlist";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ConsultPage,
    ConsultedPage,
    ConsultListPage,
    ConsultedListPage,
    MyResponsesPage,
    ResponsePage,
    ConsultFormComponent,
    SpecialtySelectComponent,
    ContactSelectComponent,
    DemandResumeComponent,
    ResponseResumeComponent,
    PatientResumeComponent,
    ResponseFormComponent,
    ContactButtonsComponent,
    MessageFormComponent,
    MessageListComponent,
    LogoutButton,
    MyNavbar,
    RegisterPage,
    ShowPhotoPage,
    ErrorMsgComponent,
    SettingsPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule, // <-- #2 add to @NgModule imports ==> https://angular.io/guide/reactive-forms
    IonicModule.forRoot(MyApp),
//    InMemoryWebApiModule.forRoot(InMemDataService),
    RouterModule.forRoot([
      { path: '', redirectTo: '/', pathMatch: 'full' },
     // { path: 'detail/:id', component: HeroDetailComponent },
      { path: 'consult',     component: ConsultFormComponent },
      { path: 'consulted-list',     component: ConsultedListPage }
        ])
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ConsultPage,
    ConsultedPage,
    ConsultListPage,
    ConsultedListPage,
    MyResponsesPage,
    ResponsePage,
    RegisterPage,
    ShowPhotoPage,
    SettingsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: MyErrorHandler},
    AuthService,
    UserService,
    SpecialtyService,
    ProfessionService,
    PatientService,
    MessageService,
    ImageService,
    CallNumber,
    File,
    Transfer,
    Camera,
    FilePath,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}  ]
})


export class AppModule {}
