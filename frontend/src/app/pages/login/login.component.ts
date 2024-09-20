import { Component, OnInit, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/AuthService';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatInputModule,
    RouterLink, 
    MatIconModule, 
    MatButtonModule, 
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  hide = true;
  private authService = inject(AuthService);
  private router = inject(Router);
  private matSnackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.form.valid) {
      this.authService.login(this.form.value).subscribe({
        next: (response) => {
          if (response.success) {
            const token = response.data.token;
            const tipoUsuario = response.data.tipoUsuario;
            const username = response.data.username;

            // Armazena o token e o tipoUsuario no localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('tipoUsuario', tipoUsuario.toString());
            localStorage.setItem('username', username);

            this.matSnackBar.open('Login bem-sucedido!', 'Close', {
              duration: 5000,
              horizontalPosition: 'center',
            });

            this.router.navigate(['/usuarios']);
          } else {
            this.matSnackBar.open('Falha no login. Por favor, tente novamente.', 'Close', {
              duration: 5000,
              horizontalPosition: 'center',
            });
          }
        },
        error: (error) => {
          this.matSnackBar.open(error.error.message, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
        }
      });
    }
  }
}