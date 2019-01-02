import { VerificaTokenGuard } from './../services/guards/verifica-token.guard';
import { AdminGuard } from './../services/guards/admin.guard';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { MedicoComponent } from './medicos/medico.component';
import { MedicosComponent } from './medicos/medicos.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { LoginGuardGuard } from './../services/guards/login-guard.guard';
import { Routes, RouterModule } from "@angular/router";

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';



// ANTES DEL LAZY LOAD
// const pagesRoutes: Routes = [
//     {
//         path: '',
//         component: PagesComponent,
//         // para efectuar el guard se inyecta con este parametro de canactivate..ademas se le pueden especificar otros tipos de guards personalizados.
//         canActivate: [ LoginGuardGuard ],
//         children: [
//             { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
//             { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
//             { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' } },
//             { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
//             { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
//             { path: 'accountSettings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del tema' } },
//             { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
//             { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },

//             // Mantenimientos

//             { path: 'usuarios', component: UsuariosComponent,
//             canActivate: [AdminGuard], data: { titulo: 'Mantenimiento de Usuario' } },


//             { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
//             { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Medicos' } },
//             { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Medico' } },
//             { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
//         ]
//     }
// ];
const pagesRoutes: Routes = [

    {
         path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' },
         canActivate: [ VerificaTokenGuard ]
},
    { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
    { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Graficas' } },
    { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
    { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },
    { path: 'accountSettings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del tema' } },
    { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' } },

    // Mantenimientos

    {
        path: 'usuarios', component: UsuariosComponent,
        canActivate: [AdminGuard], data: { titulo: 'Mantenimiento de Usuario' }
    },
    { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de Hospitales' } },
    { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Medicos' } },
    { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Actualizar Medico' } },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }

];

// se coloca for child por que son rutas hijas que estan dentro de otras
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);

