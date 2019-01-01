import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { HospitalService } from './../../services/hospital/hospital.service';
import { Hospital } from './../../models/hospital.model';
import { Component, OnInit } from '@angular/core';

// declare function init_plugins();
declare var  swal: any;
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  // para el spinner de carga.
  cargando: boolean = true;


  hospitales: Hospital[] = [];

  totalRegistros: number = 0;

  constructor(
    public _hospitalServices: HospitalService,
    public _modalUploadServices: ModalUploadService
  ) { }

  ngOnInit() {
    // init_plugins();

    // cargar hospitales inicialmente
    this.cargarHospitales();

    // para recibir las notificaciones del modal de up de archivos hace falta suscribirse a sus notificaciones
    this._modalUploadServices.notificacion.subscribe(
      () => this.cargarHospitales()
    );
  }

  cargarHospitales() {

    this.cargando = true;

    this._hospitalServices.cargarHospitales().subscribe( (resp: any) => {
      
      this.totalRegistros = this._hospitalServices.totalHospitales;

      this.hospitales = resp;
      this.cargando = false;
      
    });

 
    
  
  }

  buscarHospitales( termino: string ){

    if(termino.length <= 0){
      this.cargarHospitales();
      return;
    }
    
    this._hospitalServices.buscarHospitales( termino )
      .subscribe( hospitales => this.hospitales = hospitales );
  }

  guardarHospital( hospital: Hospital ){
    
    this._hospitalServices.actualizarHospital( hospital )
      .subscribe();
  }
  borrarHospital( hospital: Hospital ){
    
    this._hospitalServices.borrarHospital( hospital._id )
      .subscribe( () => this.cargarHospitales()
    );
  }
  
  mostrarModal( id: string ){

  }


  crearHospital(){
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string) => {
      if( !valor || valor.length <= 0  ){
        return;
      }

      this._hospitalServices.crearHospital( valor )
        .subscribe( () => this.cargarHospitales() );
    });
  }

  actualizarImagen( hospital: Hospital ){
    this._modalUploadServices.mostrarModal( 'hospitales', hospital._id );
  }
}

