import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {AuthService} from "../../shared/services/auth.service";
import {User} from "../../shared/models/User";
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });

  constructor(private location: Location, private authService: AuthService,
              private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;
    if (email && password) {
      this.authService.signup(email, password).then(cred=>{
        console.log(cred);
        const firstname = this.signUpForm.get('name.firstname')?.value;
        const lastname = this.signUpForm.get('name.lastname')?.value;
        if (firstname && lastname) {
          const user: User = {
            id: cred.user?.uid as string,
            email: email,
            username: email.split('@')[0],
            name: {
              firstname: firstname,
              lastname: lastname
            }
          };
          this.userService.create(user).then(_ =>
          {
            console.log('User added successfully');
            this.router.navigateByUrl('/houses');
          }).catch(error=>{
            console.error(error);
          });
          console.log(user);
        }
      }).catch(error=>{
        console.log(error);
      });
    }
  }
}
