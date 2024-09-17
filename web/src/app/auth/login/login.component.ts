import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  credentials = { id: '', password: '' };

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.credentials).subscribe((response) => {
      localStorage.setItem('token', response.token);
    });
  }
}
