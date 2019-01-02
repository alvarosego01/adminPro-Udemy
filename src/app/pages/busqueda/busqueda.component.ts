import { Hospital } from './../../models/hospital.model';
import { Medico } from './../../models/medico.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  termino: string = '';

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(
    // para tomar parametros
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) { 
    
    activatedRoute.params.subscribe( params => {
      this.termino = params['termino'];
      // console.log(this.termino);
      this.buscar( this.termino );
    });

  }

  ngOnInit() {
  }

  buscar( termino: string ){

    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    this.http.get( url ).subscribe( (resp: any) => {
      console.log(resp);

      this.hospitales = resp.hospitales
      this.medicos = resp.medicos
      this.usuarios = resp.usuarios
      
    });
  }

}
