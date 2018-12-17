 
 

import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscriber, Subscription } from 'rxjs';

import { retry, map, filter } from 'rxjs/operators';



 
@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscripcion: Subscription;
  
  
  constructor() {


    // creacion de observables

    // para re intentar los intentos de un observable.. hace falta el operador retry. se coloca con una función de pipe
    this.subscripcion = this.regresaObservable()
      // pipe(
      //   retry(2)
      // )
      // un observable en subscripcion tiene 3 etapas.. 1 cuando se efectuan las cosas.. el segundo es un error en caso de que suceda algo y por ultimo cuando termina.
      .subscribe(
        numero => {
          // console.log("subscriber de observable", numero);
        },
        error => {
          // console.error("El error del observable fue", error);
        },
        () => {
          // console.log("El observable ha terminado.");
        }
      );
  }

  ngOnInit() {}

  // cuando la pagina se elimina se ejecutan fucniones aca, esto es parte del ciclo de vida de los componentes
  ngOnDestroy(){
    console.log("pagina se esta cerrando");
    this.subscripcion.unsubscribe();
  }

  // se le puede especificar que valor regresa
  regresaObservable(): Observable<any> {
    return (
      new Observable((observer: Subscriber<any>) => {
        let contador = 0;
        let intervalo = setInterval(() => {
          contador += 1;
          // el observer.next lo que haria seria notificar cada vez que ocurre una sumatoria del contador.

          const salida = {
            valor: contador
          };
          observer.next(salida);

          // if (contador === 3) {
          //   clearInterval(intervalo);
          //   observer.complete();
          // }

          // if (contador === 2) {
          //   clearInterval(intervalo);
          //   observer.error('error en observable');
          // }
        }, 1000);
      })
        // para utilizar el operador map hace falta
        .pipe(
          map(respuesta => {
            return respuesta.valor;
          }),
          // el operador filter recibe 2 argumentos. 1 el valor o respuesta y el segundo es un index que define el numero de veces que ha sido llamado el filter
          filter((valor, index) => {
            if (valor % 2 === 1) {
              // impar
              return true;
            } else {
              // par
              return false;
            }
          })
        )
    );
    //  // para re intentar los intentos de un observable.. hace falta el operador retry. se coloca con una función de pipe
    // obs.pipe(
    //   retry(2)
    // )
    //   // un observable en subscripcion tiene 3 etapas.. 1 cuando se efectuan las cosas.. el segundo es un error en caso de que suceda algo y por ultimo cuando termina.
    //   .subscribe(
    //     numero => {
    //       console.log('subscriber de observable', numero);
    //     },
    //     error => {
    //       console.error("El error del observable fue", error);
    //     },
    //     () => {
    //       console.log("El observable ha terminado.");

    //     });
  }
}
