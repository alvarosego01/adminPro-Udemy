import { Router } from '@angular/router';
import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';

// se importa la clase o el modelo de datos de tipo usuario
import { Usuario } from 'src/app/models/usuario.model';

import { HttpClient } from '@angular/common/http';


// para poder usar el map
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { throwError } from 'rxjs/internal/observable/throwError';
 

import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
 

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    // se llama al cargar storage siempre que se inicialize el servicio para que tengan datos manejables.
    this.cargarStorage();
   }

  estaLogueado(){

    return (this.token.length > 5 )? true : false; 
  
  
  }
  
  /* -------------------------------------
      <- Cargar storage ->
      Descripción: Con esta funcion nos aseguramos
      de que las variables token y usuario siempre tengan
      un valor valido o nulo que mostrar
    --------------------------------------- */
  cargarStorage(){
    if(localStorage.getItem('token')){

      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.menu = JSON.parse( localStorage.getItem('menu') );

    }else{
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }

    // console.log('cargar storage token: ', this.token);
    // console.log('cargar storage usuario: ', this.usuario);

  }
  
  /* -------------------------------------
      <- Guardar en Storage ->
      Descripción: Con esta funcion se almacenan
      el id, el usuario, el token en el localstorage
      para manejarse de manera dinamica sin importar
      que se elimine el navegador
    --------------------------------------- */
  guardarStorage( id:string, token: string, usuario: Usuario, menu: any ){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    // se almacena el usuario pero hay que tener cuidado por que la respuesta que se retorna es un objeto.. para esto se transforma en un string por que localstorage solo almacena strings
    localStorage.setItem('usuario', JSON.stringify(usuario));
    
    // almacenar menu
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  loginGoogle( token: string ){

    let url = URL_SERVICIOS + '/login/google';
    
    return this.http.post( url, { token } ).pipe(
      map( (resp:any) =>{
        // console.log(resp);
        this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu );
        return true;
      })
    );

  }
  /* -------------------------------------
      <- Logout ->
      Descripción: Funcion que desloguea usuario
      activo y elimina el local storage.
    --------------------------------------- */
  logout(){
    this.usuario = null;
    this.token = '';
    this.menu = [];
    
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    // una vez al deslogear se pasa al login
    this.router.navigate(['/login']);
  }

  /* -------------------------------------
      <- Login ->
      Descripción: Funcion que contiene los
      metodos necesarios para logear por el servicio
      a un usuario .retorna un observable al cual 
      se suscribe cuando se usa.
    --------------------------------------- */

  login( usuario: Usuario, recordar: boolean = false ){
    
    if( recordar ){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }

    let url =  URL_SERVICIOS + '/login';
    // una vez logeado hace falta grabar la sesión en el local storage designado. 
    return this.http.post( url, usuario ).pipe(
        map( (resp: any) => {
          this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
          return true;
        }),
        catchError( err =>{
          
          swal( 'Error en login', err.error.mensaje, 'error');
          return throwError(err);
          
        })
        
    );
    

  }

  crearUsuario( usuario: Usuario ){
  
    let url = URL_SERVICIOS + '/usuario';
    // se concatena el tipo de envio post.
    // se coloca un return para poder tener un observador para llevar el control del registro al cumplirse.
    // se utiliza el map para poder tomar la respuesta y transformarla
    return this.http.post( url, usuario ).pipe(
      map( (resp: any) => {
        
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }),
      catchError(err => {

        swal(err.error.mensaje, err.error.errors.message, 'error');
        return throwError(err);

      })

    );

  }

  /* -------------------------------------
      <- Actualizar Usuarios ->
      Descripción: Recibe la información por
      parametro y la actualiza.
    --------------------------------------- */
  actualizarUsuario( usuario:Usuario ){

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    // console.log(url);
    
    return this.http.put( url, usuario ).pipe(
      map( (resp:any)=>{
        // se actualiza localmente la información
        if(usuario._id === this.usuario._id){
          let userResp: Usuario = resp.usuario
          this.guardarStorage( userResp._id, this.token, userResp, this.menu );
        }
        swal( 'Usuario actualizado', usuario.nombre , 'success');

        return true;
      })
    );

  }
  
  /* -------------------------------------
      <- Cambiar imagen ->
      Descripción: Con este metodo se cambia
      la imagen de perfil designada de un usuario
      recibe el file que seria la imagen y el id
      del usuario.
    --------------------------------------- */
  cambiarImagenPerfil( archivo: File, id: string ){
    
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
      .then( (resp:any) =>{
        this.usuario.img = resp.usuario.img;
        swal('Imagen actualizada',this.usuario.nombre, 'success' );
        this.guardarStorage( id, this.token, this.usuario, this.menu );
      })
      .catch( resp => {
        
      });

  }
  /* -------------------------------------
      <- Carga de usuarios ->
      Descripción: Carga los usuarios 
      desde el servicio|
    --------------------------------------- */
  cargarUsuarios( desde: number = 0 ){
    
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get( url );

  }
  
  buscarUsuarios( termino:string ){
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get(url).pipe(
      map( (resp: any ) => resp.usuarios )
    );
  }

  borrarUsuario( id: string ){

    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url).pipe(
      map( resp =>{
        swal( 'Usuario borrado', 'El usuario ha sido eliminado', 'success' );
        return true;
      })
    );

  }

}
