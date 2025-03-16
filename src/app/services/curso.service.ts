import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private apiUrl = 'http://localhost:3000/api/registrar-cursos';

  constructor(private http: HttpClient) {}

  registrarCursos(data: any): Observable<any> {
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
