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
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [
    [
      MatToolbarModule, 
      MatInputModule,
      RouterLink, 
      MatIconModule, 
      MatButtonModule, 
      MatFormFieldModule,
      ReactiveFormsModule,
      MatOption,
      MatSelectModule
    ]
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent implements OnInit {
  form!: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      tipoUsuario: [1, Validators.required]
    });
  }

  cadastro(): void {
    if (this.form.valid) {
      this.authService.cadastro(this.form.value).subscribe({
        next: (response) => {
          this.matSnackBar.open('Cadastro realizado com sucesso!', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
          });
          this.router.navigate(['/login']);
        },
        error: (err) => {
          if (err.status === 400) {
            alert(err.error.errors);
          }
          else {
            this.matSnackBar.open('Erro ao realizar cadastro. Tente novamente.', 'Close', {
              duration: 5000,
              horizontalPosition: 'center',
            });
          }
        }
      });
    }
  }
}
