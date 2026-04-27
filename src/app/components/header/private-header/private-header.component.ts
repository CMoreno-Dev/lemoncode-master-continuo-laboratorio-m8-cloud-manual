import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './private-header.component.html',
  styleUrl: './private-header.component.scss',
})
export class PrivateHeaderComponent {
  // Inyectar servicios de autenticación y navegación
  servicioAuth = inject(AuthService);
  router = inject(Router);

  // Método llamado cuando el usuario hace clic en el botón Logout
  cerrarSesion(): void {
    // Limpiar el estado de autenticación
    this.servicioAuth.cerrarSesion();
    // Redirigir al usuario a la página de login
    this.router.navigate(['/login']);
  }
}
