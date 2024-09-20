import { Component } from '@angular/core';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; // E aqui
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/AuthService';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule, 
    RouterLink, 
    MatIconModule, 
    MatButtonModule,
    MatSidenavModule,
    MatNavList,
    RouterOutlet,
    MatToolbarModule,
    MatToolbar,
    MatMenuTrigger,
    MatMenu,
    CommonModule
  ], 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Corrigido: "styleUrls" com "s" no final
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  sairDaConta(): void {
    const token = this.authService.getToken(); // ou onde você armazena o token
    if (token) {
          console.log('pre clear', localStorage)
          localStorage.clear();
          console.log('pos clear', localStorage)
          this.router.navigate(['/']); 
    }
  }
}
