import { Router, ActivatedRoute } from '@angular/router';
import { Medico } from 'src/app/models/medico.model';


import { Hospital } from "./../../models/hospital.model";
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from "src/app/config/config";
import { Injectable } from "@angular/core";

import { map } from "rxjs/operators";


import { UsuarioService } from "../usuario/usuario.service";


@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) {}



  cargarMedicos(){

    let url = URL_SERVICIOS + '/medico';

    return this.http.get( url ).pipe(
      map( (resp:any) => {
        this.totalMedicos = resp.total;
        // console.log(resp.Medicos);
        return resp.Medicos;
      })
    );

  }

  cargarMedico( id:string ){
    let url = URL_SERVICIOS + '/medico/' + id;

    return this.http.get(url).pipe(
      map( (resp: any) => {
        console.log(resp);
        
        return resp.medico;
      })
    )
  }

    
  buscarMedicos( termino:string ){
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;

    return this.http.get(url).pipe(
      map( (resp: any ) => resp.medicos )
    );
  }

  borrarMedico( id: string ){

    let token = this._usuarioService.token;

    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + token;
    
    return this.http.delete(url).pipe(
      map( (resp:any) =>{
        swal( 'Medico Borrado', 'Correcto', 'success' );
        return resp;
      })
    )
  }

  guardarMedico( medico: Medico ){

    let token = this._usuarioService.token;

    let url = URL_SERVICIOS + '/medico';
    
    // se pone una validacion para determinar cuando se crea y cuando se actualiza un medico
    if( medico._id ){
      // si existe ID es por que se esta actualizando
      url += '/' + medico._id;
      url += '?token=' + token;

      return this.http.put( url, medico ).pipe(
        map( ( resp:any ) =>{
          
          swal('Medico Actualizado', 'Medico nuevo: ' + medico.nombre, 'success');
          return resp.medico;
        } )
      )
    }else{
      // creando
      url += '?token=' + token;
      
      return this.http.post( url, medico ).pipe(
        map( (resp: any) => {

          swal('Medico Creado', 'Medico nuevo: ' + medico.nombre, 'success');
          
          return resp.medico;
        })
      );
    }
        
  }
      
}
