import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // BehaviorSubject para gestionar el estado de login del usuario
  private sujetoIniciadoSesion = new BehaviorSubject<boolean>(false);
  public iniciadoSesion$ = this.sujetoIniciadoSesion.asObservable();

  // BehaviorSubject para almacenar el nombre de usuario actual
  private sujetoUsuarioActual = new BehaviorSubject<string | null>(null);
  public usuarioActual$ = this.sujetoUsuarioActual.asObservable();

  constructor() {
    // Cargar el estado de autenticación desde localStorage al iniciar el servicio
    this.cargarEstadoSesion();
  }

  // Recupera el estado de login del localStorage (persistencia)
  private cargarEstadoSesion(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.sujetoIniciadoSesion.next(true);
      this.sujetoUsuarioActual.next(storedUser);
    }
  }

  // Valida las credenciales y actualiza el estado de autenticación
  // Retorna un Observable<boolean> con un delay de 2 segundos para simular llamada asíncrona
  iniciarSesion(credentials: { username: string; password: string }): Observable<boolean> {
    // Credenciales válidas: master@lemoncode.net / 12345678
    if (
      credentials.username === 'master@lemoncode.net' &&
      credentials.password === '12345678'
    ) {
      // Actualizar estado de login y guardar en localStorage
      this.sujetoIniciadoSesion.next(true);
      this.sujetoUsuarioActual.next(credentials.username);
      localStorage.setItem('currentUser', credentials.username);
      return of(true).pipe(delay(2000));
    }
    return of(false).pipe(delay(2000));
  }

  // Limpia el estado de autenticación y elimina datos del localStorage
  cerrarSesion(): void {
    this.sujetoIniciadoSesion.next(false);
    this.sujetoUsuarioActual.next(null);
    localStorage.removeItem('currentUser');
  }

  // Retorna true si el usuario está autenticado
  estaIniciado(): boolean {
    return this.sujetoIniciadoSesion.value;
  }

  // Retorna el nombre de usuario actual
  obtenerNombreUsuario(): string | null {
    return this.sujetoUsuarioActual.value;
  }
}
