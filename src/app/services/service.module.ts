import { ModalUploadService } from './../components/modal-upload/modal-upload.service';
 
 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService, SharedService, SidebarService, UsuarioService, LoginGuardGuard, SubirArchivoService, HospitalService, MedicoService } from './service.index';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService
  ],
  imports: [CommonModule, HttpClientModule]
})
export class ServiceModule {}
