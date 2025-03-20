import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../../services/curso.service';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParticipacionService } from '../../../services/participacion.service';

@Component({
  selector: 'app-registracp-page',
  templateUrl: './registracp-page.component.html',
  styleUrls: ['./registrarcp-page.component.css']
})
export class RegistracpPageComponent implements OnInit {
  form: FormGroup;
  formActividad: FormGroup;
  selectedOption: string = ''; 
  usersInCourse: string[] = []; 
  usersInActivity: string[] = []; 
  empleados: any[] = [];  // Lista de empleados
  empleadosSeleccionados: string[] = [];  // Claves de empleados seleccionados
  nombreCurso: string = '';
  fechaInicio: string = '';
  fechaTermino: string = '';
  documento: string = '';
  documentos: any[] = [];
  actividades: any[]=[];
  nombreActividad:string='';
  estatus:string='';
  // Function to toggle form based on the selected option
  selectOption(option: string) {
    this.selectedOption = option;
  }

  // Add user to the list for course or activity
  addUser(user: string) {
    if (this.selectedOption === 'course') {
      this.usersInCourse.push(user);
    } else if (this.selectedOption === 'activity') {
      this.usersInActivity.push(user);
    }
  }

  // Reset the form
  resetForm() {
    this.selectedOption = '';
    this.usersInCourse = [];
    this.usersInActivity = [];
  }

  constructor(private fb: FormBuilder,private cursoService: CursoService,private participacionService:ParticipacionService, private dataService: DataService, private http: HttpClient) {
     // Crear el formulario reactivo
     this.form = this.fb.group({
      nombreCurso: ['', Validators.required],  // Campo para el nombre del curso
      fechaInicio: ['', Validators.required],  // Campo para la fecha de inicio
      fechaTermino: ['', Validators.required],  // Campo para la fecha de término
      documentos: ['', Validators.required], // Campo para seleccionar el documento
    });

    this.formActividad= this.fb.group({
      nombreActividad:['',Validators.required],
      estatus:['',Validators.required]
    })
  }

  ngOnInit() {
    this.cargarEmpleados(); // Llamada a cargarEmpleados para cargar los empleados
    this.dataService.getDocumentos().subscribe(data => {
      console.log('Documentos recibidos:', data);
      this.documentos = data;
    });// Asumiendo que esta función obtiene los documentos
    this.dataService.getActividades().subscribe(data => {
      console.log('Actividades recibidos:', data);
      this.actividades = data;
    });
  }

  cargarEmpleados() {
    this.http.get('http://localhost:3000/api/nombre/empleados').subscribe((data: any) => {
      this.empleados = data;
    });
  }

  registrarCurso() {
    const datos = this.form.value;
    console.log("Enviando datos:", datos);
    if (this.empleadosSeleccionados.length === 0) {
      alert('Debes seleccionar al menos un empleado.');
      return;
    }

    const cursoData = {
      clave_empleado: [...this.empleadosSeleccionados],
      nombre_curso: datos.nombreCurso,
      fecha_inicio: datos.fechaInicio,
      fecha_termino: datos.fechaTermino,
      documento: datos.documento
    };

    this.cursoService.registrarCursos(cursoData).subscribe(response => {
      console.log('Respuesta del servidor:', response);
      alert('Cursos registrados exitosamente');
    }, error => {
      console.error('Error:', error);
      alert('Hubo un problema al registrar los cursos');
    });
    console.log('📌 Enviando datos:', cursoData);
  }

  toggleEmpleado(clave: string) {
    if (this.empleadosSeleccionados.includes(clave)) {
      this.empleadosSeleccionados = this.empleadosSeleccionados.filter(e => e !== clave);
    } else {
      this.empleadosSeleccionados.push(clave);
    }
    console.log('📌 Empleados seleccionados:', this.empleadosSeleccionados);
  }



  registrarParticipacion() {
    const datos = this.formActividad.value;
  console.log("Enviando datos:", datos);

    if (this.empleadosSeleccionados.length === 0) {
      alert('Debes seleccionar al menos un empleado.');
      return;
    }

    const actividadData = {
      clave_empleado: [...this.empleadosSeleccionados],
      nombre_actividad: datos.nombreActividad,
      estatus: datos.estatus,
    };

    this.participacionService.registrarParticipaciones(actividadData).subscribe(response => {
      console.log('Respuesta del servidor:', response);
      alert('Participaciones registradas exitosamente');
    }, error => {
      console.error('Error:', error);
      alert('Hubo un problema al registrar las Participaciones');
    });
    console.log('📌 Enviando datos:', actividadData);
  }

  
}

