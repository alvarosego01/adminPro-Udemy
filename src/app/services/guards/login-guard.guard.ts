import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {
  
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ){

  }

  canActivate(){
    
    console.log( 'Paso por el login Guard' );

    if( this._usuarioService.estaLogueado() ){
      console.log("Paso el guard");
      return true;
      
    }else{
      console.log('Bloqueado por el guard');
      // si falla entonces lleva al login
      this.router.navigate(['/login']);
      return false;
      
    }

 
  }
}
