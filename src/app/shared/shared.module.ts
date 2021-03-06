import { ModalUploadComponent } from './../components/modal-upload/modal-upload.component';

import { NgModule } from '@angular/core';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { NopageFoundComponent } from './nopage-found/nopage-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';


// uso de router link
import { RouterModule } from '@angular/router';
// uso de ngif ngfor. entre otros.. uso de pipes
import { CommonModule } from '@angular/common';
// modulos de pipes
import { PipesModule } from './../pipes/pipes.module';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
    ],
    declarations: [
        BreadcrumbsComponent,
        HeaderComponent,
        NopageFoundComponent,
        SidebarComponent,
        ModalUploadComponent
    ],
    exports: [
        // se colocan los componentes a los que se puede acceder desde afuera.
        BreadcrumbsComponent,
        HeaderComponent,
        NopageFoundComponent,
        SidebarComponent,
        ModalUploadComponent
    ]
})


export class SharedModule { }
