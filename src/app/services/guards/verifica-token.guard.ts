import { UsuarioService } from './../usuario/usuario.service';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {


  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ){

  }

  // tiene dos posibilidades, retorna un bool o una promesa
  canActivate(): Promise<boolean> | boolean {
    
    console.log('inicio de verifica token');

    let token = this._usuarioService.token;
    let payload = JSON.parse( atob( token.split('.')[1] ) );
    // console.log(payload);
    let expirado = this.expirado(payload.exp);   
    
    if( expirado ){
      this.router.navigate(['/login']);
      return false
    }
    // en caso de que no haya expirado, se llama al renuevatoken
    

    return this.verificaRenueva( payload.exp );
  }

  verificaRenueva( fechaExp: number ): Promise<boolean>{
    return new Promise( (resolve,reject) =>{
      let tokenExp = new Date( fechaExp * 1000 );
      let ahora = new Date();
  
    
      ahora.setTime( ahora.getTime() + (1 * 60 * 60 * 1000) );

      if( tokenExp.getTime() > ahora.getTime() ){
        resolve( true );
      }else{
        // esta proximo a vencer, y se renueva

        this._usuarioService.renuevaToken()
          .subscribe( () => {
            resolve(true);
          }, () =>{
             this.router.navigate(['/login']);
            reject( false );
          });
      }
      
      resolve( true );
    });
  }

  expirado( fechaExp:number ){

    let ahora = new Date().getTime() / 1000;

    if( fechaExp < ahora ){
      // expiro
      return true;
    }else{
      // no ha expirado
      return false;
    }

  }

}
