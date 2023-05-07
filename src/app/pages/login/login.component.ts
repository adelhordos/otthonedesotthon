import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email = new FormControl('');
  password = new FormControl('');

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;
  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  async login() {
    const email = this.email.value;
    const password = this.password.value;

    if (email && password) {
      this.loading = true;
      try {
        const cred = await this.authService.login(email, password);
        console.log(cred);
        await this.router.navigateByUrl('/menu/houses');
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    }
  }


  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }

}
