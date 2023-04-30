import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";


@NgModule({
    declarations: [
        SearchComponent
    ],
    exports: [
        SearchComponent
    ],
    imports: [
        CommonModule,
        SearchRoutingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatRadioModule,
        FormsModule
    ]
})
export class SearchModule { }
