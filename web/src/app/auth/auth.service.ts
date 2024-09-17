import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:5000/Auth/login';

  constructor(private http: HttpClient) {}

  login(credentials: { id: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }
}
    