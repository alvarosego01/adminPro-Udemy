import { Component, OnInit } from '@angular/core';

// modelo de datos de usuario
import { Usuario } from 'src/app/models/usuario.model';
// servicio de usuario
import { UsuarioService } from './../../services/usuario/usuario.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})

export class HeaderComponent implements OnInit {

  // se hace una referencia del usuario actual para poder tomar sus datos y imprimirlos en pantalla
  usuario: Usuario;

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

}
