import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../auth/interfaces/LoginResponse';

//import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/login';  // URL de tu API de backend

  constructor(private http: HttpClient, private router:Router) { }

  login(clave: string, password: string): Observable<any> {
    const body = { clave, password };
    return this.http.post<LoginResponse>(this.apiUrl, body).pipe(
      tap((response) => {
        // Guarda el token
        this.saveToken(response.token);

        // Guarda la información del empleado en localStorage
        localStorage.setItem('empleado_id', response.usuario.id);  // Guarda el ID
        localStorage.setItem('clave_empleado', response.usuario.clave_empleado);  // Guarda la clave del empleado
      })
    );
  }

  // Guardar el token en localStorage o en algún almacenamiento seguro
  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Obtener el token almacenado
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Eliminar el token (Cerrar sesión)
  logout(): void {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/']);
    localStorage.removeItem('empleado_id');
    localStorage.removeItem('clave_empleado');  // Eliminar también la clave_empleado
    localStorage.removeItem('usuario_nombre');

  }
}
