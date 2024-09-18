// src/app/user-list/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { AuthService } from '../../services/AuthService';

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
  displayedColumns: string[] = ['id', 'userName', 'email', 'phoneNumber'];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.authService.getUsers().subscribe({
      next: (response) => {
        if (response.success) {
          this.users = response.data;
          console.log('data', response.data);
        } else {
          // Tratar o caso em que `success` é falso
          console.error('Failed to fetch users:', response);
        }
      },
      error: (err) => {
        // Tratar erros de requisição HTTP
        console.error('Error fetching users:', err);
      },
      complete: () => {
        // Opcional: código a ser executado após a conclusão da requisição
        console.log('fetch complete');
      }
    });
  }
  
}
