import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:5000/api/auth'; // Atualize com sua URL de API

  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  logout(token: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout/${token}`, {});
  }

  // Método para obter o token do localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUsername(): string | null {
    return localStorage.getItem('username'); // Ou onde você estiver armazenando o nome do usuário
  }

  // Método para obter o tipo de usuário do localStorage
  getTipoUsuario(): number | null {
    const tipoUsuario = localStorage.getItem('tipoUsuario');
    return tipoUsuario ? parseInt(tipoUsuario, 10) : null;
  }  

  // Método para criar o cabeçalho com o token Bearer
  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  private createAuthHeaders(): { headers: HttpHeaders } {
    return { headers: this.getHeaders() };
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): Observable<boolean> {
    const token = this.getToken();
    // Verifica se o token existe e tem uma estrutura válida
    return of(!!token);
  }

  // Método de cadastro
  cadastro(userData: { email: string; password: string; userName: string; tipoUsuario: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastro`, userData);
  }

  // Atualize o método getUsers para incluir o cabeçalho de autenticação
  getUsers(): Observable<any> {
    const headers = this.createAuthHeaders();
    console.log('head', headers, 'apiurl', this.apiUrl)
    return this.http.get(`${this.apiUrl}/usuarios`, headers);
  }
}