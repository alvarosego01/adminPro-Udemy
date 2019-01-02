import { VerificaTokenGuard } from './guards/verifica-token.guard';
import { AdminGuard } from './guards/admin.guard';
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
    AdminGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    VerificaTokenGuard
  ],
  imports: [CommonModule, HttpClientModule]
})
export class ServiceModule {}
