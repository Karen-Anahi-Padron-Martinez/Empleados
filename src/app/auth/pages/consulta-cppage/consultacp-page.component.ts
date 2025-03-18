import { Component, OnInit } from '@angular/core';
import { ParticipacionesService } from '../../../services/participaciones.service';
import { CursosService } from '../../../services/cursos.service';

@Component({
  selector: 'app-consultacp-page',
  templateUrl: './consultacp-page.component.html',
  styleUrls: ['./consulta-page.component.css']
})
export class ConsultacpPageComponent implements OnInit{
  empleadosConCursos: any[] = []; // Lista de empleados con sus cursos
  empleadosConParticipaciones: any[] = []; // Lista de empleados con sus participaciones
  selectedOption: string = 'curso'; // Opción por defecto: 'curso'
  
  constructor(private cursosService: CursosService, private participacionesService: ParticipacionesService) { }

  ngOnInit() {
    this.cargarCursosDeEmpleados();
    this.cargarParticipacionesDeEmpleados();
  }

  // Método para cargar los cursos de los empleados
  cargarCursosDeEmpleados() {
    this.cursosService.obtenerCursosDeEmpleados().subscribe(data => {
      this.empleadosConCursos = data;
    });
  }

  // Método para cargar las participaciones de los empleados
  cargarParticipacionesDeEmpleados() {
    this.participacionesService. obtenerEmpleadosConCursos().subscribe(data => {
      this.empleadosConParticipaciones = data;
    });
  }

  // Método para cambiar la opción seleccionada (curso o participación)
  seleccionarOpcion(opcion: string) {
    this.selectedOption = opcion;
  }

}