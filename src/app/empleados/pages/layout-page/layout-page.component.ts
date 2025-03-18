import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {
  isMenuOpen = false;

  sidebarItems = [
    { label: 'Empleados', url: '/empleados', icon: 'group' },
  ];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  
}
