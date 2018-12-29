import { Router } from '@angular/router';
import { URL_SERVICIOS } from './../../config/config';
import { Injectable } from '@angular/core';

// se importa la clase o el modelo de datos de tipo usuario
import { Usuario } from 'src/app/models/usuario.model';

import { HttpClient } from '@angular/common/http';


// para poder usar el map
import { map } from 'rxjs/operators';
 

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
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

    }else{
      this.token = '';
      this.usuario = null;
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
  guardarStorage( id:string, token: string, usuario: Usuario ){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    // se almacena el usuario pero hay que tener cuidado por que la respuesta que se retorna es un objeto.. para esto se transforma en un string por que localstorage solo almacena strings
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  loginGoogle( token: string ){

    let url = URL_SERVICIOS + '/login/google';
    
    return this.http.post( url, { token } ).pipe(
      map( (resp:any) =>{
        this.guardarStorage( resp.id, resp.token, resp.usuario );
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
    
    
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

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
      
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
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
      })
    );

  }



}
