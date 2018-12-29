import { ImagenPipe } from './imagen.pipe';
import { NgModule } from '@angular/core';
 

@NgModule({
  declarations: [
    ImagenPipe
  ],
  imports: [],
  // para determinar que pipes se pueden usar fuera de este modulo. 
  exports: [
    ImagenPipe
  ]
})
export class PipesModule { }
