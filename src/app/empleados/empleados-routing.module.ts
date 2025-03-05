import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { EmpleadoPageComponent } from './pages/empleado-page/empleado-page.component';

const routes: Routes = [
  {
    path:'',component: LayoutPageComponent,
    children:[
      { path: 'new-empleado', component: NewPageComponent},
      //{ path: 'search', component: SearchPageComponent},
      { path: 'list', component: ListPageComponent},
      { path: 'edit/:id', component: NewPageComponent},
      { path: ':id', component: EmpleadoPageComponent},
      { path: '**', redirectTo: 'list'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
