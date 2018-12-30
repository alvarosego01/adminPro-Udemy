import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal:any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  // cuando se carga la pagina se necesita setear la data de los primeros usuarios
  usuarios: Usuario[] = [];

  desde: number = 0;
  totalRegistros: number = 0;
  
  // para el spinner de carga.
  cargando: boolean = true;



  constructor(
    public _usuarioServices: UsuarioService,
    public _modalUploadServices: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadServices.notificacion.subscribe(
      resp => {
        // se recarga la pagina actual cuando pasa este evento
        this.cargarUsuarios();
    });
  }

  mostrarModal( id: string ){

    this._modalUploadServices.mostrarModal( 'usuarios', id );
  }

  cargarUsuarios(){
  
    this.cargando = true;

    this._usuarioServices.cargarUsuarios( this.desde )
      .subscribe( (resp: any) => {
        // console.log(resp);
        // this.totalRegistros = resp.total;
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      });
  }

  cambiarDesde( valor: number ){
    let desde = this.desde + valor;
    
    if( desde >= this.totalRegistros ){
      return;
    }

    if( desde < 0 ){
      return;
    }
    
    this.desde += valor;
    this.cargarUsuarios();


  }

  buscarUsuario( termino: string ){

    if( termino.length <= 0 ){
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioServices.buscarUsuarios( termino )
      .subscribe( (usuarios: Usuario[]) =>{
        this.usuarios = usuarios;
        this.cargando = false;
      })
    
  }

  borrarUsuario( usuario: Usuario ){

    if( usuario._id === this._usuarioServices.usuario._id ){
      swal( 'No puede borrar usuario', 'No puedes borrar tu propio perfil', 'error' );
      return;
    }
    // mensaje de confirmación
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a '+ usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( borrar =>{
      console.log(borrar);
      if(borrar){
        this._usuarioServices.borrarUsuario( usuario._id ).subscribe( borrado => {
          console.log(borrado);
          this.cargarUsuarios();
        });
      }
    });
  }

  guardarUsuario( usuario: Usuario ){
    this._usuarioServices.actualizarUsuario( usuario )
      .subscribe();
  }

}


