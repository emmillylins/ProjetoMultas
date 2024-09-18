import { Component } from '@angular/core';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button'; // E aqui
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';

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
    MatToolbar
  ], 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Corrigido: "styleUrls" com "s" no final
})
export class NavbarComponent {}
