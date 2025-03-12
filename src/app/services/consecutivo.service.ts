import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsecutivoService {
  private apiUrl = 'http://localhost:3000/api'; // URL del backend

  constructor(private http: HttpClient) {}

  obtenerUltimoConsecutivo(): Observable<{ consecutivo: number }> {
    return this.http.get<{ consecutivo: number }>(`${this.apiUrl}/ultimo-consecutivo`);
  }
}
