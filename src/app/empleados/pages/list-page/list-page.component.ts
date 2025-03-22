import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent   implements OnInit {
  searchText: string = '';
  cursos: any[] = []; // Array para cursos
  participaciones: any[] = []; // Array para participaciones
  empleadoId: string = '';
  startDate: string = '';  // Fecha de inicio para filtro de periodo
  endDate: string = '';    // Fecha de fin para filtro de periodo

  constructor(private dataService: DataService, private cdRef: ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    const storedClaveEmpleado = localStorage.getItem('clave_empleado');
    if (storedClaveEmpleado) {
      this.empleadoId = storedClaveEmpleado;
      this.cargarCursos();
      this.cargarParticipaciones();
    } else {
      console.error('Empleado no encontrado en localStorage');
      this.router.navigate(['/login']);
    }
  }

  cargarCursos() {
    this.dataService.getCursosPorEmpleado(this.empleadoId).subscribe(
      (data) => {
        console.log('Cursos obtenidos:', data);
        this.cursos = data.length ? data[0].cursos : [];
      },
      (error) => {
        console.error('Error al obtener cursos:', error);
        alert(error.error.mensaje || 'Hubo un problema al obtener los cursos');
      }
    );
  }

  cargarParticipaciones() {
    this.dataService.getParticipacionesPorEmpleado(this.empleadoId).subscribe(
      (data) => {
        console.log('Participaciones obtenidas:', data);
        console.log('Actividades:', data.actividades);  // Verificar la estructura de las actividades
        this.participaciones = data.actividades || [];
      },
      (error) => {
        console.error('Error al obtener participaciones:', error);
        alert(error.error.mensaje || 'No existe ningun registro de Participación');
      }
    );
  }

  // Filtrar cursos por nombre y fecha
  get filteredCursos() {
    return this.cursos.filter(course =>
      course.nombre_curso.toLowerCase().includes(this.searchText.toLowerCase()) &&
      this.isInDateRange(course.fecha_inicio, course.fecha_termino)
    );
  }

  // Filtrar participaciones por nombre
  get filteredParticipaciones() {
    return this.participaciones.filter(participacion =>
      participacion.nombre_actividad.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // Función que verifica si una fecha está dentro del rango de fechas proporcionado
  isInDateRange(startDate: string, endDate: string): boolean {
    if (!this.startDate && !this.endDate) {
      return true;  // Si no se seleccionan fechas, no filtra
    }

    const courseStartDate = new Date(startDate);
    const courseEndDate = new Date(endDate);

    if (this.startDate && this.endDate) {
      // Filtra si las fechas de inicio y fin del curso están dentro del rango de fechas
      return courseStartDate >= new Date(this.startDate) && courseEndDate <= new Date(this.endDate);
    } else if (this.startDate) {
      // Filtra si la fecha de inicio del curso es después de la fecha de inicio seleccionada
      return courseStartDate >= new Date(this.startDate);
    } else if (this.endDate) {
      // Filtra si la fecha de fin del curso es antes de la fecha de fin seleccionada
      return courseEndDate <= new Date(this.endDate);
    }

    return true;
  }

  // Método que se llama cuando las fechas cambian
  filterCursos() {
    this.cursos = this.cursos; // Llama a la función que filtra los cursos al cambiar la fecha
  }
}
