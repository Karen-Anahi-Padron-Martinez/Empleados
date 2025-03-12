import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../../services/empleado.service';


@Component({
  selector: 'app-verempleados-page',
  templateUrl: './verempleados-page.component.html',
  styleUrls: ['./verempleados-page.component.css']
})
export class VerempleadosPageComponent implements OnInit {
  searchText: string = '';  // Texto de búsqueda
  users: any[] = [];        // Datos de los empleados
  selectedUser: any = null; // Usuario seleccionado

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    // Obtener los empleados desde el servicio
    this.empleadoService.getEmpleados().subscribe(data => {
      this.users = data;
    });
  }

  // Filtrar usuarios por apellido, RFC o clave
 // Filtrar usuarios por apellido, RFC o clave
 get filteredUsers() {
  return this.users.filter(user =>
    user.apellido_paterno.toLowerCase().includes(this.searchText.toLowerCase()) ||
    user.apellido_materno.toLowerCase().includes(this.searchText.toLowerCase()) ||
    user.rfc.toLowerCase().includes(this.searchText.toLowerCase()) ||
    user.clave_empleado.toLowerCase().includes(this.searchText.toLowerCase())
  );
}


  // Seleccionar usuario para mostrar detalles
  selectUser(user: any) {
    this.selectedUser = user;
  }



  // Actualizar información del usuario
  updateUser() {
    if (this.selectedUser) {
      // Lógica de actualización
      alert(`Actualizando usuario ${this.selectedUser.nombre}`);
    }
  }

  // Dar baja temporal al usuario
  deactivateUser() {
    if (this.selectedUser) {
      this.selectedUser.status = 'Baja Temporal';
      alert(`Usuario ${this.selectedUser.nombre} dado de baja temporalmente`);
    }
  }

  // Dar baja definitiva al usuario
  permanentlyDeleteUser() {
    if (this.selectedUser) {
      const index = this.users.findIndex(user => user.id === this.selectedUser.id);
      if (index > -1) {
        this.users.splice(index, 1);  // Eliminar usuario
        this.selectedUser = null;  // Limpiar selección
        alert(`Usuario ${this.selectedUser.nombre} dado de baja definitiva`);
      }
    }
  }
}