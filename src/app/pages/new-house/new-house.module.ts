import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NewHouseRoutingModule} from "./new-house-routing.module";
import {NewHouseComponent} from "./new-house.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatRadioModule} from "@angular/material/radio";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  imports: [
    CommonModule,
    NewHouseRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
  declarations: [NewHouseComponent],
  exports: [
    NewHouseComponent
  ]
})
export class NewHouseModule {}

