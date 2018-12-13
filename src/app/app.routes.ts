import { Routes, RouterModule } from '@angular/router';


// paginas
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopageFoundComponent } from './shared/nopage-found/nopage-found.component';

// ----
// pages generales
import { PagesComponent } from './pages/pages.component';
// Hijas de Pages generales
// ----

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: NopageFoundComponent },
]



export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );