import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  /* -------------------------------------
      <- Subir archivo ->
      Descripción: Sirve para subir todo tipo
      de archivos por medio de javascript vanila
    --------------------------------------- */
  subirArchivo( archivo: File, tipo: string, id: string ){

    // se crea una promesa para llevar control del proceso
    return new Promise( (resolve, reject) =>{

    

    // se crea el form data que es lo que se sube
    let formData = new FormData();
    // se inicializa la variable ajax con la que se suben las cosas por http
    let xhr = new XMLHttpRequest();
    
    // se pasan los parametros que el formdata pide
    formData.append( 'imagen', archivo, archivo.name );
    // se cnfigura la peticion ajax
    xhr.onreadystatechange = function(){

      // se esta pendiente de algunos estados y el que interesa al momento de subir es el 4. tiene otros estados interesantes para hacer loadings entre otras cosas.
        if( xhr.readyState === 4 ){
          if( xhr.status === 200 ){
            console.log('archivo subido con exito');
            resolve( JSON.parse( xhr.response ) );
          }else{
            console.log('Subida de archivo fallida');
            reject( xhr.response );
          }
        }
      };

      let url = `${ URL_SERVICIOS }/upload/${ tipo }/${ id }`;
      
      // se especifica el tipo de coneccion, la url y si se quiere que sea algo asincrono.
      xhr.open( 'PUT', url, true );
      xhr.send( formData );

    });

  }

}
