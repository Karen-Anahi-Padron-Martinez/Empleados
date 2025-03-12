import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { LoginPageComponent } from './auth/pages/login-page/login-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent },
  {path:'auth',loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule),},
  {path:'empleados',loadChildren:() => import('./empleados/empleados.module').then(m=> m.EmpleadosModule),},
  {path:'404',component:Error404PageComponent,},
  {path:'',redirectTo:'empleados',pathMatch:'full'},
  {path:'**',redirectTo:'404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
