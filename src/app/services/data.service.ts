import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getDepartamentos() {
    return this.http.get<any[]>(`${this.apiUrl}/departamento`);
  }

  getPuestos() {
    return this.http.get<any[]>(`${this.apiUrl}/puesto`);
  }

  getDocumentos() {
    return this.http.get<any[]>(`${this.apiUrl}/documento`);
  }

  getActividades() {
    return this.http.get<any[]>(`${this.apiUrl}/actividad`);
  }

  getCiudades() {
    return this.http.get<any[]>(`${this.apiUrl}/ciudad`);
  }

  getParentescos() {
    return this.http.get<any[]>(`${this.apiUrl}/parentesco`);
  }
}
