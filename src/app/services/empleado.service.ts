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
  // Actualizar rol (baja temporal)
  updateRol(id: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/rol`, {});
  }
  
  actualizarEmpleado(clave_empleado: string, empleado: any) {
    return this.http.put(`${this.apiUrl}/actualizar/${clave_empleado}`, empleado);
  }

  // Eliminar un usuario (baja definitiva)
  deleteEmpleado(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}


