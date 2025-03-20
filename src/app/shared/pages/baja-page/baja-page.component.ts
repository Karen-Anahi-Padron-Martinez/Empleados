import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-baja-page',
  templateUrl: './baja-page.component.html',
  styleUrls: ['./baja-page.component.css']
})
export class BajaPageComponent {

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']);  // Cambia '/home' a la ruta que desees
  }
}
