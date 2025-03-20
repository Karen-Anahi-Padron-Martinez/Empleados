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
  empleadoForm: FormGroup; // Cambio para usar FormGroup y FormArray
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
    this.obtenerConsecutivo(); // Llama al servicio al cargar el formulario
    
  
    /** 🔹 Obtener el consecutivo desde la base de datos */
   
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

  /** Obtener los FormArray */
  get telefonos(): FormArray {
    return this.empleadoForm.get('telefonos') as FormArray;
  }

  get correos(): FormArray {
    return this.empleadoForm.get('correos') as FormArray;
  }

  /** Agregar y eliminar campos dinámicamente */
  agregarTelefono() {
    this.telefonos.push(this.fb.control('', Validators.required));
  }

  eliminarTelefono(index: number) {
    if (this.telefonos.length > 1) {
      this.telefonos.removeAt(index);
    }
  }

  agregarCorreo() {
    this.correos.push(this.fb.control('', [Validators.required, Validators.email]));
  }

  eliminarCorreo(index: number) {
    if (this.correos.length > 1) {
      this.correos.removeAt(index);
    }
  }

  /** Obtener los FormArray */
  get referenciasFamiliares(): FormArray {
    return this.empleadoForm.get('referencias_familiares') as FormArray;
  }

  /** Agregar una nueva referencia familiar */
  agregarReferenciaFamiliar() {
    this.referenciasFamiliares.push(this.fb.group({
      nombre: ['', Validators.required],
      parentesco: ['', Validators.required],
      telefonos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    }));
  }

  /** Eliminar una referencia familiar */
  eliminarReferenciaFamiliar(index: number) {
    if (this.referenciasFamiliares.length > 1) {
      this.referenciasFamiliares.removeAt(index);
    }
  }

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

  registrarEmpleado() {
    this.generarClaveEmpleado();
    
    if (this.empleadoForm.valid) {
      this.empleadoService.registrarEmpleado(this.empleadoForm.value).subscribe(
        response => {
          console.log('Empleado registrado:', response);
          alert("Usuario Registrado con Exito!!!")
        },
        error => {
          console.error('Error al registrar empleado:', error);
        }
      );
    }
  }
}
