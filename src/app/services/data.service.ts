import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getDepartamentos() {
    return this.http.get<any[]>(`${this.apiUrl}/departamentos`);
  }

  getPuestos() {
    return this.http.get<any[]>(`${this.apiUrl}/puestos`);
  }

  getDocumentos() {
    return this.http.get<any[]>(`${this.apiUrl}/documentos`);
  }

  getActividades() {
    return this.http.get<any[]>(`${this.apiUrl}/actividades`);
  }

  getCiudades() {
    return this.http.get<any[]>(`${this.apiUrl}/ciudades`);
  }

  getParentescos() {
    return this.http.get<any[]>(`${this.apiUrl}/parentescos`);
  }
}
