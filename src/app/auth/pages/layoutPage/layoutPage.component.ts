import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {

  public sidebarItems = [
    //{label:'Login',icon:'label',url:'./login'},
    {label:'Registro',icon:'add',url:'./new-account'},
    
  ]
}
