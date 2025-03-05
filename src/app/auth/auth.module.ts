import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';

import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { LayoutPageComponent } from './pages/layoutPage/layoutPage.component';

import { ConsultacpPageComponent } from './pages/consulta-cppage/consultacp-page.component';
import { BajaempleadosPageComponent } from './pages/bajaempleados-page/bajaempleados-page.component';
import { RegistracpPageComponent } from './pages/registracp-page/registracp-page.component';
import { VerempleadosPageComponent } from './pages/verempleados-page/verempleados-page.component';
import { RegistroEmpleadoComponent } from './pages/registro-empleados/registro-empleados.component';




@NgModule({
  declarations: [
    LoginPageComponent,
    LayoutPageComponent,
    ConsultacpPageComponent,
    BajaempleadosPageComponent,
    RegistracpPageComponent,
    VerempleadosPageComponent,
    RegistroEmpleadoComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    RouterModule 

  ]
})
export class AuthModule { }
