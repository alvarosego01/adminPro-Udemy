import { UsuarioService } from './../../services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  // referencia de usuario
  usuario: Usuario;

  imagenSubir: File;

  imagenTemporal: any;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
   }

  ngOnInit() {
  }

  /* -------------------------------------
      <- Guardar perfil ->
      Descripción: guarda la informaci
    --------------------------------------- */
  guardar( usuario: Usuario ){

    this.usuario.nombre = usuario.nombre;
    if( !this.usuario.google ){
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario( this.usuario )
      .subscribe();

  }

  /* -------------------------------------
      <- Cambiar imagen ->
      Descripción: Detecta cuando se selecciona
      una nueva imagen para posteriormente
      guardarla
    --------------------------------------- */
  seleccionImagen( archivo: File){
    
    if( !archivo ){
      this.imagenSubir = null;
      return;
    }
    
    if( archivo.type.indexOf('image') < 0 ){
      swal( 'Solo se permite imagenes', 'El archivo seleccionado no es una imagen', 'error' );
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    // para poner la imagen seleccionada de forma preview temporal se tiene que.
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () =>{
      // console.log(reader.result);
      this.imagenTemporal = reader.result;
    }
    
  }
  cambiarImagen(){
    this._usuarioService.cambiarImagenPerfil( this.imagenSubir, this.usuario._id );
  }

  

}
