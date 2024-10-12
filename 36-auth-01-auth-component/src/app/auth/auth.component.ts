import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseDate, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AuthUser } from './user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  tokenId: string = '';
  token: string = '';
  expiresIn: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    this.isLoading = true;
    if (this.isLoginMode) {
      const subscription = this.authService.signin(email, password).subscribe({
        next: value => {
          console.log(value);
          this.isLoginMode = false;
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        error:  error =>{
          this.error = error;
          console.log(error)
          this.isLoading = false;
        }
      });
    }else {
      const subscription = this.authService.signup(email, password).subscribe({
        next: value => {
          console.log(value);
          this.tokenId = value.idToken;
          this.token = value.refreshToken;
          this.expiresIn = value.expiresIn;
  
          this.isLoginMode = false;
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        error:  error =>{
          this.error = error;
          console.log(error)
          this.isLoading = false;
        }
      });
    }
  }

  logout() {
    this.tokenId = '';
    this.token = '';
    this.expiresIn = '';
    this.isLoginMode = true;
    this.isLoading = false;
    this.error = null;
  }
}
