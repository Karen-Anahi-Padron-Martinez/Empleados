import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  loginForm: FormGroup;
  hide = true;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Inicializar el formulario
    this.loginForm = this.fb.group({
      clave: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { clave, password } = this.loginForm.value;

    this.authService.login(clave, password).subscribe({
      next: (response) => {
        // Si el login es exitoso, guarda el token
        this.authService.saveToken(response.token);

        // Guardar la información del usuario en localStorage
        localStorage.setItem('empleado_id', response.usuario.id);
        localStorage.setItem('usuario_nombre', response.usuario.nombre);


        // Verificar el rol del usuario y redirigir a la ruta correspondiente
        switch (response.usuario.rol) {
          case 1:
            // Rol 1 (Admin): redirigir al panel de administración
            this.router.navigate(['/auth/list']);  // Ruta para Admin
            break;
          case 2:
            // Rol 2 (Empleado): redirigir al panel de empleados
            this.router.navigate(['/empleados/list']);  // Ruta para Empleado
            break;
          case 3:
            // Rol 3 (Otro rol): redirigir a una ruta específica
            this.router.navigate(['/404']);  // Ruta para otro rol
            break;
          default:
            // Si el rol no es reconocido, redirige a la página principal o muestra un mensaje de error
            this.router.navigate(['/404']);
            break;
        }
      },
      error: (err) => {
        // Manejo de errores
        this.errorMessage = 'Clave o contraseña incorrectos.';
      }
    });
  }
}
