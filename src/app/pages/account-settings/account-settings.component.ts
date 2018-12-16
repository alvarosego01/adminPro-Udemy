import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from 'src/app/services/settings/settings.service';
 

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  // para hacer referencias en el dom se puede usar la orma inject con document  @Inject(DOCUMENT) private _document... ya en este punto se puede tener acceso y referencia a todo el document
  constructor(

    private _ajustesServices: SettingsService
  ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor( tema:string, link: any ){
 
    
    this.aplicarCheck(link);

    this._ajustesServices.aplicarTema( tema );

 
  }
 

  aplicarCheck( link: any ){
    // con javascript vanila se añaden los workings el estatus de working 
    let selectores:any = document.getElementsByClassName('selector');

    for (let ref of selectores) {
      ref.classList.remove('working');
    }

 

    link.classList.add('working');

  }

  colocarCheck(){

    let selectores: any = document.getElementsByClassName('selector');
    
    let tema = this._ajustesServices.ajustes.tema;

    for (let ref of selectores) {
      
      if( ref.getAttribute('data-theme') === tema ){
        ref.classList.add("working");
        break;
      }  
    
    }

  }

}
