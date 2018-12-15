
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.sass']
})
export class IncrementadorComponent implements OnInit {

  // para hacer referencia del objeto o elemento html al cual uno efectua un evento , se coloca el viewwchild.

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() progreso: number = 50;

  // propiedades de componente con @input se pueden recibir parametros desde fuera
  @Input() leyenda: string = 'Leyenda';

  // se notifica al padre para notificar cambios y que aca van a suceder cosas
  // @output seria la forma para recibir valores del padre, nombre variable:tipo de dato event emitter <retorna un numero></retorna>
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onChange( newValue: number ){
    console.log(" nuevo valor", newValue);

    // para prevenir que el imput se escriba con datos invaldos..se usa el viewchild colocand una referencia en el dom del input con un numeral # 
    if( newValue >= 100 ){
      this.progreso = 100;
    }else if( newValue <= 0 ){
      this.progreso = 0;
    }else{
      this.progreso = newValue;
    }
    
    this.cambioValor.emit( this.progreso );
    this.txtProgress.nativeElement.value = this.progreso;
    
  }

  cambiarValor(valor: number) {
    if ((this.progreso >= 100) && (valor > 0)) {
      this.progreso = 100;
      return;
    }
    if ((this.progreso <= 0) && (valor < 0)) {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;

    // se emite el nummero como un evento en este punto.
    this.cambioValor.emit( this.progreso );
    this.txtProgress.nativeElement.focus();
  }

}