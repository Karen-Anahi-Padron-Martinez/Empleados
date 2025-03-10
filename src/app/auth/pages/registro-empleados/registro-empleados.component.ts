import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../../services/empleado.service';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-registro-empleado',
  templateUrl: './registro-empleado.component.html',
  styleUrls: ['./registro-empleado.component.css']
})
export class RegistroEmpleadoComponent implements OnInit {
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

  // Arrays para almacenar los datos del servicio
  departamentos: any[] = [];
  puestos: any[] = [];
  ciudades: any[] = [];
  parentescos: any[] = [];
  
  consecutivo = 1; // Esto debe venir de la base de datos en un caso real

  constructor(
    private empleadoService: EmpleadoService, 
    private dataService: DataService, 
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener datos desde el servicio
    this.dataService.getDepartamentos().subscribe(data => this.departamentos = data);
    this.dataService.getPuestos().subscribe(data => this.puestos = data);
    this.dataService.getCiudades().subscribe(data => this.ciudades = data);
    this.dataService.getParentescos().subscribe(data => this.parentescos = data);
  }

  /**
   * Genera automáticamente la clave de empleado en base a:
   * - Primeras letras de los nombres
   * - Primera letra del apellido paterno
   * - Primera letra del apellido materno
   * - Un consecutivo (ejemplo: 001, 002, ...)
   */
  generarClaveEmpleado(): void {
    if (this.empleado.nombre && this.empleado.apellido_paterno && this.empleado.apellido_materno) {
      const nombres = this.empleado.nombre.split(' '); 
      const inicialesNombres = nombres.map(n => n.charAt(0)).join('').toUpperCase(); 
      const inicialPaterno = this.empleado.apellido_paterno.charAt(0).toUpperCase(); 
      const inicialMaterno = this.empleado.apellido_materno.charAt(0).toUpperCase();

      // Formato: InicialesNombre + InicialPaterno + InicialMaterno + "-Consecutivo"
      this.empleado.clave_empleado = `${inicialesNombres}${inicialPaterno}${inicialMaterno}-${this.consecutivo.toString().padStart(3, '0')}`;
    } else {
      this.empleado.clave_empleado = '';
    }
  }

  /**
   * Registra el empleado en la base de datos
   */
  registrarEmpleado() {
    this.generarClaveEmpleado(); // Asegurar que la clave se genere antes del registro

    this.empleadoService.registrarEmpleado(this.empleado).subscribe(
      (response) => {
        console.log('Empleado registrado:', response);
        this.router.navigate(['/empleados']); 
      },
      (error) => {
        console.error('Error al registrar empleado:', error);
      }
    );
  }
}
