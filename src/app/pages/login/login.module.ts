import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {LoginRoutingModule} from "./login-routing.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatCardModule,
        MatIconModule,
        ReactiveFormsModule
    ]
})
export class LoginModule { }
