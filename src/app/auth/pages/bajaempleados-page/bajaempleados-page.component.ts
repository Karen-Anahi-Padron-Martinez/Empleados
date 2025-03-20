import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../../services/empleado.service';

@Component({
  selector: 'app-bajaempleados-page',
  templateUrl: './bajaempleados-page.component.html',
  styleUrls: ['./bajaempleados-page.component.css'] // Si tienes estilos adicionales
})
export class BajaempleadosPageComponent implements OnInit {
  users: any[] = [];

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  // Función para cargar los usuarios con rol 3
  cargarUsuarios(): void {
    this.empleadoService.getUsersWithRole3().subscribe(
      (data) => {
        this.users = data;  // Asignar los usuarios con rol 3 a la lista 'users'
      },
      (error) => {
        console.error('Error al obtener los usuarios:', error);
      }
    );
  }

  // Función para dar de alta a un empleado (actualizar el rol)
  darAlta(id: string): void {
    this.empleadoService.updatRol(id).subscribe(response => {
      console.log('Alta realizada:', response);
      alert('Alta realizada');
      // Actualizar la lista de usuarios para reflejar el cambio
      this.cargarUsuarios(); // Recargar los datos
    }, (error) => {
      console.error('Error al dar de alta al usuario:', error);
    });
  }

  // Función para dar baja definitiva a un empleado
  bajaDefinitiva(id: string): void {
    this.empleadoService.deleteEmpleado(id).subscribe(response => {
      console.log('Usuario eliminado:', response);
      alert("Empleado eliminado")
      // Eliminar el usuario de la lista localmente
      this.users = this.users.filter(user => user._id !== id);  // Filtramos el usuario eliminado
    }, (error) => {
      console.error('Error al eliminar al usuario:', error);
    });
  }
}
