import { Component, OnInit } from '@angular/core';

// para poder usar una funcion definida en un javascript externo
declare function initPlugins();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // inicializa los estilos y funciones mediante un javascript externo. 
    initPlugins();
  }

}
