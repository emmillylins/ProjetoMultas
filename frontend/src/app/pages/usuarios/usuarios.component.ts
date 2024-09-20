// src/app/user-list/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AuthService } from '../../services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    MatTableModule
  ],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  users: any[] = [];
  displayedColumns: string[] = ['id', 'userName', 'email', 'tipoUsuario'];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.authService.getUsers().subscribe({
      next: (response) => {
        if (response.success) {
          this.users = response.data;
        } else {
          // Tratar o caso em que `success` é falso
          console.error('Failed to fetch users:', response);
        }
      },
      error: (err) => {
        // Tratar erros de requisição HTTP
        if (err.status === 403) {
          localStorage.clear();
          this.router.navigate(['']);
        }
      },
      complete: () => {
        // Opcional: código a ser executado após a conclusão da requisição
        console.log('fetch complete');
      }
    });
  }  
}
