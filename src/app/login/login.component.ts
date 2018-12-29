import { GOOGLE_ID } from './../config/config';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
// servicio de usuario
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function initPlugins();

// funcion para manejar las validaciones de google
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // tambien se pueden poner campos por defecto declarando una variable con un ngmodel
  recuerdame: boolean = false;

  email: string;

  // auth2 funciona para las validaciones de google
  auth2: any;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    initPlugins();

    this.googleInit();
    // tomo el email para ponerlo  al tener recuerdame activo.
    this.email = localStorage.getItem('email') || '';

    if(this.email.length > 1){
      this.recuerdame = true;
    }
  }

  /* -------------------------------------
      <- Inicializar modulo google sing ->
      Descripción: Funcion que inicializa lo 
      necesario para el login valido con google
    --------------------------------------- */
  googleInit(){
    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: GOOGLE_ID,
        cookiepolicy: 'single_host_origin',
        // datos requeridos que se jalan de la cuenta de google
        scope: 'profile email'
      });

      this.attachSingin( document.getElementById('btnGoogle') );

      
    });
  }
  // recibe elemento html para accionar el boton de login
  attachSingin( element ){
    this.auth2.attachClickHandler( element, {}, (googleUser) =>{
      // con esto se pueden obtener varias cosas como por ejemplo datos del perfil
      // con el profile podemos obtener varios datos de información iportante del usuario
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      
      this._usuarioService.loginGoogle( token )
        .subscribe( resp =>{
          window.location.href = '#/dashboard';
        });
      
    });
  }

  // se recibe el formulario
  ingresar( forma: NgForm ){


    console.log("ingresando sesion");
    
    if( forma.invalid ){
      return;
    }
    
    let usuario = new Usuario( null, forma.value.email, forma.value.password );
    // despues de que se cargan los datos en el modelo de clase de datos usuario entonces se llama la funcion de login y se pasan los datos por referencia 
    this._usuarioService.login( usuario, forma.value.recuerdame )
      .subscribe( resp => {
        this.router.navigate(['/dashboard']);
      });
  }

}
