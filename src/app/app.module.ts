import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';

 
// rutas
import { APP_ROUTES } from './app.routes';


// modulos
import { PagesModule } from './pages/pages.module';

import { FormsModule } from '@angular/forms';
 


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent   
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
