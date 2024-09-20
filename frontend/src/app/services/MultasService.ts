import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultasService {
  private apiUrl = 'https://localhost:5000/api/multas';

  constructor(private http: HttpClient) { }

  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  private createAuthHeaders(): { headers: HttpHeaders } {
    return { headers: this.getHeaders() };
  }

  cadastrarMulta(multa: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, multa, this.createAuthHeaders());
  }

  atualizarMulta(multa: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, multa, this.createAuthHeaders());
  }

  getMultas(): Observable<any> {
    return this.http.get<any>(this.apiUrl, this.createAuthHeaders());
  }

  excluirMulta(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.createAuthHeaders());
  }
}
