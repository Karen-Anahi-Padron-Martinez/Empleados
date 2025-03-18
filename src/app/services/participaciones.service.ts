import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipacionesService {

  private apiUrl = 'http://localhost:3000/api/participacion/empleados-con-cursos'; // Cambia la URL si es necesario

  constructor(private http: HttpClient) { }

  // Método para obtener empleados con sus cursos y actividades
  obtenerEmpleadosConCursos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
