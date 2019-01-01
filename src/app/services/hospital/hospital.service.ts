import { Hospital } from './../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Injectable } from '@angular/core';

import { map } from "rxjs/operators";

// import { UsuarioService } from '../hospital/hospital.service';

import { UsuarioService } from '../usuario/usuario.service';

 
@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  
  totalHospitales: number = 0;
  
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }


  /* -------------------------------------
      <- Obtener Hospitales ->
      Descripción: Retorna todos los hospitales
      suscritos en el sistema, no recibe 
      parametros.
    --------------------------------------- */
  cargarHospitales(){
  
    // console.log("Cargar hospitales serv");
    
    let url = URL_SERVICIOS + '/hospital';
    
    return this.http.get( url ).pipe(
      map( (resp: any) =>{
        this.totalHospitales = resp.total;

        return resp.hospitales;
      })
    )
  
  }
  /* -------------------------------------
      <- Obtener hospital POR ID ->
      Descripción: Obtiene un unico hospital
      retornado por ID.
    --------------------------------------- */
  obtenerHospital( id: string ){

    let url = URL_SERVICIOS + '/hospital/' + id;

    return this.http.get(url).pipe(
      map( (resp: any) => resp.hospital )
    );
  }


  borrarHospital( id: string ){
    
    let token = this._usuarioService.token;
    
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + token;

    return this.http.delete(url).pipe(
      map(resp => {
        swal('Hospital borrado', 'El hospital ha sido eliminado', 'success');
        return true;
      })
    );
  }

  crearHospital(nombre: string) {
  
    let token = this._usuarioService.token;

    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + token;
    // se concatena el tipo de envio post.
    // se coloca un return para poder tener un observador para llevar el control del registro al cumplirse.
    // se utiliza el map para poder tomar la respuesta y transformarla
    return this.http.post(url, { nombre }).pipe(
      map((resp: any) => {

        swal('Hospital creado', 'Hospital ' + nombre, 'success');
        return resp.hospital;
      })
    );

  }

  /* -------------------------------------
      <- Actualizar Usuarios ->
      Descripción: Recibe la información por
      parametro y la actualiza.
    --------------------------------------- */
  actualizarHospital(hospital: Hospital) {

    let token = this._usuarioService.token;

    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + token;
    // console.log(url);


    return this.http.put(url, hospital).pipe(
      map((resp: any) => {
        // se actualiza localmente la información
        // if (hospital._id === this.hospital._id) {
        //   let userResp: Usuario = resp.hospital
        
        // }
        swal('Usuario actualizado', hospital.nombre, 'success');

        return resp.hospital;
      })
    );

  }

  buscarHospitales(termino: string) {
    
    let url = URL_SERVICIOS + "/busqueda/coleccion/hospitales/" + termino;

    return this.http.get(url).pipe(
      map((resp: any) => resp.hospitales)
    );
  }

}
