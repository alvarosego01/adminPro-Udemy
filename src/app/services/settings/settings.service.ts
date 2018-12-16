import { DOCUMENT } from '@angular/platform-browser';
import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class SettingsService {
  // para los cambios por ejemplo del tema se deben crear valores por defecto. por ejemplo con una interfaz para los datos
  ajustes: Ajustes = {
    temaUrl: "assets/css/colors/default.css",
    tema: 'default'
  };
  constructor(
    @Inject(DOCUMENT) private _document
  ) {
    this.cargarAjustes();
  }
  // funciones para grabar y mantener la persistencia de datos en el local storage

  guardarAjustes(){
    
    
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes ));
  }

  cargarAjustes(){

    if( localStorage.getItem('ajustes') ){
      // si existen los ajustes entonces
      
      
      this.ajustes = JSON.parse( localStorage.getItem('ajustes'));

      this.aplicarTema( this.ajustes.tema );
    }else{
 
      this.aplicarTema( this.ajustes.tema );
      
    }

  }

  aplicarTema( tema: string ){
    

    let url = `assets/css/colors/${tema}.css`;
    this._document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();
  }
}


// interfaz para los ajustes globales
interface Ajustes {
  temaUrl: string;
  tema: string;
}

