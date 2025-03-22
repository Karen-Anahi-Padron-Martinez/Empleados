import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CursoService } from '../../../services/curso.service';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent  implements OnInit {
  form: FormGroup;
  selectedOption: string = '';
  documentos: any[] = [];
  claveEmpleadoLogueado: string = '';  // Variable para almacenar la clave del empleado logueado

  constructor(
    private fb: FormBuilder,
    private cursoService: CursoService,
    private dataService: DataService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombreCurso: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaTermino: ['', Validators.required],
      documentos: ['', Validators.required],
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
  }

  registrarCurso() {
    const datos = this.form.value;
    console.log("Enviando datos:", datos);

    // Validamos si el formulario es inválido antes de proceder
    if (this.form.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

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
      this.resetForm();  // Llamamos a la función que reseteará el formulario
    }, error => {
      console.error('Error:', error);
      alert('Hubo un problema al registrar el curso');
    });

    console.log('📌 Enviando datos:', cursoData);
  }

  resetForm() {
    this.form.reset();  // Resetea el formulario de curso
    this.selectedOption = '';  // Resetea la opción seleccionada (si hay alguna)
  }
}
