import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {


  constructor(
    public _usuarioService: UsuarioService
  ){

  }

  canActivate(){

    if( this._usuarioService.usuario.role === "ADMIN_ROLE" ){
      return true;
    }else{
      console.log('Bloqueado por el admin guard');
      this._usuarioService.logout();
      return true;
    }
    
  }

}
