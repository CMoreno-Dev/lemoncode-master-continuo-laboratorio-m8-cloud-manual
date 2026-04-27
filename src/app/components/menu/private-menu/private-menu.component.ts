import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-private-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './private-menu.component.html',
  styleUrl: './private-menu.component.scss',
})
// Menú mostrado cuando el usuario SÍ está autenticado
// Contiene enlaces a: Dashboard, Galería, CRUD y Perfil
export class PrivateMenuComponent {}
