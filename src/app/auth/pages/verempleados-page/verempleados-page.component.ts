import { Component } from '@angular/core';

@Component({
  selector: 'app-verempleados-page',
  templateUrl: './verempleados-page.component.html',
  styleUrls: ['./verempleados-page.component.css']
})
export class VerempleadosPageComponent {
  searchText: string = '';  // Texto de búsqueda
  users: any[] = [          // Datos de ejemplo
    { id: 1, nombre: 'Juan Pérez', apellido: 'Pérez', rfc: 'JUAN123', clave: 'EMP001', status: 'Activo' },
    { id: 2, nombre: 'Ana Gómez', apellido: 'Gómez', rfc: 'ANA456', clave: 'EMP002', status: 'Activo' },
    { id: 3, nombre: 'Luis Rodríguez', apellido: 'Rodríguez', rfc: 'LUI789', clave: 'EMP003', status: 'Activo' },
    // Agregar más usuarios según sea necesario
  ];
  selectedUser: any = null; // Usuario seleccionado

  // Filtrar usuarios por apellido, RFC o clave
  get filteredUsers() {
    return this.users.filter(user =>
      user.apellido.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.rfc.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.clave.toLowerCase().includes(this.searchText.toLowerCase())
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