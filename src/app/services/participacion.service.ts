import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipacionService {
  private apiUrl = 'http://localhost:3000/api/registrar/participaciones';

  constructor(private http: HttpClient) {}

  registrarParticipaciones(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.apiUrl, JSON.stringify(data), { headers })
      .pipe(
        catchError(error => {
          console.error('❌ Error al registrar curso:', error);
          return throwError(() => new Error('Error en la petición al servidor'));
        })
      );
  }

  
}
