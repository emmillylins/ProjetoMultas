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
    return this.http.post<any>(`${this.apiUrl}/login`, credentials);
  }

  // Método para obter o token do localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Método para criar o cabeçalho com o token Bearer
  createAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Método de cadastro
  cadastro(userData: { email: string; password: string; userName: string; tipoUsuario: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cadastro`, userData);
  }

  // Atualize o método getUsers para incluir o cabeçalho de autenticação
  getUsers(): Observable<{ success: boolean; data: any[] }> {
    const headers = this.createAuthHeaders();
    console.log('head', headers, 'apiurl', this.apiUrl)
    return this.http.get<any>(`${this.apiUrl}/usuarios`, { headers });
  }

  // Exemplo de método para uma requisição autenticada
  getProtectedData(): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/protected`, { headers });
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): Observable<boolean> {
    const token = this.getToken();
    // Verifica se o token existe e tem uma estrutura válida
    return of(!!token);
  }
}
