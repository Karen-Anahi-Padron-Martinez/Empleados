import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {

  public sidebarItems = [
    //{label:'Login',icon:'label',url:'./login'},
    {label:'Registro Empleados',icon:'add',url:'./new-account'},
    {label:'Empleados Registrados',icon:'how_to_reg',url:'./ver-empleado'},
    {label: 'Registrar Curso-Participación', icon:'app_registration',url:'./registrarcp'},
    {label:'Ver Cursos-Actividades',icon:'search',url:'./consultar'},
    {label:'Empleados Baja',icon:'restart_alt',url:'./baja'}
    
  ]

  constructor(private authService: AuthService) {}
  
  onLogout() {
    this.authService.logout();  // Llamamos al servicio de logout
  }
}
