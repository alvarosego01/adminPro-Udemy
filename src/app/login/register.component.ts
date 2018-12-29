import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// alertas bonitas
import swal from 'sweetalert';
// modelo de datos clase usuario
import { Usuario } from './../models/usuario.model';

// servicio para crear usuarios y todo lo que maneja el rest de usuarios
import { UsuarioService } from '../services/service.index';

declare function initPlugins();

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./login.component.css"]
})
export class RegisterComponent implements OnInit {
  
  /* -------------------------------------
      <- Se crea un objeto de tipo formgroup
      para trabajar el formulario de registro -> 
    --------------------------------------- */
  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {}

  sonIguales( campo1: string, campo2: string ){
    
    // se hace referenca a los datos que se quieren validar
    return ( group: FormGroup ) =>{

    let pass1 = group.controls[campo1].value;
    let pass2 = group.controls[campo2].value;
    
    if( pass1 === pass2 ){
      return null
    }

      return{
        sonIguales: true
      }
    }
  }

  ngOnInit() {
    initPlugins();
    /* -------------------------------------
        <- los datos que se manejan aca son 
        los mismos datos que se manejan en el html
        se especifican como si fueran una interfaz -> 
      --------------------------------------- */
    this.forma = new FormGroup({
      // parametros form control..1 valor por defecto, 2 validadores se colocan en condiciones y si son varias se pone tipo arreglo []
      // se quiere hacer un popup con mensajes aprobatorios o de false con el formulario.
      nombre: new FormControl( null, Validators.required ),
      correo: new FormControl( null, [
        Validators.required,
        Validators.email
      ] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      condiciones: new FormControl( false ),
    // como segundo parametro recibe ademas una serie de validaciones especiales. recibe una funcion que servira como validacion.
    }, { validators: this.sonIguales( 'password', 'password2' ) } )
    
    // esto es para llenar data de forma por codigo
    this.forma.setValue({
      nombre: 'test',
      correo: 'email2@gmail.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    })

  }

  registrarUsuario(){

    if(this.forma.invalid){
      return;
    }

    if( !this.forma.value.condiciones ){

      swal('Importante', 'Debe aceptar las condiciones', 'warning');
      return;
    }
    
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );
    // una vez que se cargan los datos en el objeto let usuario entonces se llama el servicio y se pasan los valores para que se registren, pero esto no va a funcionar directamente hasta que se suscriba al observable.
    // por defecto esta funcionalidad de pedir http a un servidor no va a funcionar por que hace falta modificar lo que viene siendo el cors. para que node permita emitir peticiones a cualquier otro url
    this._usuarioService.crearUsuario( usuario ).subscribe( resp => {
      // console.log(resp);
      // cuando el usuario ha sido creado se viajara a la pagina de login se importa el Router para esto
      this.router.navigate(['/login']);
    });

  }
}
