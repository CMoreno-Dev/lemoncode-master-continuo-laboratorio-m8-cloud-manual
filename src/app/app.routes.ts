import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { CrudComponent } from './pages/crud/crud.component';
import { ProfileComponent } from './pages/profile/profile.component';

// Configuración de rutas para las 7 páginas de la aplicación
export const rutas: Routes = [
  // Ruta por defecto redirige a /home
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // Rutas públicas (accesibles sin login)
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  // Rutas privadas (requieren autenticación)
  { path: 'dashboard', component: DashboardComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'crud', component: CrudComponent },
  { path: 'profile', component: ProfileComponent },
  // Ruta wildcard: cualquier ruta no encontrada redirige a /home
  { path: '**', redirectTo: '/home' },
];
