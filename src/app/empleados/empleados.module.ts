import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { EmpleadoPageComponent } from './pages/empleado-page/empleado-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { RegistracpComponent } from './pages/registracp/registracp.component';
import { RegistrarCAComponent } from './pages/registrar-ca/registrar-ca.component';


@NgModule({
  declarations: [
    EmpleadoPageComponent,
    ListPageComponent,
    LayoutPageComponent,
    NewPageComponent,
    RegistracpComponent,
    RegistrarCAComponent
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    MaterialModule,
    RouterModule
  ]
})
export class EmpleadosModule { }
