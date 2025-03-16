import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../../services/curso.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registracp-page',
  templateUrl: './registracp-page.component.html',
  styleUrls: ['./registrarcp-page.component.css']
})
export class RegistracpPageComponent implements OnInit {
  selectedOption: string = ''; // 'course' or 'activity'
  usersInCourse: string[] = []; // List of users for the course
  usersInActivity: string[] = []; // List of users for the activity
  empleados: any[] = [];  // Lista de empleados
  empleadosSeleccionados: string[] = [];  // Claves de empleados seleccionados
  nombreCurso: string = '';
  fechaInicio: string = '';
  fechaTermino: string = '';
  documento: string = '';
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

  constructor(private cursoService: CursoService, private http: HttpClient) {}

  ngOnInit() {
    this.cargarEmpleados();
  }
  cargarEmpleados() {
    this.http.get('http://localhost:3000/api/nombre/empleados').subscribe((data: any) => {
      this.empleados = data;
    });
  }

  registrarCurso() {
    if (this.empleadosSeleccionados.length === 0) {
      alert('Debes seleccionar al menos un empleado.');
      return;
    }

    const cursoData = {
      clave_empleado:[...this.empleadosSeleccionados],
      nombre_curso: this.nombreCurso,
      fecha_inicio: this.fechaInicio,
      fecha_termino: this.fechaTermino,
      documento: this.documento
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

}