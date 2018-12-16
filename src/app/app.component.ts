import { SettingsService } from './services/settings/settings.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  // para hacer que esta configuracion global se efectue, solo basta con inyectar el servicio en el constructor y al hacer esto y usar el servicio en la pagina deseada , se va a efectuar sin hacer nada mas.
  constructor(
    public _ajustesService: SettingsService
  ){

  }
}
