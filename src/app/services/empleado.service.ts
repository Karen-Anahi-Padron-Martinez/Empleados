// src/app/empleado/empleado.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private apiUrl = 'http://localhost:3000/api/empleados';  // Asegúrate de que la URL sea correcta

  constructor(private http: HttpClient) { }

  registrarEmpleado(empleado: any): Observable<any> {
    return this.http.post(this.apiUrl, empleado);
  }
  getEmpleados(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}


