import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MultasService {
  private apiUrl = 'https://localhost:5000/api/Multa';

  constructor(private http: HttpClient) {}

  getMultas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createMulta(multa: any): Observable<any> {
    return this.http.post(this.apiUrl, multa);
  }

  updateMulta(id: string, multa: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, multa);
  }

  deleteMulta(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
