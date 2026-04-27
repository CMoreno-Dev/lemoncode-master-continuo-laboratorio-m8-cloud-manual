import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { PublicHeaderComponent } from './components/header/public-header/public-header.component';
import { PrivateHeaderComponent } from './components/header/private-header/private-header.component';
import { PublicMenuComponent } from './components/menu/public-menu/public-menu.component';
import { PrivateMenuComponent } from './components/menu/private-menu/private-menu.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PublicHeaderComponent,
    PrivateHeaderComponent,
    PublicMenuComponent,
    PrivateMenuComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  titulo = 'mini-app';
  // Inyectar el servicio de autenticación
  servicioAuth = inject(AuthService);

  // Propiedad getter que verifica si el usuario está autenticado
  // Se usa en el template para mostrar/ocultar componentes condicionalmente
  get usuarioIniciado(): boolean {
    return this.servicioAuth.estaIniciado();
  }
}
