import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';
import {AuthGuard} from "../services/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children:[
      {
        path: 'contact',
        loadChildren: ()=>import('../../pages/contact/contact.module').then(m=>m.ContactModule),
      },
      {
        path: 'houses',
        loadChildren:()=>import('../../pages/houses/houses.module').then(m=>m.HousesModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'new-house',
        loadChildren:()=>import('../../pages/new-house/new-house.module').then(m=>m.NewHouseModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'login',
        loadChildren:()=>import('../../pages/login/login.module').then(m=>m.LoginModule)
      },
      {
        path: 'signup',
        loadChildren:()=>import('../../pages/signup/signup.module').then(m=>m.SignupModule)
      },
    ]
  }

  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
