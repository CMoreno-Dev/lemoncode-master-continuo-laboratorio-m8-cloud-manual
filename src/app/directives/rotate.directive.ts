import {
  Directive,
  Input,
  Output,
  EventEmitter,
  OnInit,
  Renderer2,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: 'img[rotate]',
  standalone: true,
})
export class RotateDirective implements OnInit {
  @Input() rotacion: number | string = 0;
  @Input() paso: number = 10;
  private _escala: number = 1;
  @Output() rotacionCambiada = new EventEmitter<number>();

  private rotacionActual: number = 0;

  constructor(
    private elemento: ElementRef,
    private renderizador: Renderer2,
  ) {}

  @Input()
  get escala(): number {
    return this._escala;
  }

  set escala(value: number) {
    this._escala = value;
    this.aplicarRotacion();
  }

  ngOnInit(): void {
    this.rotacionActual =
      typeof this.rotacion === 'string' ? parseFloat(this.rotacion) : this.rotacion;
    this.aplicarRotacion();
  }

  @HostListener('click', ['$event'])
  alHacerClick(event: MouseEvent): void {
    if (event.shiftKey) {
      this.rotacionActual -= this.paso;
    } else {
      this.rotacionActual += this.paso;
    }
    this.aplicarRotacion();
    this.rotacionCambiada.emit(this.rotacionActual);
  }

  private aplicarRotacion(): void {
    this.renderizador.setStyle(
      this.elemento.nativeElement,
      'transform',
      `scale(${this.escala}) rotate(${this.rotacionActual}deg)`,
    );
  }
}
