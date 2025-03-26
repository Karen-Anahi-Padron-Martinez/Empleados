import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { EmpleadoService } from '../../../services/empleado.service';
import { Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { ConsecutivoService } from '../../../services/consecutivo.service';

@Component({
  selector: 'app-empleado-register',
  templateUrl: './registro-empleado.component.html',
  styleUrls: ['./registro-empleado.component.css']
})
export class RegistroEmpleadoComponent implements OnInit {
  empleadoForm: FormGroup;
  consecutivo: number = 1;

  departamentos: any[] = [];
  puestos: any[] = [];
  ciudades: any[] = [];
  parentescos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private dataService: DataService,
    private consecutivoService: ConsecutivoService,
    private router: Router
  ) {
    this.empleadoForm = this.fb.group({
      clave_empleado: [''],
      nombre: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
      fecha_alta: [new Date()],
      rfc: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      sexo: ['', Validators.required],
      foto: [''],
      contrasenia: ['', Validators.required],
      rol: [2, Validators.required],
      domicilio: this.fb.group({
        calle: [''],
        numero_interior: [''],
        numero_exterior: [''],
        colonia: [''],
        codigo_postal: [''],
        ciudad: ['']
      }),
      departamento: [''],
      puesto: [''],
      telefonos: this.fb.array([this.fb.control('', Validators.required)]),
      correos: this.fb.array([this.fb.control('', [Validators.required, Validators.email])]),
      referencias_familiares: this.fb.array([
        this.fb.group({
          nombre: ['', Validators.required],
          parentesco: ['', Validators.required],
          telefonos: ['', Validators.required],
          correo: ['', [Validators.required, Validators.email]]
        })
      ])
    });
  }

  ngOnInit() {
    this.dataService.getDepartamentos().subscribe(data => this.departamentos = data);
    this.dataService.getPuestos().subscribe(data => this.puestos = data);
    this.dataService.getCiudades().subscribe(data => this.ciudades = data);
    this.dataService.getParentescos().subscribe(data => this.parentescos = data);
    this.obtenerConsecutivo();
  }

  obtenerConsecutivo() {
    this.consecutivoService.obtenerUltimoConsecutivo().subscribe(
      (data) => {
        this.consecutivo = data.consecutivo;
        this.generarClaveEmpleado();
      },
      (error) => {
        console.error('Error al obtener el consecutivo:', error);
      }
    );
  }

  /** Getters para formularios dinámicos */
  get telefonos(): FormArray {
    return this.empleadoForm.get('telefonos') as FormArray;
  }

  get correos(): FormArray {
    return this.empleadoForm.get('correos') as FormArray;
  }

  get referenciasFamiliares(): FormArray {
    return this.empleadoForm.get('referencias_familiares') as FormArray;
  }

  /** Métodos para correos */
  agregarCorreo() {
    this.correos.push(this.fb.control('', [Validators.required, Validators.email]));
  }

  eliminarCorreo(index: number) {
    if (this.correos.length > 1) {
      this.correos.removeAt(index);
    }
  }

  /** Métodos para teléfonos */
  agregarTelefono() {
    this.telefonos.push(this.fb.control('', Validators.required));
  }

  eliminarTelefono(index: number) {
    if (this.telefonos.length > 1) {
      this.telefonos.removeAt(index);
    }
  }

  /** Métodos para referencias familiares */
  agregarReferenciaFamiliar() {
    this.referenciasFamiliares.push(this.fb.group({
      nombre: ['', Validators.required],
      parentesco: ['', Validators.required],
      telefonos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    }));
  }

  eliminarReferenciaFamiliar(index: number) {
    if (this.referenciasFamiliares.length > 1) {
      this.referenciasFamiliares.removeAt(index);
    }
  }

  /** Clave de empleado */
  generarClaveEmpleado(): void {
    const nombre = this.empleadoForm.get('nombre')?.value;
    const apellidoPaterno = this.empleadoForm.get('apellido_paterno')?.value;
    const apellidoMaterno = this.empleadoForm.get('apellido_materno')?.value;

    if (nombre && apellidoPaterno && apellidoMaterno) {
      const nombres = nombre.split(' ');
      const inicialesNombres = nombres.map((n: string) => n.charAt(0)).join('').toUpperCase();
      const inicialPaterno = apellidoPaterno.charAt(0).toUpperCase();
      const inicialMaterno = apellidoMaterno.charAt(0).toUpperCase();

      this.empleadoForm.patchValue({
        clave_empleado: `${inicialesNombres}${inicialPaterno}${inicialMaterno}-${this.consecutivo.toString().padStart(3, '0')}`
      });
    } else {
      this.empleadoForm.patchValue({ clave_empleado: '' });
    }
  }

  /** Registrar empleado con validación y limpieza de correos */
  registrarEmpleado() {
    this.generarClaveEmpleado();

    // Filtrar correos válidos y no vacíos
    const correosValidos = this.correos.value.filter((c: string) => c && c.trim() !== '');

    // Actualizar el campo correos en el FormGroup
    this.empleadoForm.patchValue({ correos: correosValidos });

    console.log(' Correos a guardar:', this.empleadoForm.value.correos);
    console.log(' Datos a enviar:', this.empleadoForm.value);

    if (this.empleadoForm.valid && correosValidos.length > 0) {
      this.empleadoService.registrarEmpleado(this.empleadoForm.value).subscribe(
        response => {
          console.log(' Empleado registrado:', response);
          alert("Empleado registrado con éxito");
          this.router.navigate(['/auth/ver-empleado']); // o ajusta la ruta si es diferente
        },
        error => {
          console.error(' Error al registrar empleado:', error);
          alert("Error al registrar el empleado");
        }
      );
    } else {
      alert('Por favor, ingresa al menos un correo válido.');
    }
  }
}
