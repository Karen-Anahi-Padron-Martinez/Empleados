import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { EmpleadoPageComponent } from './pages/empleado-page/empleado-page.component';
import { RegistrarCAComponent } from './pages/registrar-ca/registrar-ca.component';

const routes: Routes = [
  {
    path: '', component: LayoutPageComponent,
    children: [
      { path: 'new-empleado', component: NewPageComponent },
      { path: 'list', component: ListPageComponent },
      { path: 'edit', component: NewPageComponent },
      { path: ':id', component: EmpleadoPageComponent },
      { path: 'registrarNew', component: RegistrarCAComponent }, // Asegúrate de que esta ruta sea correcta
      { path: '**', redirectTo: 'list' }  // Asegúrate de tener un redireccionamiento en caso de ruta no encontrada
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
