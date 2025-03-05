import { NgModule} from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { LayoutPageComponent } from './pages/layoutPage/layoutPage.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistroEmpleadoComponent } from './pages/registro-empleados/registro-empleados.component';
import { VerempleadosPageComponent } from './pages/verempleados-page/verempleados-page.component';
import { RegistracpPageComponent } from './pages/registracp-page/registracp-page.component';
import { ConsultacpPageComponent } from './pages/consulta-cppage/consultacp-page.component';
import { BajaempleadosPageComponent } from './pages/bajaempleados-page/bajaempleados-page.component';


const routes: Routes=[
    {
        path:'',component:LayoutPageComponent,
        children:[
            //{ path: 'login',component:LoginPageComponent},
            { path:'new-account',component:RegistroEmpleadoComponent},
            { path: 'ver-empleado', component:VerempleadosPageComponent},
            {path: 'registrarcp', component:RegistracpPageComponent},
            { path: 'consultar',component:ConsultacpPageComponent},
            { path: 'baja', component:BajaempleadosPageComponent},
            { path: '**', redirectTo:'ver-empleado'},
        ]
    }
];

@NgModule({
    imports: [  RouterModule.forChild(routes)],
    exports:[RouterModule],
})

export class AuthRoutingModule{}