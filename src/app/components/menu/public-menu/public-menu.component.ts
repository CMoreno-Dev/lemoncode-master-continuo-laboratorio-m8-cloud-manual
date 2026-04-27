import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-public-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './public-menu.component.html',
  styleUrl: './public-menu.component.scss',
})
// Menú mostrado cuando el usuario NO está autenticado
// Contiene enlaces a: Home, Login y Acerca de
export class PublicMenuComponent {}
