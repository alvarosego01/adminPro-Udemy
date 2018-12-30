import { ModalUploadService } from './modal-upload.service';
import { SubirArchivoService } from 'src/app/services/service.index';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-modal-upload",
  templateUrl: "./modal-upload.component.html",
  styles: []
})
export class ModalUploadComponent implements OnInit {
  
  // oculto: string;

  imagenSubir: File;

  imagenTemporal: any;

  constructor(
    public _subirArchivoServices: SubirArchivoService,
    public _modalUploadServices: ModalUploadService
  ) {}


  ngOnInit() {
  }

  /* -------------------------------------
    <- Cambiar imagen ->
    Descripción: Detecta cuando se selecciona
    una nueva imagen para posteriormente
    guardarla
  --------------------------------------- */
  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf("image") < 0) {
      swal(
        "Solo se permite imagenes",
        "El archivo seleccionado no es una imagen",
        "error"
      );
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    // para poner la imagen seleccionada de forma preview temporal se tiene que.
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => {
      // console.log(reader.result);
      this.imagenTemporal = reader.result;
    };
  }


  /* -------------------------------------
      <- Cerrar modal ->
      Descripción: En esta parte se coloca
      esta funcion en esta area por que hay data
      que requiere ser restaurada a defecto. 
    --------------------------------------- */
  cerrarModal(){
    this.imagenTemporal = null;
    this.imagenSubir = null;

    this._modalUploadServices.ocultarModal();
  }
  
  

  subirImagen(){
    this._subirArchivoServices.subirArchivo( this.imagenSubir, this._modalUploadServices.tipo, this._modalUploadServices.id )
    .then( resp =>{
      console.log(resp);
      this._modalUploadServices.notificacion.emit( resp );
      this.cerrarModal();

      
    })
    .catch( err => {
      console.log("error en la carga");
      
    });
  }
  
}
