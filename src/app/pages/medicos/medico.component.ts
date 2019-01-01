import { Router, ActivatedRoute } from '@angular/router';
import { HospitalService } from './../../services/hospital/hospital.service';
import { Hospital } from './../../models/hospital.model';
import { NgForm } from '@angular/forms';
import { MedicoService } from './../../services/medico/medico.service';
import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {


  hospitales: Hospital[] = [];

  medico: Medico = new Medico('','','','', '');

  // variable hospital para mostrar la foto
  hospital: Hospital = new Hospital('');

  

  constructor(
    public _medicoService: MedicoService,
    public _hospitalServices: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUpload: ModalUploadService
    
  ) {
    // esto es para tomar el ID del url 
    activatedRoute.params.subscribe(params => {

      let id = params['id'];

      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });
   }

  ngOnInit() {


    this._hospitalServices.cargarHospitales().subscribe((resp: any) => {
      this.hospitales = resp;
      // console.log(this.hospitales);
      
    });
      
    this._modalUpload.notificacion.subscribe(
      resp => {
      // console.log(resp);
      this.medico.img = resp.medico.img;
    });
  }

  cargarMedico( id: string ){
    this._medicoService.cargarMedico(id)
      .subscribe( medico => {
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital( this.medico.hospital );
      });
  }


  guardarMedico( f: NgForm ){
    
    // console.log(f.valid);
    console.log(f.value);
    

    // console.log( this.medico );

    if( f.invalid ){
      console.log('invalido', f.invalid);
      
      return;
    }

    this._medicoService.guardarMedico( this.medico )
      .subscribe( medico =>{
        
        this.medico._id = medico._id;

        this.router.navigate(['/medico', medico._id]);
      });
    

  }

  cambioHospital( id: string ){

    this._hospitalServices.obtenerHospital( id )
      .subscribe( hospital => this.hospital = hospital);

  }

  cambiarFoto(){
    this._modalUpload.mostrarModal( 'medicos', this.medico._id );
  }
}
