import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  // Formulario reactivo para el login
  formularioLogin!: FormGroup;
  // Mensaje de error cuando las credenciales son inválidas
  errorLogin: string = '';
  // Indicador de carga - true mientras espera respuesta del login
  loading: boolean = false;
  // Inyectar servicios
  servicioAuth = inject(AuthService);
  router = inject(Router);
  fb = inject(FormBuilder);

  ngOnInit(): void {
    // Crear el formulario reactivo con validaciones
    this.formularioLogin = this.fb.group({
      // Campo username: requerido, mínimo 3 caracteres, debe ser email válido
      username: [
        '',
        [Validators.required, Validators.minLength(3), Validators.email],
      ],
      // Campo password: requerido, mínimo 8 caracteres
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // Método llamado al hacer submit del formulario
  // Se suscribe al observable del servicio para manejar la respuesta asíncrona
  iniciarSesion(): void {
    if (this.formularioLogin.valid) {
      // Activa el indicador de carga y limpia errores previos
      this.loading = true;
      this.errorLogin = '';
      // Suscripción al observable que retorna el servicio
      this.servicioAuth.iniciarSesion(this.formularioLogin.value).subscribe({
        // Callback cuando el observable emite un valor
        next: (result: boolean) => {
          // Desactiva el indicador de carga
          this.loading = false;
          // Si el login es exitoso, redirigir al dashboard
          if (result) {
            this.router.navigate(['/dashboard']);
          } else {
            // Si el login falla, mostrar mensaje de error
            this.errorLogin = 'Credenciales inválidas';
          }
        },
        // Callback si hay error en el observable
        error: () => {
          this.loading = false;
          this.errorLogin = 'Error en el servidor';
        }
      });
    }
  }
}
