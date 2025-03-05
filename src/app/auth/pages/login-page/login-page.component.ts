import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  loginForm: FormGroup;
  hide = true; // Para ocultar/mostrar contraseña

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      clave: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { clave, password } = this.loginForm.value;
      
      // Simulación de autenticación (reemplazar con servicio real)
      if (clave === '12345' && password === 'admin123') {
        console.log('✅ Login exitoso');
        this.router.navigate(['/dashboard']); // Redirige a otra vista
      } else {
        alert('❌ Clave de trabajador o contraseña incorrecta');
      }
    }
  }
}
