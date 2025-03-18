import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from '../../../services/curso.service';
import { DataService } from '../../../services/data.service';
import { HttpClient } from '@angular/common/http';
import { ParticipacionService } from '../../../services/participacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registracp',
  templateUrl: './registracp.component.html',
  styleUrls: ['./registracp.component.css']
})
export class RegistracpComponent implements OnInit {
  form: FormGroup;
  formActividad: FormGroup;
  selectedOption: string = '';
  documento: string = '';
  documentos: any[] = [];
  actividades: any[] = [];
  nombreActividad: string = '';
  estatus: string = '';
  claveEmpleadoLogueado: string = '';  // Variable para almacenar la clave del empleado logueado

  constructor(
    private fb: FormBuilder,
    private cursoService: CursoService,
    private participacionService: ParticipacionService,
    private dataService: DataService,
    private http: HttpClient,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombreCurso: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaTermino: ['', Validators.required],
      documentos: ['', Validators.required],
    });

    this.formActividad = this.fb.group({
      nombreActividad: ['', Validators.required],
      estatus: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Obtener la clave del empleado logueado desde el localStorage
    const storedClaveEmpleado = localStorage.getItem('clave_empleado');
    if (storedClaveEmpleado) {
      this.claveEmpleadoLogueado = storedClaveEmpleado;
    } else {
      console.error('Empleado no encontrado en localStorage');
      this.router.navigate(['/login']); // Redirigir al login si no se encuentra el empleado
    }

    this.dataService.getDocumentos().subscribe(data => {
      console.log('Documentos recibidos:', data);
      this.documentos = data;
    });

    this.dataService.getActividades().subscribe(data => {
      console.log('Actividades recibidas:', data);
      this.actividades = data;
    });
  }

  selectOption(option: string) {
    this.selectedOption = option;
  }

  registrarCurso() {
    const datos = this.form.value;
    console.log("Enviando datos:", datos);

    if (!this.claveEmpleadoLogueado) {
      alert('Empleado no logueado.');
      return;
    }

    // Crear el objeto del curso y asignar el empleado logueado
    const cursoData = {
      clave_empleado: [this.claveEmpleadoLogueado], // Usamos la clave del empleado logueado
      nombre_curso: datos.nombreCurso,
      fecha_inicio: datos.fechaInicio,
      fecha_termino: datos.fechaTermino,
      documento: datos.documentos
    };

    this.cursoService.registrarCursos(cursoData).subscribe(response => {
      console.log('Respuesta del servidor:', response);
      alert('Curso registrado exitosamente');
    }, error => {
      console.error('Error:', error);
      alert('Hubo un problema al registrar el curso');
    });

    console.log('📌 Enviando datos:', cursoData);
  }

  registrarParticipacion() {
    const datos = this.formActividad.value;
    console.log("Enviando datos:", datos);

    if (!this.claveEmpleadoLogueado) {
      alert('Empleado no logueado.');
      return;
    }

    const actividadData = {
      clave_empleado: [this.claveEmpleadoLogueado], // Usamos la clave del empleado logueado
      nombre_actividad: datos.nombreActividad,
      estatus: datos.estatus,
    };

    this.participacionService.registrarParticipaciones(actividadData).subscribe(response => {
      console.log('Respuesta del servidor:', response);
      alert('Participación registrada exitosamente');
    }, error => {
      console.error('Error:', error);
      alert('Hubo un problema al registrar la participación');
    });

    console.log('📌 Enviando datos:', actividadData);
  }

  resetForm() {
    this.form.reset();
    this.formActividad.reset();
    this.selectedOption = '';
  }
}
