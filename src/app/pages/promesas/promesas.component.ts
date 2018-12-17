import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    

    this.contarTres().then( mensaje => {
      console.log('termino de contar', mensaje);
      
    })
    .catch( error => {
      console.error('Error al contar', error);
      
    });
    

  }

  ngOnInit() {
  }
  // se colocan cosas con menor que mayor que para determinar el tipo de dato que retorna una función.. <boolean>  significa que retorna boolean. .. tambien a las funciones se les puede poner un tipo de dato de función.
  contarTres(): Promise <boolean> {
    
    return new Promise((resolve, reject) => {

      let contador = 0;

      let intervalo = setInterval(() => {
        contador += 1;
        console.log(contador);
        
        if (contador == 3) {
          
          resolve(true);
          clearInterval(intervalo);
        }
      }, 1000);

    });
  }

}
