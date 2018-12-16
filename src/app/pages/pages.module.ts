
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

 


@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent
    ],
    exports: [
        // se colocan los componentes a los que se puede acceder desde afuera.
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ]
})


export class PagesModule {}
