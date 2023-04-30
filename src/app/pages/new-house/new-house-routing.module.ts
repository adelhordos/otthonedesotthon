import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewHouseComponent} from "./new-house.component";

const routes: Routes=[
  {
    path: '',
    component: NewHouseComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewHouseRoutingModule{}
