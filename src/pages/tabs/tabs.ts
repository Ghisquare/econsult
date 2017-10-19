import { Component } from '@angular/core';
import {HomePage} from "../home/home";
import {ConsultPage} from "../consult/consult";
import {MyDemandsPage} from "../mydemands/mydemands";
import {ConsultListPage} from "../consultlist/consultlist";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ConsultPage;
  tab3Root = ConsultListPage;
  tab4Root = MyDemandsPage;

  constructor() {

  }
}
