import { Usuario } from 'src/app/models/usuario.model';
import { Component, OnInit } from '@angular/core';

// servicios
import { SidebarService, UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  // se crea referencia para manejar data de usuario
  usuario: Usuario;

  constructor(
    public _sidebarService: SidebarService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this._sidebarService.cargarMenu();
  }

}
