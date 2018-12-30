import { ModalUploadComponent } from './../components/modal-upload/modal-upload.component';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";



import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

// modulos shared
import { SharedModule } from './../shared/shared.module';
import { GraficoDonaComponent } from "../components/grafico-dona/grafico-dona.component";

// se necesitan las rutas integradas en el pages module
import { PAGES_ROUTES } from './pages.routes';

// importar componentes
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';


// importcion de graficas modulo
import { ChartsModule } from 'ng2-charts';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// importacion de modulos de pipes
import { PipesModule } from './../pipes/pipes.module';

import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        ModalUploadComponent
    ],
    exports: [
        // se colocan los componentes a los que se puede acceder desde afuera.
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule
    ]
})


export class PagesModule {}
