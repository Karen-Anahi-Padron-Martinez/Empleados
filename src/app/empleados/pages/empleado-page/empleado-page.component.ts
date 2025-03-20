import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-empleado-page',
  templateUrl: './empleado-page.component.html',
  styleUrls: ['./empleado-page.component.css']
})
export class EmpleadoPageComponent  implements OnInit {
  empleado: any;
  apiUrl: string = 'http://localhost:3000/api';
  telefonoEditado: string = '';  // Usamos una variable de tipo string para manejar la edición del teléfono
  correoEditado: string = '';    // Usamos una variable de tipo string para manejar la edición del correo
  telefonoAActualizar: string | null = null;  // Teléfono que se está editando
  correoAActualizar: string | null = null;    // Correo que se está editando
  nuevoTelefono: string = '';
  nuevoCorreo: string = '';
  selectedFile: File | null = null;
  editarFoto: boolean | undefined;


  constructor(private dataService: DataService) {}

  ngOnInit() {
    const empleadoId = localStorage.getItem('empleado_id');
    console.log('empleado_id from localStorage:', empleadoId);  // Log the value
    if (empleadoId) {
      this.obtenerEmpleado(empleadoId);  // Call the function to get the employee data
    } else {
      console.error('No se ha encontrado el ID del empleado');
      // Handle the case when the ID is not found, like redirecting to the login page
    }
  }

  obtenerEmpleado(empleadoId: string) {
    this.dataService.getEmpleadoPorId(empleadoId).subscribe(
      (data) => {
        this.empleado = data;  // Ensure empleado is assigned
        // Check if foto is undefined and assign a default if missing
        if (this.empleado && !this.empleado.foto) {
          this.empleado.foto = 'https://cdn-icons-png.flaticon.com/512/3106/3106921.png'; // Default photo if not available
        }
      },
      (error) => {
        console.error('Error al obtener los datos del empleado', error);
        // Handle API errors (maybe redirect to a different page or show a message)
      }
    );
  }

  iniciarEdicionTelefono(telefono: string) {
    this.telefonoAActualizar = telefono;
    this.telefonoEditado = telefono;  // Establecer el teléfono que se está editando
  }

  actualizarTelefono() {
    if (this.telefonoAActualizar) {
      if (this.telefonoEditado !== this.telefonoAActualizar) {
        this.dataService.actualizarTelefono(this.empleado._id, this.telefonoAActualizar, this.telefonoEditado).subscribe(
          (response) => {
            const index = this.empleado.telefonos.indexOf(this.telefonoAActualizar);
            if (index !== -1) {
              this.empleado.telefonos[index] = this.telefonoEditado;
            }
            this.telefonoAActualizar = null; // Deja de editar el teléfono
            this.telefonoEditado = ''; // Limpiar el valor editado
          },
          (error) => {
            console.error('Error al actualizar teléfono', error);
          }
        );
      } else {
        this.telefonoAActualizar = null; // Si no hay cambio, simplemente vuelve al estado normal
        this.telefonoEditado = '';  // Limpiar el valor editado
      }
    }
  }

  iniciarEdicionCorreo(correo: string) {
    this.correoAActualizar = correo;
    this.correoEditado = correo;  // Establecer el correo que se está editando
  }

  actualizarCorreo() {
    if (this.correoAActualizar && this.correoEditado) {
      const url = `${this.apiUrl}/empleados/${this.empleado._id}/correos/${this.correoAActualizar}`;
      const body = { newCorreo: this.correoEditado }; // Enviar el nuevo correo en el cuerpo de la solicitud
      this.dataService.put(url, body).subscribe(
        (response: any) => { // Especificar que 'response' es de tipo 'any' (o el tipo adecuado)
          console.log('Correo actualizado:', response);
          // Actualizar el correo en la interfaz de usuario
          const index = this.empleado.correos.indexOf(this.correoAActualizar);
          if (index !== -1) {
            this.empleado.correos[index] = this.correoEditado;
          }
          this.correoAActualizar = null; // Deja de editar el correo
          this.correoEditado = ''; // Limpiar el valor editado
        },
        (error: any) => { // Especificar que 'error' es de tipo 'any' (o el tipo adecuado)
          console.error('Error al actualizar correo', error);
        }
      );
    }
  }

  eliminarTelefono(telefono: string) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este teléfono?');
    if (confirmacion) {
      this.dataService.eliminarTelefono(this.empleado._id, telefono).subscribe(
        (response) => {
          const index = this.empleado.telefonos.indexOf(telefono);
          if (index !== -1) {
            this.empleado.telefonos.splice(index, 1);
          }
        },
        (error) => {
          console.error('Error al eliminar teléfono', error);
        }
      );
    }
  }

  eliminarCorreo(correo: string) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este correo?');
    if (confirmacion) {
      this.dataService.eliminarCorreo(this.empleado._id, correo).subscribe(
        (response) => {
          const index = this.empleado.correos.indexOf(correo);
          if (index !== -1) {
            this.empleado.correos.splice(index, 1);
          }
        },
        (error) => {
          console.error('Error al eliminar correo', error);
        }
      );
    }
  }

  agregarTelefono() {
    if (this.nuevoTelefono) {
      this.dataService.agregarTelefono(this.empleado._id, this.nuevoTelefono).subscribe(
        (response) => {
          this.empleado.telefonos.push(this.nuevoTelefono);
          this.nuevoTelefono = '';
        },
        (error) => {
          console.error('Error al agregar teléfono', error);
        }
      );
    }
  }

  agregarCorreo() {
    if (this.nuevoCorreo) {
      this.dataService.agregarCorreo(this.empleado._id, this.nuevoCorreo).subscribe(
        (response) => {
          this.empleado.correos.push(this.nuevoCorreo);
          this.nuevoCorreo = '';
        },
        (error) => {
          console.error('Error al agregar correo', error);
        }
      );
    }
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.empleado.foto = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  actualizarFoto() {
    if (!this.empleado.foto) {
      alert('Por favor, ingrese un link de imagen válido.');
      return;
    }

    this.dataService.actualizarFoto(this.empleado._id, { foto: this.empleado.foto }).subscribe(
      (response) => {
        this.empleado.foto = response.empleado.foto;
        alert('Foto actualizada correctamente');
        this.editarFoto = false; // Cerrar el campo de texto después de actualizar la foto
      },
      (error) => {
        console.error('Error al actualizar foto', error);
      }
    );
  }
}
