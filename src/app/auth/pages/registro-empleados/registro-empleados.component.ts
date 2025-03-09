import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { EmpleadoService } from '../../../services/empleado.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-empleado',
  templateUrl: './registro-empleado.component.html',
  styleUrls: ['./registro-empleado.component.css']
})
export class RegistroEmpleadoComponent {
  empleado = {
    clave_empleado: '',
    nombre: '',
    apellido_paterno: '',
    apellido_materno: '',
    fecha_alta: new Date(),
    rfc: '',
    fecha_nacimiento: new Date(),
    sexo: '',
    foto: '',
    contrasenia: '',
    rol: 2,  // Por defecto, un empleado
    domicilio: {
      calle: '',
      numero_interior: '',
      numero_exterior: '',
      colonia: '',
      codigo_postal: '',
      ciudad: ''
    },
    departamento: '',
    puesto: '',
    telefonos: [''],
    correos: [''],
    referencias_familiares: [{
      nombre: '',
      parentesco: '',
      telefonos: [''],
      correo: ''
    }]
  };

  constructor(private empleadoService: EmpleadoService, private router: Router) {}

  registrarEmpleado() {
    this.empleadoService.registrarEmpleado(this.empleado).subscribe(
      (response) => {
        console.log('Empleado registrado:', response);
        this.router.navigate(['/empleados']); // Redirigir a la lista de empleados o página principal
      },
      (error) => {
        console.error('Error al registrar empleado:', error);
      }
    );
  }
}