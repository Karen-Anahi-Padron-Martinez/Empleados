import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error404-page',
  templateUrl: './error404-page.component.html',
  styleUrls: ['./error404-page.component.css']
})
export class Error404PageComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']);  // Cambia '/' a la ruta a la que desees redirigir
  }

}
