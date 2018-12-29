import { Pipe, PipeTransform } from '@angular/core';
// url del servicio
import { URL_SERVICIOS } from './../config/config';
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  
  // se recibe imagen de tipo string 
  // por defecto se recibe el tipo de imagen (string) y por defecto sera usuario
  transform(img: string, tipo: string = 'usuario' ): any {

    let url = URL_SERVICIOS + '/img';
    
    // si no recibo una imagen como tal entnces retorna un undefined pre configurado
    if( !img ){
      return url + '/usuarios/xxx';
    }
    // si es una imagen de google la retorna tal cual
    if( img.indexOf('https') >= 0 ){
      return img;
    }

    switch( tipo ){

      case 'usuario':
        url += '/usuarios/' + img;
      break;

      case 'medico':
        url += '/medicos/' + img;
      break;

      case 'hospital':
        url += '/hospitales/' + img;
      break;
      
      default:
        console.log('tipo de imagen no existe');
        url += '/usuarios/xxx';
      
    }

    return url;
  }

}


