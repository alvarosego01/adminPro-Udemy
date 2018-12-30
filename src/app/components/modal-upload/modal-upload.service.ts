import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  // se desea recibir cualquier cosa de cualquier pagina para subir

  public tipo: string;
  public id: string;

  // si el modal esta oculto se confirma con esto
  public oculto: string = "oculto";

  // notificar si ya se subio la imagen
  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log('modal upload service listo');

  }

  /* -------------------------------------
      <- Ocultar modal ->
      Descripción: En esta funcion se oculta
      y se restaura por defectos los estados
      del modal de subida de imagenes
    --------------------------------------- */
  ocultarModal() {
    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;
  }
  
  /* -------------------------------------
      <- Mostrar modal ->
      Descripción: Con esta funcion por medio del servicio
      se controlara el estado del modal y ademas
      los controles que llevara en su funcion
    --------------------------------------- */
  mostrarModal( tipo: string, id: string ) {
    this.oculto = "";
    this.id = id;
    this.tipo = tipo;
  }

}
