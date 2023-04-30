import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {SearchModule} from "../search/search.module";
import {LoginModule} from "../../pages/login/login.module";


@NgModule({
  declarations: [
    MenuComponent
  ],
  exports: [
    MenuComponent
  ],
    imports: [
        CommonModule,
        MenuRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        SearchModule,
        LoginModule
    ]
})
export class MenuModule { }
