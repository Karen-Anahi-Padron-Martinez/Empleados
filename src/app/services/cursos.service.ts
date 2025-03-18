import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private apiUrl = 'http://localhost:3000/api/curso/cursos'; // Cambia la URL si es necesario

  constructor(private http: HttpClient) { }

  // Método para obtener los cursos de los empleados
  obtenerCursosDeEmpleados(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
