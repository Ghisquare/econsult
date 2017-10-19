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
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemDataService }  from '../providers/data-services/in-memory-data.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service/auth-service';
import {UserService} from "../providers/user.service";
import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";
import {ConsultPage} from "../pages/consult/consult";
import {ConsultListPage} from "../pages/consultlist/consultlist";
import {MyDemandsPage} from "../pages/mydemands/mydemands";
import {TabsPage} from "../pages/tabs/tabs";
import {RouterModule} from "@angular/router";
import {SpecialtyService} from "../providers/specialty.service";
import {ContactSelectComponent} from "../components/contact-select";
import {RegisterPage} from "../pages/register/register";
import {LogoutButton} from "../components/logout-button";
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


//import {ConsultListPage} from "../pages/consultlist/consultlist";

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ConsultPage,
    ConsultListPage,
    MyDemandsPage,
    MyResponsesPage,
    ConsultFormComponent,
    SpecialtySelectComponent,
    ContactSelectComponent,
    DemandResumeComponent,
    PatientResumeComponent,
    ResponseFormComponent,
    TabsPage,
    LogoutButton,
    RegisterPage,
    ShowPhotoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule, // <-- #2 add to @NgModule imports ==> https://angular.io/guide/reactive-forms
    IonicModule.forRoot(MyApp,
      { tabsPlacement: 'bottom' }),
    InMemoryWebApiModule.forRoot(InMemDataService),
    RouterModule.forRoot([
      { path: '', redirectTo: '/', pathMatch: 'full' },
     // { path: 'detail/:id', component: HeroDetailComponent },
      { path: 'consult',     component: ConsultFormComponent },
      { path: 'mydemands',     component: MyDemandsPage }
        ])
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ConsultPage,
    ConsultListPage,
    MyDemandsPage,
    MyResponsesPage,
    RegisterPage,
    TabsPage,
    ShowPhotoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    UserService,
    SpecialtyService,
    ProfessionService,
    PatientService,
    CallNumber,
    File,
    Transfer,
    Camera,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler}  ]
})


export class AppModule {}
