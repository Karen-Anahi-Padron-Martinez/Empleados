import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getDepartamentos() {
    return this.http.get<any[]>(`${this.apiUrl}/departamento/departamento`);
  }

  getPuestos() {
    return this.http.get<any[]>(`${this.apiUrl}/puesto/puesto`);
  }

  getDocumentos() {
    return this.http.get<any[]>(`${this.apiUrl}/documento/documento`);
  }

  getActividades() {
    return this.http.get<any[]>(`${this.apiUrl}/actividad/actividad`);
  }

  getCiudades() {
    return this.http.get<any[]>(`${this.apiUrl}/ciudad/ciudad`);
  }

  getParentescos() {
    return this.http.get<any[]>(`${this.apiUrl}/parentesco/parentesco`);
  }



  agregarTelefono(empleadoId: string, telefono: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/empleados/${empleadoId}/telefonos`, { telefono });
  }
  actualizarTelefono(empleadoId: string, oldTelefono: string, newTelefono: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/empleados/${empleadoId}/telefonos/${oldTelefono}/${newTelefono}`, {});
  }
  eliminarTelefono(empleadoId: string, telefono: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/empleados/${empleadoId}/telefonos/${telefono}`);
  }

  agregarCorreo(empleadoId: string, correo: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/empleados/${empleadoId}/correos`, { correo });
  }

  eliminarCorreo(empleadoId: string, correo: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/empleados/${empleadoId}/correos/${correo}`);
  }

  actualizarCorreo(empleadoId: string, oldCorreo: string, newCorreo: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/empleados/${empleadoId}/correos/${oldCorreo}`, { correo: newCorreo });
  }


  actualizarFoto(empleadoId: string, fotoData: { foto: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/empleados/${empleadoId}/foto`, fotoData);
  }


  getCursosPorEmpleado(clave_empleado: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cursos/${clave_empleado}`);
  }

  getParticipacionesPorEmpleado(empleadoId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/participacion/empleado/${empleadoId}`);
  }


  getEmpleadoPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/empleados/${id}`);
  }
  put(url: string, body: any): Observable<any> {
      return this.http.put<any>(url, body);
    }
  }
