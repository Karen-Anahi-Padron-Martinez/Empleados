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
  isEditing: boolean = false;
  telefonosText: string = ''; 

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
    this.isEditing = false;
  }

  // Activar el modo de edición
  editarEmpleado() {
    this.isEditing = true;  // Activar el modo de edición
  }

  // Función para actualizar el empleado
  actualizarEmpleado() {
    if (this.selectedUser) {
      this.empleadoService.actualizarEmpleado(this.selectedUser.clave_empleado, this.selectedUser).subscribe(response => {
        console.log('Empleado actualizado:', response);
        alert('Empleado actualizado correctamente');
        this.isEditing = false;  // Salimos del modo de edición
      }, error => {
        console.error('Error al actualizar el empleado:', error);
      });
    }
  }
  

  // Dar de baja temporal (actualizar rol)
  bajaTemporal(id: string): void {
    this.empleadoService.updateRol(id).subscribe(response => {
      console.log('Baja temporal realizada:', response);
      // Actualizar la lista de usuarios para reflejar el cambio
      this.ngOnInit(); // Recargar los datos
    });
  }

  // Dar de baja definitiva (eliminar usuario)
  bajaDefinitiva(id: string): void {
    this.empleadoService.deleteEmpleado(id).subscribe(response => {
      console.log('Usuario eliminado:', response);
      // Eliminar el usuario de la lista localmente
      this.users = this.users.filter(user => user._id !== id);
      this.selectedUser = null; // Limpiar el detalle del usuario seleccionado
    });
  }
}