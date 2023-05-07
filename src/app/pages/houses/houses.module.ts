import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {HousesRoutingModule} from "./houses-routing.module";
import {HousesComponent} from "./houses.component";
import {SearchModule} from "../../shared/search/search.module";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {FormatNumberPipe} from "../../shared/pipe/format-number.pipe";
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  imports: [
    CommonModule,
    HousesRoutingModule,
    SearchModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  declarations: [HousesComponent, FormatNumberPipe, EditDialogComponent],
  exports: [
    HousesComponent,
  ]
})
export class HousesModule {}

