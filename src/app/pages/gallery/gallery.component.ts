import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RotateDirective } from '../../directives/rotate.directive';

interface ImagenPerro {
  id: number;
  src: string;
  title: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RotateDirective],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent implements OnInit, OnDestroy {
  imagenesPerro: ImagenPerro[] = [
    { id: 1, src: 'assets/dogs/alvan.jpg', title: 'Perro 1' },
    { id: 2, src: 'assets/dogs/basenji-dog.jpg', title: 'Perro 2' },
    { id: 3, src: 'assets/dogs/Getty.jpg', title: 'Perro 3' },
    { id: 4, src: 'assets/dogs/golden.jpg', title: 'Perro 4' },
    { id: 5, src: 'assets/dogs/karsten.jpg', title: 'Perro 5' },
    { id: 6, src: 'assets/dogs/nee.jpg', title: 'Perro 6' },
    { id: 7, src: 'assets/dogs/pexels-gilberto.jpg', title: 'Perro 7' },
    { id: 8, src: 'assets/dogs/pexels.jpg', title: 'Perro 8' },
    { id: 9, src: 'assets/dogs/pug.jpg', title: 'Perro 9' },
  ];

  indiceImagenActual: number = 0;
  escalaImagen: number = 1;
  rotacionImagenActual: number = 0;
  estaReproduciendo: boolean = false;
  private intervaloReproduccion: any;
  paginaMiniaturaActual: number = 0;
  miniaturasPorPagina: number = 3;

  ngOnInit(): void {
    // Inicialización si es necesaria
  }

  ngOnDestroy(): void {
    // Limpiar intervalo si está activo
    if (this.intervaloReproduccion) {
      clearInterval(this.intervaloReproduccion);
    }
  }

  private actualizarPaginaMiniatura(): void {
    const maxPagina = Math.ceil(this.imagenesPerro.length / this.miniaturasPorPagina) - 1;
    const indiceInicioPaginaActual = this.paginaMiniaturaActual * this.miniaturasPorPagina;
    const indiceFinPaginaActual = indiceInicioPaginaActual + this.miniaturasPorPagina - 1;

    if (this.indiceImagenActual > indiceFinPaginaActual && this.paginaMiniaturaActual < maxPagina) {
      this.paginaMiniaturaActual++;
    } else if (this.indiceImagenActual < indiceInicioPaginaActual && this.paginaMiniaturaActual > 0) {
      this.paginaMiniaturaActual--;
    }
  }

  private obtenerIndiceReal(indiceEnPagina: number): number {
    return (this.paginaMiniaturaActual * this.miniaturasPorPagina) + indiceEnPagina;
  }

  seleccionarImagen(indice: number): void {
    this.indiceImagenActual = indice;
    this.actualizarPaginaMiniatura();
  }

  siguienteImagen(): void {
    const indiceInicioPaginaActual = this.paginaMiniaturaActual * this.miniaturasPorPagina;
    const indiceFinPaginaActual = indiceInicioPaginaActual + this.miniaturasPorPagina - 1;

    if (this.indiceImagenActual < this.imagenesPerro.length - 1) {
      if (this.indiceImagenActual < indiceFinPaginaActual) {
        this.indiceImagenActual++;
      } else if (this.paginaMiniaturaActual < Math.ceil(this.imagenesPerro.length / this.miniaturasPorPagina) - 1) {
        this.paginaMiniaturaActual++;
        this.indiceImagenActual++;
      } else {
        this.indiceImagenActual = 0;
        this.paginaMiniaturaActual = 0;
      }
    } else {
      this.indiceImagenActual = 0;
      this.paginaMiniaturaActual = 0;
    }
  }

  imagenAnterior(): void {
    const indiceInicioPaginaActual = this.paginaMiniaturaActual * this.miniaturasPorPagina;

    if (this.indiceImagenActual > 0) {
      if (this.indiceImagenActual > indiceInicioPaginaActual) {
        this.indiceImagenActual--;
      } else if (this.paginaMiniaturaActual > 0) {
        this.paginaMiniaturaActual--;
        this.indiceImagenActual--;
      } else {
        this.indiceImagenActual = this.imagenesPerro.length - 1;
        this.paginaMiniaturaActual = Math.ceil(this.imagenesPerro.length / this.miniaturasPorPagina) - 1;
      }
    } else {
      this.indiceImagenActual = this.imagenesPerro.length - 1;
      this.paginaMiniaturaActual = Math.ceil(this.imagenesPerro.length / this.miniaturasPorPagina) - 1;
    }
  }

  acercar(): void {
    if (this.escalaImagen < 2) {
      this.escalaImagen += 0.1;
    }
  }

  alejar(): void {
    if (this.escalaImagen > 0.5) {
      this.escalaImagen -= 0.1;
    }
  }

  reproducir(): void {
    this.estaReproduciendo = true;
    this.intervaloReproduccion = setInterval(() => {
      this.siguienteImagen();
    }, 2000);
  }

  detener(): void {
    this.estaReproduciendo = false;
    if (this.intervaloReproduccion) {
      clearInterval(this.intervaloReproduccion);
      this.intervaloReproduccion = null;
    }
  }

  esPrimeraImagen(): boolean {
    return this.indiceImagenActual === 0;
  }

  esUltimaImagen(): boolean {
    return this.indiceImagenActual === this.imagenesPerro.length - 1;
  }

  get imagenActual(): ImagenPerro {
    return this.imagenesPerro[this.indiceImagenActual];
  }

  siguientePaginaMiniatura(): void {
    const maxPage =
      Math.ceil(this.imagenesPerro.length / this.miniaturasPorPagina) - 1;
    if (this.paginaMiniaturaActual < maxPage) {
      this.paginaMiniaturaActual++;
    }
  }

  paginaMiniaturaAnterior(): void {
    if (this.paginaMiniaturaActual > 0) {
      this.paginaMiniaturaActual--;
    }
  }

  esPrimeraPaginaMiniatura(): boolean {
    return this.paginaMiniaturaActual === 0;
  }

  esUltimaPaginaMiniatura(): boolean {
    const maxPage =
      Math.ceil(this.imagenesPerro.length / this.miniaturasPorPagina) - 1;
    return this.paginaMiniaturaActual === maxPage;
  }

  alCambiarRotacion(rotacion: number): void {
    this.rotacionImagenActual = rotacion;
  }
}
