import { UsuarioService } from 'src/app/services/service.index';
import { HospitalService } from './../../services/hospital/hospital.service';
import { MedicoService } from './../../services/medico/medico.service';
import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  // para el spinner de carga.
  cargando: boolean = true;
  
  totalRegistros:number = 0;

  medicos: Medico[] = [];

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public _UsuarioService: UsuarioService
  ) { }

  ngOnInit() {

    this.cargarMedicos();
  }

  cargarMedicos(){

    this.cargando = true;

    this._medicoService.cargarMedicos()
      .subscribe( (medicos: any) => {
        this.medicos = medicos;
        this.totalRegistros = this._medicoService.totalMedicos;
        this.cargando = false;
      } );
    
    
  }

  buscarMedico( termino: string ){
    
    if( termino.length <= 0 ){
      this.cargarMedicos();
      return;
    }

    this.cargando = true;

    this._medicoService.buscarMedicos( termino )
      .subscribe( medicos => {
        this.medicos = medicos;
        this.cargando = false;
      } )

  }


  guardarMedico( medico: Medico ){
    
  }
  borrarMedico( medico: Medico ){
    
    this._medicoService.borrarMedico(medico._id)
      .subscribe((resp: any) => this.cargarMedicos());

  }

  actualizarImagen( medico: Medico ){
    
 
    
  }

}
