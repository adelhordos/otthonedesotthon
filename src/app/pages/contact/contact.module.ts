import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {ContactComponent} from "./contact.component";
import {ContactRoutingModule} from "./contact-routing.module";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
    imports: [
        CommonModule,
        ContactRoutingModule,
        MatCardModule,
        MatIconModule,
    ],
  declarations: [ContactComponent],
  exports: [
    ContactComponent
  ]
})
export class ContactModule {}

