import { NgModule } from '@angular/core';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { BajaPageComponent } from './pages/baja-page/baja-page.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    Error404PageComponent,
    BajaPageComponent
  ],
  exports: [
    Error404PageComponent,
    BajaPageComponent
  ],
  imports: [
    MaterialModule
  ]
})
export class SharedModule { }
