import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  // para definir parametros de las rutas. se importaran las rutas

  // para modificar las migajas de pan se debe hacer lo siguiente 
   titulo: string;
  
   constructor(
    private router: Router,
    private title: Title,
    private meta: Meta
  ) { 
 
    this.getDataRoute().subscribe( data =>{
      // console.log(data);
      this.titulo = data.titulo;
      this.title.setTitle( this.titulo );
      
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo

      };

      this.meta.updateTag( metaTag );

    });

  }

  ngOnInit() {
  }

  getDataRoute(){
    // se neesita traer filter para filtrar y extraer solo los tipos de datos que sean una instancia de activation End.
    return this.router.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      // con el filter anterir obtengo solo el objeto adecuado de Activation para poder tener los items de data para crear los breadcrums
      map((evento: ActivationEnd) => evento.snapshot.data)

    )
  }

}
