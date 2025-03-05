import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-empleado',
  templateUrl: './registro-empleado.component.html',
  styleUrls: ['./registro-empleado.component.css']
})
export class RegistroEmpleadoComponent {
  empleadoForm: FormGroup;
  ciudades = ['Ciudad de México', 'Guadalajara', 'Monterrey', 'Puebla', 'Querétaro'];
  departamentos = ['Ventas', 'TI', 'Recursos Humanos', 'Administración'];
  puestos = ['Gerente', 'Desarrollador', 'Analista', 'Soporte Técnico'];
  parentescos = ['Padre', 'Madre', 'Hermano/a', 'Esposo/a', 'Hijo/a'];

  constructor(private fb: FormBuilder) {
    this.empleadoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      rfc: ['', [Validators.required, Validators.pattern('^[A-Z]{4}-[0-9]{6}$')]],
      domicilio: this.fb.group({
        calle: ['', Validators.required],
        numeroInterior: [''],
        numeroExterior: ['', Validators.required],
        colonia: ['', Validators.required],
        codigoPostal: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
        ciudad: ['', Validators.required]
      }),
      departamento: ['', Validators.required],
      puesto: ['', Validators.required],
      telefonos: this.fb.array([''], Validators.required),
      correos: this.fb.array(['', Validators.email]),
      referencias: this.fb.array([]),
      foto: [''],
      claveEmpleado: [''],
      fechaAlta: [new Date().toISOString().slice(0, 10)],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', Validators.required]
    }, { validator: this.validarPassword });
  }

  generarClaveEmpleado() {
    const nombre = this.empleadoForm.get('nombre')?.value || '';
    const apPaterno = this.empleadoForm.get('apellidoPaterno')?.value || '';
    const apMaterno = this.empleadoForm.get('apellidoMaterno')?.value || '';
    const clave = `${nombre.charAt(0)}${apPaterno.charAt(0)}${apMaterno.charAt(0)}-001`.toUpperCase();
    this.empleadoForm.get('claveEmpleado')?.setValue(clave);
  }

  validarPassword(group: FormGroup) {
    const password = group.get('contrasena')?.value;
    const confirmPassword = group.get('confirmarContrasena')?.value;
    return password === confirmPassword ? null : { notMatching: true };
  }

  guardarEmpleado() {
    if (this.empleadoForm.valid) {
      console.log('Datos del empleado:', this.empleadoForm.value);
      alert('Empleado registrado con éxito');
    } else {
      alert('Por favor complete todos los campos requeridos correctamente.');
    }
  }
}

