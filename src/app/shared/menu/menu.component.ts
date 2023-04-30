import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isExpanded: boolean=false;
  loggedInUser?: firebase.default.User | null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(user=>{
      this.loggedInUser=user;
      localStorage.setItem('user', JSON.stringify(this.loggedInUser));
    }, error =>{
      console.error(error);
      localStorage.setItem('user',JSON.stringify('null'));
    });
  }

  logout() {
    this.authService.logout().then(()=>{
      console.log('Logged out successfully');
    }).catch(error=>{
      console.log(error);
    });
  }
}
