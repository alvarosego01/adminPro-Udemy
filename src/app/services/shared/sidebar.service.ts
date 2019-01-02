import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];
  // menu: any = [
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     subMenu: [
  //       { titulo: 'Dashboard', url: '/dashboard' },
  //       { titulo: 'ProgressBar', url: '/progress' },
  //       { titulo: 'Graficas', url: '/graficas1' },
  //       { titulo: 'Promesas', url: '/promesas' },
  //       { titulo: 'Rxjs', url: '/rxjs' }
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     subMenu: [
  //       { titulo: 'Usuarios', url: '/usuarios' },
  //       { titulo: 'Hospitales', url: '/hospitales' },
  //       { titulo: 'Medicos', url: '/medicos' },
  //     ]
  //   }
  // ];

  constructor(
    public _usuarioService: UsuarioService
  ) { 
    // console.log(this.menu);
  }
  
  cargarMenu(){
    
    this.menu = this._usuarioService.menu;
  }
}
